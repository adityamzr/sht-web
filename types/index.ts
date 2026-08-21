/**
 * Domain types — Sudut Haramain Tour (customer-facing).
 * Struktur mengikuti arahan Master Project Context: cukup untuk Phase 1,
 * siap digantikan oleh response Laravel REST API tanpa mengubah UI.
 *
 * SECURITY RULE (locked): supplierCost & markup TIDAK BOLEH ada di sini.
 * Harga yang tampil ke customer selalu selling price.
 */

export type Currency = 'IDR' | 'USD' | 'SAR'
export type ProductStatus = 'active' | 'inactive'

export interface Hotel {
  id: string
  name: string
  city: 'Makkah' | 'Madinah'
  starRating: number // 1–5
  distance: string // deskripsi jarak/lokasi, ex: "±250 m dari Masjidil Haram"
  description: string
  coverImage: string
  gallery: string[]
  startingPrice: number // selling price per room per malam
  currency: Currency
  status: ProductStatus
}

export interface Flight {
  id: string
  airline: string
  route: string // ex: "CGK → JED"
  departure: string
  arrival: string
  type: 'Direct' | 'Transit'
  baggage: string // ex: "Bagasi 30 kg"
  sellingPrice: number // per orang
  currency: Currency
  status: ProductStatus
}

export interface Transportation {
  id: string
  name: string
  capacity: number // jumlah kursi/penumpang
  description: string
  image: string
  price: number // selling price per trip
  currency: Currency
  status: ProductStatus
}

export interface Service {
  id: string
  name: string
  description: string
  price: number // selling price
  pricingUnit: 'pax' | 'group_session' | 'package' // lihat Master Context §7
  image: string
  status: ProductStatus
}

export interface Testimonial {
  id: string
  name: string
  origin: string // kota asal
  quote: string
  tripType: string // ex: "Umroh Keluarga 9 hari"
}

export interface Faq {
  id: string
  question: string
  answer: string
}

/** Draft konfigurasi estimator (Phase 2 akan memakai struktur penuh). */
export interface EstimatorDraft {
  pilgrims: number
  departureCity: 'Jakarta' | 'Bandung'
  durationDays: number
  makkahNights: number
  madinahNights: number
}
