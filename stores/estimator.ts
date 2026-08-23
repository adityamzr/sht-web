import { defineStore } from 'pinia'
import { computeReturnDate } from '~/utils/format'
import type {
  DepartureCityId,
  EstimatorConfiguration,
  RoomSelection,
  ServiceSelection,
  TransportSelection,
  VisaChoice,
} from '~/types'

export const TOTAL_STEPS = 13

const MIN_PILGRIMS = 1
const MAX_PILGRIMS = 30
const MIN_DURATION = 3
const MAX_DURATION = 45

function defaultState() {
  const departureDate = addDaysISO(todayISO(), 45) // default +45 hari dari hari ini (bukan return date)
  return {
    currentStep: 1 as number,
    pilgrims: 4 as number,
    departureCity: null as DepartureCityId | null,
    departureDate,
    durationDays: 9 as number,
    makkahNights: 5 as number,
    madinahNights: 3 as number,
    flightId: null as string | null,
    makkahHotelId: null as string | null,
    makkahRooms: [] as RoomSelection[],
    madinahHotelId: null as string | null,
    madinahRooms: [] as RoomSelection[],
    transport: [] as TransportSelection[],
    visa: null as VisaChoice | null,
    services: [] as ServiceSelection[],
  }
}

/**
 * State konfigurasi estimasi perjalanan (serializable).
 * Phase 3: dikirim ke backend — backend = source of truth kalkulasi.
 * Rumus kalkulasi TIDAK ada di sini (lihat utils/estimatorCalculator).
 */
export const useEstimatorStore = defineStore('estimator', {
  state: () => defaultState(),

  getters: {
    /** Malam yang tersedia untuk dibagi (1 hari dipakai perjalanan). */
    maxNights: (s) => s.durationDays - 1,

    returnDate: (s) => computeReturnDate(s.departureDate, s.durationDays), // M3.1: inklusif

    /** Snapshot konfigurasi untuk kalkulator / future API payload. */
    configuration(s): EstimatorConfiguration {
      return {
        pilgrims: s.pilgrims,
        departureCity: s.departureCity,
        departureDate: s.departureDate,
        durationDays: s.durationDays,
        returnDate: computeReturnDate(s.departureDate, s.durationDays), // M3.1: inklusif
        makkahNights: s.makkahNights,
        madinahNights: s.madinahNights,
        flightId: s.flightId,
        makkahHotelId: s.makkahHotelId,
        makkahRooms: s.makkahRooms.filter((r) => r.quantity > 0),
        madinahHotelId: s.madinahHotelId,
        madinahRooms: s.madinahRooms.filter((r) => r.quantity > 0),
        transport: s.transport,
        visa: s.visa,
        services: s.services.filter((x) => x.quantity > 0),
      }
    },
  },

  actions: {
    // ─── Navigasi ──────────────────────────────────────────────────────────
    goToStep(step: number) {
      if (step >= 1 && step <= TOTAL_STEPS) this.currentStep = step
    },
    next() {
      if (this.currentStep < TOTAL_STEPS) this.currentStep += 1
    },
    back() {
      if (this.currentStep > 1) this.currentStep -= 1
    },
    reset() {
      this.$patch(defaultState())
    },

    // ─── Step 1: Jamaah ────────────────────────────────────────────────────
    setPilgrims(value: number) {
      this.pilgrims = clamp(Math.round(value || MIN_PILGRIMS), MIN_PILGRIMS, MAX_PILGRIMS)
    },

    // ─── Step 2: Kota keberangkatan ────────────────────────────────────────
    selectDepartureCity(city: DepartureCityId) {
      this.departureCity = city
    },

    // ─── Step 3: Tanggal & durasi ──────────────────────────────────────────
    setDepartureDate(iso: string) {
      this.departureDate = iso
    },
    setDurationDays(days: number) {
      this.durationDays = clamp(Math.round(days || MIN_DURATION), MIN_DURATION, MAX_DURATION)
      this.rebalanceNights()
    },

    // ─── Step 4: Pembagian malam ───────────────────────────────────────────
    setMakkahNights(v: number) {
      this.makkahNights = clamp(Math.round(v || 1), 1, Math.max(1, this.maxNights - 1))
    },
    setMadinahNights(v: number) {
      this.madinahNights = clamp(Math.round(v || 1), 1, Math.max(1, this.maxNights - 1))
    },
    /** Jaga total malam tetap masuk akal saat durasi berubah. */
    rebalanceNights() {
      const max = this.maxNights
      if (max < 2) {
        this.durationDays = 3
      }
      const target = this.maxNights
      let makkah = this.makkahNights
      let madinah = this.madinahNights
      // Utamakan mempertahankan malam Madinah, sesuaikan Makkah.
      if (madinah > target - 1) madinah = target - 1
      makkah = target - madinah
      if (makkah < 1) {
        makkah = 1
        madinah = target - 1
      }
      this.makkahNights = makkah
      this.madinahNights = madinah
    },

    // ─── Step 5: Penerbangan ───────────────────────────────────────────────
    selectFlight(flightId: string) {
      this.flightId = flightId
    },

    // ─── Step 6–9: Hotel & kamar ───────────────────────────────────────────
    selectHotel(city: 'makkah' | 'madinah', hotelId: string) {
      if (city === 'makkah') {
        if (this.makkahHotelId !== hotelId) this.makkahRooms = []
        this.makkahHotelId = hotelId
      } else {
        if (this.madinahHotelId !== hotelId) this.madinahRooms = []
        this.madinahHotelId = hotelId
      }
    },
    setRoomQuantity(city: 'makkah' | 'madinah', roomTypeId: string, quantity: number) {
      const rooms = city === 'makkah' ? this.makkahRooms : this.madinahRooms
      const qty = clamp(Math.round(quantity || 0), 0, 20)
      const existing = rooms.find((r) => r.roomTypeId === roomTypeId)
      if (existing) existing.quantity = qty
      else rooms.push({ roomTypeId, quantity: qty })
    },

    // ─── Step 10: Transportasi ─────────────────────────────────────────────
    setTransportNeeded(routeId: string, needed: boolean) {
      if (needed && !this.transport.some((t) => t.routeId === routeId)) {
        this.transport.push({ routeId, vehicleId: null })
      } else if (!needed) {
        this.transport = this.transport.filter((t) => t.routeId !== routeId)
      }
    },
    selectTransportVehicle(routeId: string, vehicleId: string) {
      const entry = this.transport.find((t) => t.routeId === routeId)
      if (entry) entry.vehicleId = vehicleId
    },
    /** Bersihkan kendaraan yang kapasitasnya tak lagi cukup (dipanggil flow). */
    clearInsufficientVehicles(validVehicleIds: string[]) {
      for (const entry of this.transport) {
        if (entry.vehicleId && !validVehicleIds.includes(entry.vehicleId)) {
          entry.vehicleId = null
        }
      }
    },

    // ─── Step 11: Visa ─────────────────────────────────────────────────────
    setVisa(choice: VisaChoice) {
      this.visa = choice
    },

    // ─── Step 12: Layanan tambahan ─────────────────────────────────────────
    toggleService(serviceId: string) {
      const idx = this.services.findIndex((s) => s.serviceId === serviceId)
      if (idx >= 0) this.services.splice(idx, 1)
      else this.services.push({ serviceId, quantity: 1 })
    },
    setServiceQuantity(serviceId: string, quantity: number) {
      const entry = this.services.find((s) => s.serviceId === serviceId)
      if (entry) entry.quantity = clamp(Math.round(quantity || 1), 1, 10)
    },
  },
})

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}
