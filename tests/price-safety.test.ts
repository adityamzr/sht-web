import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { calculateEstimate } from '../utils/estimatorCalculator'
import { formatPrice } from '../utils/format'
import { mapFlight, mapHotel, mapRouteOption, mapService, mapVisa, mapDepartureCity } from '../utils/mappers'
import type {
  DepartureCityOption,
  EstimatorConfiguration,
  Flight,
  Hotel,
  RouteVehicleOption,
  Service,
  TransportRouteOption,
  VisaProduct,
} from '../types'

/**
 * REGRESI M3.1 — harga non-IDR TIDAK BOLEH jatuh ke angka sumber saat
 * nilai IDR otoritatif null (500 SAR ≠ Rp 500). State aman: null →
 * "Harga dikonfirmasi".
 */

describe('price safety (M3.1)', () => {
  it('1. harga IDR tampil normal', () => {
    const f = mapFlight({
      id: 1, airline: 'Saudia', routeLabel: 'CGK → JED', origin: 'CGK', destination: 'JED',
      flightType: 'Direct', baggage: '30kg', pricePerPax: 16200000, pricePerPaxIdr: 16200000, currency: 'IDR',
    })
    assert.equal(f.sellingPrice, 16200000)
    assert.match(formatPrice(f.sellingPrice), /16\.200\.000/)
  })

  it('2. SAR + kurs valid → tampil IDR hasil konversi (bukan angka SAR)', () => {
    const f = mapFlight({
      id: 1, airline: 'X', routeLabel: 'CGK → JED', origin: 'CGK', destination: 'JED',
      flightType: 'Direct', baggage: '', pricePerPax: 100, pricePerPaxIdr: 435000, currency: 'SAR',
    })
    assert.equal(f.sellingPrice, 435000)
    assert.notEqual(f.sellingPrice, 100)
  })

  it('3. USD + kurs valid → tampil IDR hasil konversi', () => {
    const h = mapHotel({
      id: 9, name: 'Test', city: 'Makkah', starRating: 4, distanceLabel: '', description: '', coverImage: '',
      roomTypes: [{ id: 1, name: 'Double', capacity: 2, pricePerNight: 165, pricePerNightIdr: 2673000, currency: 'USD' }],
    })
    assert.equal(h.roomTypes[0].pricePerNight, 2673000)
    assert.equal(h.startingPrice, 2673000)
  })

  it('4. non-IDR dengan priceIdr null → null, TIDAK PERNAH fallback ke angka sumber', () => {
    const h = mapHotel({
      id: 9, name: 'Test SAR', city: 'Makkah', starRating: 4, distanceLabel: '', description: '', coverImage: '',
      roomTypes: [{ id: 1, name: 'Quad', capacity: 4, pricePerNight: 500, pricePerNightIdr: null, currency: 'SAR' }],
    })
    assert.equal(h.roomTypes[0].pricePerNight, null)
    assert.equal(h.startingPrice, null)

    const f = mapFlight({
      id: 2, airline: 'Y', routeLabel: 'CGK → JED', origin: 'CGK', destination: 'JED',
      flightType: 'Direct', baggage: '', pricePerPax: 500, pricePerPaxIdr: null, currency: 'SAR',
    })
    assert.equal(f.sellingPrice, null)

    const r = mapRouteOption({
      id: 1, name: 'Rute A', pickup: 'JED', destination: 'Makkah', description: '',
      vehicleOptions: [{ id: 1, vehicle: { id: 3, name: 'HiAce', capacity: 12, luggageLabel: '', description: '' }, pricePerTrip: 500, pricePerTripIdr: null, currency: 'SAR' }],
    })
    assert.equal(r.vehicles[0].price, null)

    const svc = mapService({
      id: 1, code: 'visa', name: 'Visa', description: '', category: 'core_journey', pricingUnit: 'pax',
      price: 500, priceIdr: null, currency: 'SAR',
    })
    assert.equal(svc.price, null)
    assert.equal(mapVisa({ id: 1, code: 'visa', name: 'Visa', description: '', category: 'core_journey', pricingUnit: 'pax', price: 500, priceIdr: null, currency: 'SAR' })!.pricePerPax, null)

    const city = mapDepartureCity({ id: 1, code: 'bandung', name: 'Bandung', feePerPax: 500, feeCurrency: 'SAR', feePerPaxIdr: null })
    assert.equal(city.feePerPax, null)
  })

  it('5. harga tidak tersedia → state customer-safe "Harga dikonfirmasi" (bukan Rp0 / angka palsu)', () => {
    assert.equal(formatPrice(null), 'Harga dikonfirmasi')
    // tidak boleh menampilkan angka sumber seolah-olah IDR
    assert.equal(formatPrice(null).includes('500'), false)
    assert.equal(formatPrice(null).includes('0'), false)
  })

  it('6. preview estimator TIDAK menafsirkan harga unavailable sebagai IDR', () => {
    const hotel: Hotel = {
      id: '9', name: 'Test SAR', city: 'Makkah', starRating: 4, distance: '', description: '',
      coverImage: '', gallery: [], startingPrice: null, currency: 'IDR', status: 'active',
      roomTypes: [{ id: '1', name: 'Quad', capacity: 4, pricePerNight: null }],
    }
    const flight: Flight = {
      id: '2', airline: 'Garuda', route: 'CGK → JED', departure: 'CGK', arrival: 'JED',
      type: 'Direct', baggage: '', sellingPrice: 17500000, currency: 'IDR', status: 'active',
    }
    const transport: TransportRouteOption[] = []
    const visa: VisaProduct = { id: 'v', name: 'Visa Umroh', description: '', pricePerPax: 3100000, currency: 'IDR' }
    const services: Service[] = []
    const departureCities: DepartureCityOption[] = [{ id: 'Jakarta', name: 'Jakarta', note: '', feePerPax: 0 }]

    const config: EstimatorConfiguration = {
      pilgrims: 4, departureCity: 'Jakarta', departureDate: '2026-11-02', durationDays: 12,
      returnDate: '2026-11-13', makkahNights: 6, madinahNights: 5, flightId: '2',
      makkahHotelId: '9', makkahRooms: [{ roomTypeId: '1', quantity: 1 }],
      madinahHotelId: '9', madinahRooms: [], transport: [], visa: 'needed', services: [],
    }
    // Madinah tidak dipilih (rooms kosong) → engine client menghitung seadanya; fokus ke baris kamar Makkah.
    const breakdown = calculateEstimate(config, { flights: [flight], hotels: [hotel], routeOptions: transport, visa, services, departureCities })

    const roomLine = breakdown.categories.find((c) => c.id === 'hotelMakkah')?.lines[0]
    assert.ok(roomLine, 'baris hotel Makkah harus ada')
    assert.equal(roomLine.unavailable, true)
    assert.equal(roomLine.amount, 0)
    assert.notEqual(roomLine.amount, 500, 'tidak boleh 500 (angka sumber SAR) dianggap IDR')
    assert.equal(breakdown.hasUnavailable, true, 'total preview harus ditandai perlu konfirmasi')
  })
})
