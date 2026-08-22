import type { Service } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/services (SHT REST API — sht-admin).
 * pricingUnit mengikuti Master Context §7 (pax / room_night / vehicle_trip / group_session).
 */
export const mockServices: Service[] = [
  {
    id: 'SRV-001',
    name: 'Visa Umroh',
    description:
      'Pengurusan visa umroh resmi sampai terbit, termasuk asuransi perjalanan selama di Saudi.',
    price: 3100000,
    pricingUnit: 'pax',
    image: '/images/kaaba-tawaf.jpg',
    status: 'active',
  },
  {
    id: 'SRV-002',
    name: 'Muthowwif / Pendamping',
    description:
      'Pendamping ibadah berbahasa Indonesia — menemani dari niat hingga tahallul dengan tenang.',
    price: 1500000,
    pricingUnit: 'group_session',
    image: '/images/kaaba-tawaf.jpg',
    status: 'active',
  },
  {
    id: 'SRV-003',
    name: 'Perlengkapan Umroh',
    description:
      'Koper, kain ihram/mukena, buku doa, dan kebutuhan perjalanan ibadah lainnya.',
    price: 850000,
    pricingUnit: 'pax',
    image: '/images/madinah.jpg',
    status: 'active',
  },
  {
    id: 'SRV-004',
    name: 'Handling Bandara',
    description:
      'Pendampingan check-in, bagasi, hingga proses kedatangan di Jeddah/Madinah.',
    price: 500000,
    pricingUnit: 'pax',
    image: '/images/flight-cgk-jed.jpg',
    status: 'active',
  },
]
