import type { EstimatorConfiguration } from '~/types'

/**
 * Bangun payload submit estimasi (M3).
 * INVARIANT: payload HANYA berisi ID + kuantitas + konfigurasi + kontak.
 * TIDAK ADA harga/total dari client — backend menghitung ulang semuanya.
 */

export interface SubmitContact {
  name: string
  whatsapp: string
  email?: string
  notes?: string
}

export interface SubmitPayload {
  contact: {
    name: string
    whatsapp: string
    email: string | null
    notes: string | null
  }
  trip: {
    pilgrims: number
    departureCity: string
    departureDate: string
    durationDays: number
    makkahNights: number
    madinahNights: number
    flightId: number
    makkahHotelId: number
    makkahRooms: Array<{ roomTypeId: number; quantity: number }>
    madinahHotelId: number
    madinahRooms: Array<{ roomTypeId: number; quantity: number }>
    transport: Array<{ routeId: number; vehicleId: number }>
    visa: 'needed' | 'owned'
    services: Array<{ serviceId: number; quantity: number }>
  }
}

function cityCode(city: string | null): string {
  if (city === 'Jakarta') return 'jakarta'
  if (city === 'Bandung') return 'bandung'
  return 'jakarta'
}

export function buildSubmitPayload(config: EstimatorConfiguration, contact: SubmitContact): SubmitPayload {
  return {
    contact: {
      name: contact.name.trim(),
      whatsapp: contact.whatsapp.trim(),
      email: contact.email?.trim() || null,
      notes: contact.notes?.trim() || null,
    },
    trip: {
      pilgrims: config.pilgrims,
      departureCity: cityCode(config.departureCity),
      departureDate: config.departureDate,
      durationDays: config.durationDays,
      makkahNights: config.makkahNights,
      madinahNights: config.madinahNights,
      flightId: Number(config.flightId),
      makkahHotelId: Number(config.makkahHotelId),
      makkahRooms: config.makkahRooms
        .filter((r) => r.quantity > 0)
        .map((r) => ({ roomTypeId: Number(r.roomTypeId), quantity: r.quantity })),
      madinahHotelId: Number(config.madinahHotelId),
      madinahRooms: config.madinahRooms
        .filter((r) => r.quantity > 0)
        .map((r) => ({ roomTypeId: Number(r.roomTypeId), quantity: r.quantity })),
      transport: config.transport.map((t) => ({ routeId: Number(t.routeId), vehicleId: Number(t.vehicleId) })),
      visa: config.visa ?? 'needed',
      services: config.services
        .filter((s) => s.quantity > 0)
        .map((s) => ({ serviceId: Number(s.serviceId), quantity: s.quantity })),
    },
  }
}
