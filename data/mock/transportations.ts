import type { Transportation, TransportRouteOption } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/transportations (Laravel).
 * Transportation Planner penuh (route-based, guided) ada di Phase 2 estimator.
 */
export const mockTransportations: Transportation[] = [
  {
    id: 'TRN-001',
    name: 'Sedan',
    capacity: 3,
    description: 'Nyaman untuk pasangan atau keluarga kecil hingga 3 jamaah.',
    image: '/images/transport-van.jpg',
    price: 650000,
    currency: 'IDR',
    status: 'active',
  },
  {
    id: 'TRN-002',
    name: 'Hyundai Staria',
    capacity: 6,
    description: 'Lega dan premium untuk keluarga hingga 6 jamaah dengan bagasi.',
    image: '/images/transport-van.jpg',
    price: 900000,
    currency: 'IDR',
    status: 'active',
  },
  {
    id: 'TRN-003',
    name: 'Toyota HiAce',
    capacity: 12,
    description: 'Andalan rombongan kecil hingga 12 jamaah antar-kota.',
    image: '/images/transport-van.jpg',
    price: 1250000,
    currency: 'IDR',
    status: 'active',
  },
]

/** Contoh rute populer — untuk halaman publik /transportation. */
export const mockTransportRoutes = [
  'Bandara Jeddah → Makkah',
  'Makkah → Madinah',
  'Madinah → Bandara Madinah',
  'City tour Makkah & ziarah sekitar',
]

const sedan = mockTransportations[0]
const staria = mockTransportations[1]
const hiace = mockTransportations[2]

/**
 * Rute terpandu untuk estimator — setiap rute punya opsi kendaraan + harga.
 * Validasi kapasitas kendaraan dilakukan di flow composable (capacity >= pilgrims).
 */
export const mockTransportRouteOptions: TransportRouteOption[] = [
  {
    id: 'jed-makkah',
    name: 'Bandara Jeddah → Makkah',
    description: 'Penjemputan saat tiba di Jeddah, langsung menuju hotel di Makkah.',
    vehicles: [
      { vehicle: sedan, price: 650000 },
      { vehicle: staria, price: 900000 },
      { vehicle: hiace, price: 1250000 },
    ],
  },
  {
    id: 'makkah-madinah',
    name: 'Makkah → Madinah',
    description: 'Perjalanan darat antar dua kota suci (±4–5 jam).',
    vehicles: [
      { vehicle: sedan, price: 1100000 },
      { vehicle: staria, price: 1500000 },
      { vehicle: hiace, price: 1900000 },
    ],
  },
  {
    id: 'madinah-airport',
    name: 'Madinah → Bandara',
    description: 'Antar-jemput dari hotel Madinah menuju bandara kepulangan.',
    vehicles: [
      { vehicle: sedan, price: 550000 },
      { vehicle: staria, price: 750000 },
      { vehicle: hiace, price: 1050000 },
    ],
  },
]
