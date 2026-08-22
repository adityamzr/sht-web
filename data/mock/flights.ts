import type { Flight } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/flights (SHT REST API — sht-admin).
 * Rute MVP (locked): CGK → JED, opsi dikelola admin — bukan live GDS/OTA.
 * Harga = SELLING PRICE per orang.
 */
export const mockFlights: Flight[] = [
  {
    id: 'FLT-001',
    airline: 'Saudia',
    route: 'CGK → JED',
    departure: 'Jakarta (CGK)',
    arrival: 'Jeddah (JED)',
    type: 'Direct',
    baggage: 'Bagasi 30 kg',
    sellingPrice: 16200000,
    currency: 'IDR',
    status: 'active',
  },
  {
    id: 'FLT-002',
    airline: 'Garuda Indonesia',
    route: 'CGK → JED',
    departure: 'Jakarta (CGK)',
    arrival: 'Jeddah (JED)',
    type: 'Direct',
    baggage: 'Bagasi 30 kg',
    sellingPrice: 17500000,
    currency: 'IDR',
    status: 'active',
  },
  {
    id: 'FLT-003',
    airline: 'Qatar Airways',
    route: 'CGK → DOH → JED',
    departure: 'Jakarta (CGK)',
    arrival: 'Jeddah (JED)',
    type: 'Transit',
    baggage: 'Bagasi 30 kg',
    sellingPrice: 14800000,
    currency: 'IDR',
    status: 'active',
  },
]
