import type {
  DepartureCityId,
  DepartureCityOption,
  Flight,
  Hotel,
  RoomType,
  RouteVehicleOption,
  Service,
  TransportRouteOption,
  Transportation,
  VisaProduct,
} from '~/types'

/**
 * MAPPER API PUBLIK (sht-admin /api/v1) → tipe frontend existing.
 * Komponen UI TIDAK boleh tahu bentuk payload backend; semua adaptasi
 * dilakukan di sini / di composable. Harga tampil = harga IDR hasil
 * konversi server (nilai *Idr), fallback ke nilai sumber bila null.
 */

// ─── Shape API (subset yang dipakai) ─────────────────────────────────────────
export interface ApiDepartureCity {
  id: number
  code: string
  name: string
  feePerPax: number | null
  feeCurrency: string
  feePerPaxIdr: number | null
}
export interface ApiRoomType {
  id: number
  name: string
  capacity: number
  pricePerNight: number | null
  pricePerNightIdr: number | null
  currency: string
}
export interface ApiHotel {
  id: number
  name: string
  city: string
  starRating: number
  distanceLabel: string
  description: string
  coverImage: string
  roomTypes: ApiRoomType[]
}
export interface ApiFlight {
  id: number
  airline: string
  routeLabel: string
  origin: string
  destination: string
  flightType: string
  baggage: string
  pricePerPax: number | null
  pricePerPaxIdr: number | null
  currency: string
}
export interface ApiVehicle {
  id: number
  name: string
  capacity: number
  luggageLabel: string
  description: string
}
export interface ApiRouteOption {
  id: number
  vehicle: ApiVehicle
  pricePerTrip: number | null
  pricePerTripIdr: number | null
  currency: string
}
export interface ApiRoute {
  id: number
  name: string
  pickup: string
  destination: string
  description: string
  vehicleOptions: ApiRouteOption[]
}
export interface ApiService {
  id: number
  code: string | null
  name: string
  description: string
  category: string
  pricingUnit: string
  price: number | null
  priceIdr: number | null
  currency: string
}

// ─── Mapper ──────────────────────────────────────────────────────────────────
export function mapDepartureCity(c: ApiDepartureCity): DepartureCityOption {
  const id: DepartureCityId =
    c.code === 'jakarta' || c.code === 'bandung' ? (c.code === 'jakarta' ? 'Jakarta' : 'Bandung') : c.name === 'Jakarta' ? 'Jakarta' : c.name === 'Bandung' ? 'Bandung' : 'Jakarta'
  return {
    id,
    name: c.name,
    note: '',
    feePerPax: c.feePerPaxIdr ?? 0,
  }
}

function mapRoomType(r: ApiRoomType): RoomType {
  return {
    id: String(r.id),
    name: r.name,
    capacity: r.capacity,
    pricePerNight: r.pricePerNightIdr ?? r.pricePerNight ?? 0,
  }
}

export function mapHotel(h: ApiHotel): Hotel {
  const rooms = h.roomTypes.map(mapRoomType)
  const prices = rooms.map((r) => r.pricePerNight).filter((p) => p > 0)
  return {
    id: String(h.id),
    name: h.name,
    city: h.city === 'Madinah' ? 'Madinah' : 'Makkah',
    starRating: h.starRating,
    distance: h.distanceLabel,
    description: h.description,
    coverImage: h.coverImage,
    gallery: h.coverImage ? [h.coverImage] : [],
    startingPrice: prices.length ? Math.min(...prices) : 0,
    currency: 'IDR',
    status: 'active',
    roomTypes: rooms,
  }
}

export function mapFlight(f: ApiFlight): Flight {
  return {
    id: String(f.id),
    airline: f.airline,
    route: f.routeLabel,
    departure: f.origin,
    arrival: f.destination,
    type: f.flightType === 'Transit' ? 'Transit' : 'Direct',
    baggage: f.baggage,
    sellingPrice: f.pricePerPaxIdr ?? f.pricePerPax ?? 0,
    currency: 'IDR',
    status: 'active',
  }
}

function mapVehicle(v: ApiVehicle, price: number): Transportation {
  return {
    id: String(v.id),
    name: v.name,
    capacity: v.capacity,
    description: v.luggageLabel ? `${v.description} ${v.luggageLabel}`.trim() : v.description,
    image: '',
    price,
    currency: 'IDR',
    status: 'active',
  }
}

export function mapRouteOption(r: ApiRoute): TransportRouteOption {
  return {
    id: String(r.id),
    name: r.name,
    description: r.description,
    vehicles: r.vehicleOptions.map<RouteVehicleOption>((o) => {
      const price = o.pricePerTripIdr ?? o.pricePerTrip ?? 0
      return { vehicle: mapVehicle(o.vehicle, price), price }
    }),
  }
}

export function mapService(s: ApiService): Service {
  const unit = s.pricingUnit === 'group_session' ? 'group_session' : s.pricingUnit === 'room_night' || s.pricingUnit === 'vehicle_trip' ? 'pax' : 'pax'
  return {
    id: String(s.id),
    code: s.code,
    name: s.name,
    description: s.description,
    price: s.priceIdr ?? s.price ?? 0,
    pricingUnit: unit as Service['pricingUnit'],
    image: '',
    status: 'active',
  }
}

export function mapVisa(s: ApiService | undefined): VisaProduct | null {
  if (!s) return null
  return {
    id: String(s.id),
    name: s.name,
    description: s.description,
    pricePerPax: s.priceIdr ?? s.price ?? 0,
    currency: 'IDR',
  }
}
