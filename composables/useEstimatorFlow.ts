import type {
  DepartureCityOption,
  Flight,
  Hotel,
  Service,
  TransportRouteOption,
  VisaProduct,
} from '~/types'
import { calculateEstimate, roomCapacity } from '~/utils/estimatorCalculator'

export interface EstimatorDatasets {
  flights: Flight[]
  hotels: Hotel[]
  routeOptions: TransportRouteOption[]
  visa: VisaProduct
  services: Service[]
  departureCities: DepartureCityOption[]
}

export interface EstimatorStepMeta {
  n: number
  id:
    | 'pilgrims'
    | 'departure'
    | 'schedule'
    | 'nights'
    | 'flight'
    | 'hotelMakkah'
    | 'roomsMakkah'
    | 'hotelMadinah'
    | 'roomsMadinah'
    | 'transport'
    | 'visa'
    | 'services'
    | 'review'
  title: string
}

export const ESTIMATOR_STEPS: EstimatorStepMeta[] = [
  { n: 1, id: 'pilgrims', title: 'Jumlah Jamaah' },
  { n: 2, id: 'departure', title: 'Kota Keberangkatan' },
  { n: 3, id: 'schedule', title: 'Tanggal & Durasi' },
  { n: 4, id: 'nights', title: 'Malam Makkah & Madinah' },
  { n: 5, id: 'flight', title: 'Penerbangan' },
  { n: 6, id: 'hotelMakkah', title: 'Hotel Makkah' },
  { n: 7, id: 'roomsMakkah', title: 'Kamar Makkah' },
  { n: 8, id: 'hotelMadinah', title: 'Hotel Madinah' },
  { n: 9, id: 'roomsMadinah', title: 'Kamar Madinah' },
  { n: 10, id: 'transport', title: 'Transportasi' },
  { n: 11, id: 'visa', title: 'Visa' },
  { n: 12, id: 'services', title: 'Layanan Tambahan' },
  { n: 13, id: 'review', title: 'Review & Estimasi' },
]

/**
 * Flow orchestrator estimator:
 * - validasi per langkah (pesan ramah, tanpa istilah teknis)
 * - breakdown estimasi (delegasi ke utils/estimatorCalculator — terisolasi)
 * - sanitasi silang (ex: kendaraan tak cukup saat jamaah bertambah)
 */
