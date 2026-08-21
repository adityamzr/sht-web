import type { Transportation } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/transportations (Laravel).
 * Transportation Planner penuh (route-based, guided) baru ada di Phase 2.
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

/** Contoh rute populer — referensi untuk Transportation Planner Phase 2. */
export const mockTransportRoutes = [
  'Bandara Jeddah → Makkah',
  'Makkah → Madinah',
  'Madinah → Bandara Madinah',
  'City tour Makkah & ziarah sekitar',
]
