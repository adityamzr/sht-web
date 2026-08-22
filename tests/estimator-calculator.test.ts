/**
 * Smoke test Phase 2 — mock calculator & business rules.
 * Jalankan: npm test   (script "test" di package.json → tsx)
 */
import { calculateEstimate, roomCapacity } from '../utils/estimatorCalculator'
import { mockHotels } from '../data/mock/hotels'
import { mockFlights } from '../data/mock/flights'
import { mockTransportRouteOptions } from '../data/mock/transportations'
import { mockVisa } from '../data/mock/visa'
import { mockServices } from '../data/mock/services'
import { mockDepartureCities } from '../data/mock/departures'
import type { EstimatorConfiguration } from '../types'

let failures = 0
function assert(label: string, actual: unknown, expected: unknown) {
  const ok = actual === expected
  if (!ok) failures++
  console.log(`${ok ? '✓' : '✗ FAIL'} ${label} → ${actual}${ok ? '' : ` (expected ${expected})`}`)
}

const swissotel = mockHotels[0]
const sofitel = mockHotels[3]

// ─── Rule: kapasitas kamar ────────────────────────────────────────────────────
assert('Quad x1 untuk 6 pax = INVALID (kapasitas 4)', roomCapacity(swissotel, [{ roomTypeId: 'quad', quantity: 1 }]), 4)
const mixedCap = roomCapacity(swissotel, [
  { roomTypeId: 'quad', quantity: 1 },
  { roomTypeId: 'double', quantity: 1 },
])
assert('Quad x1 + Double x1 = kapasitas 6 (VALID untuk 6 pax)', mixedCap, 6)

// ─── Rule: kalkulasi penuh ────────────────────────────────────────────────────
const config: EstimatorConfiguration = {
  pilgrims: 6,
  departureCity: 'Bandung', // fee 650k × 6 = 3.900.000
  departureDate: '2026-10-12',
  durationDays: 12,
  returnDate: '2026-10-24',
  makkahNights: 6,
  madinahNights: 5,
  flightId: 'FLT-002', // Garuda 17.5jt × 6 = 105.000.000
  makkahHotelId: 'HTL-001', // Swissôtel: quad×1 + double×1, 6 malam
  makkahRooms: [
    { roomTypeId: 'quad', quantity: 1 },
    { roomTypeId: 'double', quantity: 1 },
  ],
  madinahHotelId: 'HTL-004', // Sofitel: quad×2, 5 malam
  madinahRooms: [{ roomTypeId: 'quad', quantity: 2 }],
  transport: [
    { routeId: 'jed-makkah', vehicleId: 'TRN-002' }, // Staria 900k
    { routeId: 'makkah-madinah', vehicleId: 'TRN-002' }, // Staria 1.5jt
  ],
  visa: 'needed', // 3.1jt × 6 = 18.600.000
  services: [
    { serviceId: 'SRV-002', quantity: 1 }, // group_session 1.5jt × 1
    { serviceId: 'SRV-003', quantity: 1 }, // pax 850k × 6 = 5.1jt
  ],
}

const r = calculateEstimate(config, {
  flights: mockFlights,
  hotels: mockHotels,
  routeOptions: mockTransportRouteOptions,
  visa: mockVisa,
  services: mockServices,
  departureCities: mockDepartureCities,
})

const cat = (id: string) => r.categories.find((c) => c.id === id)?.amount

// hotel Makkah: (4.5jt × 1 × 6) + (5.3jt × 1 × 6) = 27jt + 31.8jt
assert('departure Bandung (3.9jt)', cat('departure'), 3900000)
assert('flight Garuda ×6 (105jt)', cat('flight'), 105000000)
assert('hotel Makkah mixed rooms (58.8jt)', cat('hotelMakkah'), 58800000)
assert('hotel Madinah quad x2 (29jt)', cat('hotelMadinah'), 29000000)
assert('transport 2 rute (2.4jt)', cat('transport'), 2400000)
assert('visa needed ×6 (18.6jt)', cat('visa'), 18600000)
assert('services group_session + pax (6.6jt)', cat('services'), 6600000)

const expectedTotal = 3900000 + 105000000 + 58800000 + 29000000 + 2400000 + 18600000 + 6600000
assert('TOTAL', r.total, expectedTotal)
assert('perPerson = total/6', r.perPerson, Math.round(expectedTotal / 6))

// ─── Rule: visa owned = 0 ─────────────────────────────────────────────────────
const owned = calculateEstimate({ ...config, visa: 'owned' }, {
  flights: mockFlights,
  hotels: mockHotels,
  routeOptions: mockTransportRouteOptions,
  visa: mockVisa,
  services: mockServices,
  departureCities: mockDepartureCities,
})
assert('visa owned → kategori visa 0', owned.categories.find((c) => c.id === 'visa')?.amount, 0)
assert('total turun sebesar biaya visa', owned.total, expectedTotal - 18600000)

// ─── Rule: departure Jakarta = tanpa fee ──────────────────────────────────────
const jkt = calculateEstimate({ ...config, departureCity: 'Jakarta' }, {
  flights: mockFlights,
  hotels: mockHotels,
  routeOptions: mockTransportRouteOptions,
  visa: mockVisa,
  services: mockServices,
  departureCities: mockDepartureCities,
})
assert('departure Jakarta → tanpa kategori fee', jkt.categories.some((c) => c.id === 'departure'), false)

console.log(failures === 0 ? '\nSEMUA TES LULUS ✔' : `\n${failures} TES GAGAL ✗`)
process.exit(failures === 0 ? 0 : 1)