export function useEstimatorFlow(data: EstimatorDatasets) {
  const store = useEstimatorStore()

  // Layanan tambahan di estimator tidak termasuk visa (ditangani step khusus).
  const additionalServices = computed(() => data.services.filter((s) => s.id !== 'SRV-001'))

  const makkahHotels = computed(() => data.hotels.filter((h) => h.city === 'Makkah'))
  const madinahHotels = computed(() => data.hotels.filter((h) => h.city === 'Madinah'))

  const selectedFlight = computed(() => data.flights.find((f) => f.id === store.flightId))
  const makkahHotel = computed(() => data.hotels.find((h) => h.id === store.makkahHotelId))
  const madinahHotel = computed(() => data.hotels.find((h) => h.id === store.madinahHotelId))
  const departure = computed(() =>
    data.departureCities.find((c) => c.id === store.departureCity),
  )

  const makkahCapacity = computed(() =>
    roomCapacity(makkahHotel.value, store.makkahRooms.filter((r) => r.quantity > 0)),
  )
  const madinahCapacity = computed(() =>
    roomCapacity(madinahHotel.value, store.madinahRooms.filter((r) => r.quantity > 0)),
  )

  // Jika jamaah bertambah, kendaraan yang tak cukup otomatis dilepas.
  watch(
    () => store.pilgrims,
    (pax) => {
      const validIds = data.routeOptions
        .flatMap((r) => r.vehicles)
        .filter((v) => v.vehicle.capacity >= pax)
        .map((v) => v.vehicle.id)
      store.clearInsufficientVehicles([...new Set(validIds)])
    },
  )

  const nightsAssigned = computed(() => store.makkahNights + store.madinahNights)
  const nightsRemaining = computed(() => store.maxNights - nightsAssigned.value)

  /** Breakdown live — dikonsumsi summary & review. */
  const breakdown = computed(() =>
    calculateEstimate(store.configuration, {
      flights: data.flights,
      hotels: data.hotels,
      routeOptions: data.routeOptions,
      visa: data.visa,
      services: data.services,
      departureCities: data.departureCities,
    }),
  )

  function transportEntry(routeId: string) {
    return store.transport.find((t) => t.routeId === routeId)
  }

  function isStepValid(stepN: number): boolean {
    switch (stepN) {
      case 1:
        return store.pilgrims >= 1
      case 2:
        return store.departureCity !== null
      case 3:
        return Boolean(store.departureDate) && store.durationDays >= 3
      case 4:
        return nightsRemaining.value === 0
      case 5:
        return store.flightId !== null
      case 6:
        return store.makkahHotelId !== null
      case 7:
        return store.makkahRooms.some((r) => r.quantity > 0) && makkahCapacity.value >= store.pilgrims
      case 8:
        return store.madinahHotelId !== null
      case 9:
        return store.madinahRooms.some((r) => r.quantity > 0) && madinahCapacity.value >= store.pilgrims
      case 10:
        // Setiap rute yang ditandai "perlu" wajib sudah memilih kendaraan.
        return store.transport.every((t) => t.vehicleId !== null)
      case 11:
        return store.visa !== null
      case 12:
      case 13:
        return true
      default:
        return false
    }
  }

  /** Pesan validasi ramah untuk step aktif (bahasa sehari-hari). */
  function stepMessage(stepN: number): string | null {
    if (isStepValid(stepN)) return null
    switch (stepN) {
      case 2:
        return 'Silakan pilih kota keberangkatan Anda.'
      case 3:
        return 'Silakan tentukan tanggal keberangkatan dan durasi perjalanan.'
      case 4:
        return nightsRemaining.value > 0
          ? `Masih ada ${nightsRemaining.value} malam yang belum dibagi antara Makkah dan Madinah.`
          : `Malam yang dipilih melebihi durasi perjalanan — kurangi ${Math.abs(nightsRemaining.value)} malam.`
      case 5:
        return 'Silakan pilih penerbangan Anda.'
      case 6:
        return 'Silakan pilih hotel Makkah terlebih dahulu.'
      case 7:
        if (!store.makkahRooms.some((r) => r.quantity > 0))
          return 'Silakan tentukan kamar hotel Makkah Anda.'
        return `Kapasitas kamar baru ${makkahCapacity.value} orang untuk ${store.pilgrims} jamaah — silakan tambah kamar.`
      case 8:
        return 'Silakan pilih hotel Madinah terlebih dahulu.'
      case 9:
        if (!store.madinahRooms.some((r) => r.quantity > 0))
          return 'Silakan tentukan kamar hotel Madinah Anda.'
        return `Kapasitas kamar baru ${madinahCapacity.value} orang untuk ${store.pilgrims} jamaah — silakan tambah kamar.`
      case 10: {
        const pending = store.transport.find((t) => t.vehicleId === null)
        if (pending) {
          const route = data.routeOptions.find((r) => r.id === pending.routeId)
          return `Silakan pilih kendaraan untuk rute ${route?.name ?? 'tersebut'}.`
        }
        return null
      }
      case 11:
        return 'Silakan beri tahu kami status visa Anda.'
      default:
        return null
    }
  }

  /** Map kategori hasil estimasi ke nomor step untuk tombol "Ubah". */
  const editStepFor: Record<string, number> = {
    departure: 2,
    flight: 5,
    hotelMakkah: 6,
    hotelMadinah: 8,
    transport: 10,
    visa: 11,
    services: 12,
  }

  return {
    store,
    steps: ESTIMATOR_STEPS,
    // data terfilter
    additionalServices,
    makkahHotels,
    madinahHotels,
    routeOptions: data.routeOptions,
    flights: data.flights,
    visaProduct: data.visa,
    departureCities: data.departureCities,
    // seleksi terkini
    selectedFlight,
    makkahHotel,
    madinahHotel,
    departure,
    makkahCapacity,
    madinahCapacity,
    // malam
    nightsAssigned,
    nightsRemaining,
    // kalkulasi & validasi
    breakdown,
    isStepValid,
    stepMessage,
    transportEntry,
    editStepFor,
  }
}
