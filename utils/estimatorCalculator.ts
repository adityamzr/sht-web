import type {
  DepartureCityOption,
  EstimateCategory,
  EstimatorBreakdown,
  EstimatorConfiguration,
  Flight,
  Hotel,
  Service,
  TransportRouteOption,
  VisaProduct,
} from '~/types'
import { formatCurrency } from './format'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOCK CALCULATOR — FRONTEND ONLY (Phase 2).
 *
 * Phase 3+/M7: fungsi ini digantikan panggilan ke SHT Pricing Engine
 * (backend `sht-admin` — satu-satunya source of truth kalkulasi).
 * JANGAN tambahkan rumus harga di komponen UI — semua kalkulasi terpusat di sini.
 * Supplier cost & markup tidak pernah menjadi bagian dari kalkulasi customer.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface CalculatorData {
  flights: Flight[]
  hotels: Hotel[]
  routeOptions: TransportRouteOption[]
  visa: VisaProduct
  services: Service[]
  departureCities: DepartureCityOption[]
}

const roundIDR = (v: number) => Math.round(v)

/** Kapasitas total (orang) dari pilihan kamar suatu hotel. */
export function roomCapacity(hotel: Hotel | undefined, selections: { roomTypeId: string; quantity: number }[]): number {
  if (!hotel) return 0
  return selections.reduce((cap, sel) => {
    const rt = hotel.roomTypes.find((r) => r.id === sel.roomTypeId)
    return cap + (rt ? rt.capacity * sel.quantity : 0)
  }, 0)
}

