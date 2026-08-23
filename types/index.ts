/**
 * Domain types — Sudut Haramain Tour (customer-facing).
 * Struktur mengikuti arahan Master Project Context: cukup untuk frontend sekarang,
 * siap digantikan oleh response SHT REST API (dari `sht-admin`, Nuxt/Nitro) tanpa mengubah UI.
 *
 * SECURITY RULE (locked): supplierCost & markup TIDAK BOLEH ada di sini.
 * Harga yang tampil ke customer selalu selling price.
 */

export type Currency = 'IDR' | 'USD' | 'SAR'
export type ProductStatus = 'active' | 'inactive'

// ─── Room ────────────────────────────────────────────────────────────────────
export interface RoomType {
  id: string // 'double' | 'triple' | 'quad'
  name: string // 'Double' | 'Triple' | 'Quad'
  capacity: number // jumlah orang per kamar
  /** Harga jual per kamar/malam DALAM IDR (hasil konversi server).
   *  null = tidak tersedia (mis. kurs hilang) — JANGAN fallback ke angka sumber. */
  pricePerNight: number | null
}

export interface RoomSelection {
  roomTypeId: string
  quantity: number
}

// ─── Hotel ───────────────────────────────────────────────────────────────────
export interface Hotel {
  id: string
  name: string
  city: 'Makkah' | 'Madinah'
  starRating: number // 1–5
  distance: string // deskripsi jarak/lokasi, ex: "±250 m dari Masjidil Haram"
  description: string
  coverImage: string
  gallery: string[]
  /** null = tidak ada harga IDR tersedia — tampilkan "Harga dikonfirmasi". */
  startingPrice: number | null // selling price IDR per room per malam
  currency: Currency
  status: ProductStatus
  roomTypes: RoomType[]
}

// ─── Flight ──────────────────────────────────────────────────────────────────
export interface Flight {
  id: string
  airline: string
  route: string // ex: "CGK → JED"
  departure: string
  arrival: string
  type: 'Direct' | 'Transit'
  baggage: string // ex: "Bagasi 30 kg"
  /** null = harga IDR tidak tersedia (kurs hilang) — bukan Rp0, bukan angka sumber. */
  sellingPrice: number | null // IDR per orang
  currency: Currency
  status: ProductStatus
}

// ─── Transportation ──────────────────────────────────────────────────────────
export interface Transportation {
  id: string
  name: string
  capacity: number // jumlah kursi/penumpang
  description: string
  image: string
  price: number | null // selling price IDR per trip (null = tidak tersedia)
  currency: Currency
  status: ProductStatus
}

export interface RouteVehicleOption {
  vehicle: Transportation
  /** null = harga IDR tidak tersedia untuk kombinasi rute ini. */
  price: number | null // selling price IDR untuk rute ini
}

export interface TransportRouteOption {
  id: string
  name: string // ex: "Bandara Jeddah → Makkah"
  description: string
  vehicles: RouteVehicleOption[]
}

export interface TransportSelection {
  routeId: string
  vehicleId: string | null // null = rute ditandai perlu, kendaraan belum dipilih
}

// ─── Visa ────────────────────────────────────────────────────────────────────
export interface VisaProduct {
  id: string
  name: string
  description: string
  /** null = harga IDR tidak tersedia (kurs hilang). */
  pricePerPax: number | null
  currency: Currency
}

export type VisaChoice = 'owned' | 'needed'

// ─── Additional Service ──────────────────────────────────────────────────────
export interface Service {
  id: string
  code: string | null // slug backend ('visa', 'muthawwif', ...)
  name: string
  description: string
  /** null = harga IDR tidak tersedia (kurs hilang). */
  price: number | null // selling price IDR
  pricingUnit: 'pax' | 'group_session' | 'package' // lihat Master Context §7
  image: string
  status: ProductStatus
}

export interface ServiceSelection {
  serviceId: string
  quantity: number
}

// ─── Departure ───────────────────────────────────────────────────────────────
export type DepartureCityId = 'Jakarta' | 'Bandung'

export interface DepartureCityOption {
  id: DepartureCityId
  name: string
  note: string
  /** null = biaya belum bisa ditentukan (kurs hilang); 0 = gratis. */
  feePerPax: number | null // selling price IDR per pax (0 untuk Jakarta)
}

// ─── Content ─────────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  origin: string
  quote: string
  tripType: string
}

export interface Faq {
  id: string
  question: string
  answer: string
}

// ─── Estimator ───────────────────────────────────────────────────────────────
/** Konfigurasi penuh perjalanan customer (serializable). */
export interface EstimatorConfiguration {
  pilgrims: number
  departureCity: DepartureCityId | null
  departureDate: string // ISO yyyy-mm-dd
  durationDays: number
  returnDate: string // derived — ISO yyyy-mm-dd
  makkahNights: number
  madinahNights: number
  flightId: string | null
  makkahHotelId: string | null
  makkahRooms: RoomSelection[]
  madinahHotelId: string | null
  madinahRooms: RoomSelection[]
  transport: TransportSelection[]
  visa: VisaChoice | null
  services: ServiceSelection[]
}

export interface EstimateLine {
  label: string
  detail?: string
  amount: number
  /** true = harga komponen ini belum tersedia (jangan tampilkan sebagai Rp0). */
  unavailable?: boolean
}

export interface EstimateCategory {
  id:
    | 'departure'
    | 'flight'
    | 'hotelMakkah'
    | 'hotelMadinah'
    | 'transport'
    | 'visa'
    | 'services'
  label: string
  amount: number
  lines: EstimateLine[]
}

export interface EstimatorBreakdown {
  categories: EstimateCategory[]
  total: number
  perPerson: number
  /** true = ada komponen dengan harga tidak tersedia — total PREVIEW belum final. */
  hasUnavailable: boolean
}

// ─── M3: hasil submit estimasi (nilai otoritatif dari backend) ───────────────
export interface EstimationSubmitItem {
  category: string
  label: string
  detail: string | null
  unit: string | null
  quantity: number | null
  amount: number
}

export interface EstimationSubmitResult {
  estimationNumber: string
  status: string
  totalAmount: number
  perPersonAmount: number
  currency: string
  trip: {
    pilgrims: number
    departureCity: string
    departureDate: string
    returnDate: string
    durationDays: number
    makkahNights: number
    madinahNights: number
    visa: 'needed' | 'owned'
  }
  items: EstimationSubmitItem[]
  leadId: number
}

export interface ServiceInquiryResult {
  id: number
  status: string
}
