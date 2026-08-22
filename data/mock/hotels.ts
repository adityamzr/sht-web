import type { Hotel } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/hotels (SHT REST API — sht-admin) di fase berikutnya.
 * Harga = SELLING PRICE (supplier cost/markup tidak pernah masuk sini).
 * roomTypes: Double/Triple/Quad dengan harga per kamar per malam.
 */
export const mockHotels: Hotel[] = [
  {
    id: 'HTL-001',
    name: 'Swissôtel Makkah',
    city: 'Makkah',
    starRating: 5,
    distance: '±250 m dari Masjidil Haram',
    description:
      'Bagian dari kompleks Abraj Al Bait — akses jalan kaki langsung ke pelataran Masjidil Haram dengan pilihan pemandangan Ka’bah.',
    coverImage: '/images/hotel-swissotel.jpg',
    gallery: ['/images/hotel-swissotel.jpg'],
    startingPrice: 4500000,
    currency: 'IDR',
    status: 'active',
    roomTypes: [
      { id: 'double', name: 'Double', capacity: 2, pricePerNight: 5300000 },
      { id: 'triple', name: 'Triple', capacity: 3, pricePerNight: 4700000 },
      { id: 'quad', name: 'Quad', capacity: 4, pricePerNight: 4500000 },
    ],
  },
  {
    id: 'HTL-002',
    name: 'Pullman ZamZam Makkah',
    city: 'Makkah',
    starRating: 5,
    distance: '±300 m dari Masjidil Haram',
    description:
      'Hotel favorit jamaah Indonesia dengan akses masjid yang sangat dekat, kamar luas, dan hidangan yang ramah lidah Nusantara.',
    coverImage: '/images/hotel-pullman.jpg',
    gallery: ['/images/hotel-pullman.jpg'],
    startingPrice: 4100000,
    currency: 'IDR',
    status: 'active',
    roomTypes: [
      { id: 'double', name: 'Double', capacity: 2, pricePerNight: 4800000 },
      { id: 'triple', name: 'Triple', capacity: 3, pricePerNight: 4300000 },
      { id: 'quad', name: 'Quad', capacity: 4, pricePerNight: 4100000 },
    ],
  },
  {
    id: 'HTL-003',
    name: 'Anjum Hotel Makkah',
    city: 'Makkah',
    starRating: 5,
    distance: '±350 m dari Masjidil Haram',
    description:
      'Menara kembar di sisi Jabal Al Ka’bah — kamar modern, lift banyak dan cepat, cocok untuk keluarga besar.',
    coverImage: '/images/hotel-anjum.jpg',
    gallery: ['/images/hotel-anjum.jpg'],
    startingPrice: 3800000,
    currency: 'IDR',
    status: 'active',
    roomTypes: [
      { id: 'double', name: 'Double', capacity: 2, pricePerNight: 4400000 },
      { id: 'triple', name: 'Triple', capacity: 3, pricePerNight: 4000000 },
      { id: 'quad', name: 'Quad', capacity: 4, pricePerNight: 3800000 },
    ],
  },
  {
    id: 'HTL-004',
    name: 'Sofitel Shahd Al Madinah',
    city: 'Madinah',
    starRating: 5,
    distance: '±150 m dari Masjid Nabawi',
    description:
      'Berada persis di kawasan central Madinah — suasana tenang khas kota Rasulullah, hanya beberapa langkah dari pelataran Nabawi.',
    coverImage: '/images/hotel-sofitel.jpg',
    gallery: ['/images/hotel-sofitel.jpg'],
    startingPrice: 2900000,
    currency: 'IDR',
    status: 'active',
    roomTypes: [
      { id: 'double', name: 'Double', capacity: 2, pricePerNight: 3400000 },
      { id: 'triple', name: 'Triple', capacity: 3, pricePerNight: 3100000 },
      { id: 'quad', name: 'Quad', capacity: 4, pricePerNight: 2900000 },
    ],
  },
]