export function calculateEstimate(
  config: EstimatorConfiguration,
  data: CalculatorData,
): EstimatorBreakdown {
  const categories: EstimateCategory[] = []
  const pax = config.pilgrims

  // ─── Kota keberangkatan ──────────────────────────────────────────────────
  const departure = data.departureCities.find((c) => c.id === config.departureCity)
  if (departure && departure.feePerPax !== null && departure.feePerPax > 0) {
    const amount = departure.feePerPax * pax
    categories.push({
      id: 'departure',
      label: `Perjalanan ${departure.name} → Bandara CGK`,
      amount,
      lines: [
        {
          label: `Pendampingan perjalanan ke bandara`,
          detail: `${formatCurrency(departure.feePerPax)} × ${pax} jamaah`,
          amount,
        },
      ],
    })
  }

  // ─── Penerbangan: sellingPrice × pilgrims ────────────────────────────────
  const flight = data.flights.find((f) => f.id === config.flightId)
  if (flight) {
    const unavailable = flight.sellingPrice === null
    const amount = unavailable ? 0 : flight.sellingPrice! * pax
    categories.push({
      id: 'flight',
      label: 'Penerbangan',
      amount,
      lines: [
        {
          label: `${flight.airline} · ${flight.route}`,
          detail: unavailable ? undefined : `${formatCurrency(flight.sellingPrice!)} × ${pax} jamaah`,
          amount,
          unavailable,
        },
      ],
    })
  }

  // ─── Hotel: harga kamar × jumlah kamar × malam ───────────────────────────
  const hotelSections: Array<{
    id: 'hotelMakkah' | 'hotelMadinah'
    label: string
    hotel: Hotel | undefined
    rooms: { roomTypeId: string; quantity: number }[]
    nights: number
  }> = [
    {
      id: 'hotelMakkah',
      label: 'Hotel Makkah',
      hotel: data.hotels.find((h) => h.id === config.makkahHotelId),
      rooms: config.makkahRooms,
      nights: config.makkahNights,
    },
    {
      id: 'hotelMadinah',
      label: 'Hotel Madinah',
      hotel: data.hotels.find((h) => h.id === config.madinahHotelId),
      rooms: config.madinahRooms,
      nights: config.madinahNights,
    },
  ]

  for (const section of hotelSections) {
    if (!section.hotel) continue
    const lines = section.rooms
      .filter((r) => r.quantity > 0)
      .map((r) => {
        const rt = section.hotel!.roomTypes.find((t) => t.id === r.roomTypeId)
        const unavailable = !rt || rt.pricePerNight === null
        const amount = unavailable ? 0 : roundIDR(rt!.pricePerNight! * r.quantity * section.nights)
        return {
          label: `${rt?.name ?? r.roomTypeId} × ${r.quantity} kamar · ${section.nights} malam`,
          detail: unavailable ? undefined : `${formatCurrency(rt!.pricePerNight!)}/kamar/malam`,
          amount,
          unavailable,
        }
      })
    if (lines.length) {
      categories.push({
        id: section.id,
        label: `${section.label} — ${section.hotel.name}`,
        amount: lines.reduce((s, l) => s + l.amount, 0),
        lines,
      })
    }
  }

  // ─── Transportasi: harga rute (per trip) ────────────────────────────────
  const transportLines = config.transport
    .map((sel) => {
      const route = data.routeOptions.find((r) => r.id === sel.routeId)
      const option = route?.vehicles.find((v) => v.vehicle.id === sel.vehicleId)
      if (!route || !option) return null
      const unavailable = option.price === null
      return {
        label: route.name,
        detail: option.vehicle.name,
        amount: unavailable ? 0 : option.price!,
        unavailable,
      }
    })
    .filter(Boolean) as EstimateCategory['lines']

  if (transportLines.length) {
    categories.push({
      id: 'transport',
      label: 'Transportasi',
      amount: transportLines.reduce((s, l) => s + l.amount, 0),
      lines: transportLines,
    })
  }

  // ─── Visa: pricePerPax × pilgrims (0 jika sudah punya) ──────────────────
  if (config.visa === 'needed') {
    const unavailable = data.visa.pricePerPax === null
    const amount = unavailable ? 0 : data.visa.pricePerPax! * pax
    categories.push({
      id: 'visa',
      label: 'Visa Umroh',
      amount,
      lines: [
        {
          label: data.visa.name,
          detail: unavailable ? undefined : `${formatCurrency(data.visa.pricePerPax!)} × ${pax} jamaah`,
          amount,
          unavailable,
        },
      ],
    })
  } else if (config.visa === 'owned') {
    categories.push({
      id: 'visa',
      label: 'Visa Umroh',
      amount: 0,
      lines: [{ label: 'Sudah memiliki visa', detail: 'Tidak ada biaya', amount: 0 }],
    })
  }

  // ─── Layanan tambahan: sesuai pricingUnit ────────────────────────────────
  const serviceLines = config.services
    .map((sel) => {
      const svc = data.services.find((s) => s.id === sel.serviceId)
      if (!svc) return null
      const unavailable = svc.price === null
      const amount = unavailable
        ? 0
        : svc.pricingUnit === 'pax'
          ? svc.price! * pax
          : svc.price! * sel.quantity // group_session | package
      return {
        label: svc.name,
        detail: unavailable
          ? undefined
          : svc.pricingUnit === 'pax'
            ? `${formatCurrency(svc.price!)} × ${pax} jamaah`
            : `${formatCurrency(svc.price!)} × ${sel.quantity}`,
        amount,
        unavailable,
      }
    })
    .filter(Boolean) as EstimateCategory['lines']

  if (serviceLines.length) {
    categories.push({
      id: 'services',
      label: 'Layanan Tambahan',
      amount: serviceLines.reduce((s, l) => s + l.amount, 0),
      lines: serviceLines,
    })
  }

  // ─── Total ───────────────────────────────────────────────────────────────
  const total = categories.reduce((s, c) => s + c.amount, 0)
  // M3.1: bila ada harga belum tersedia, total PREVIEW tidak valid — jangan
  // tampilkan sebagai angka final (UI menampilkan "Perlu konfirmasi").
  const hasUnavailable = categories.some((c) => c.lines.some((l) => l.unavailable))

  return {
    categories,
    total,
    perPerson: pax > 0 ? Math.round(total / pax) : 0,
    hasUnavailable,
  }
}
