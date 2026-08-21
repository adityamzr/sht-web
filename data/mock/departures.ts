import type { DepartureCityOption } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/departure-cities (Laravel).
 * Business rule (locked): rute penerbangan internasional tetap CGK → JED.
 * Kota keberangkatan memengaruhi pricing (fee per pax).
 */
export const mockDepartureCities: DepartureCityOption[] = [
  {
    id: 'Jakarta',
    name: 'Jakarta',
    note: 'Penerbangan internasional langsung dari Jakarta (CGK).',
    feePerPax: 0,
  },
  {
    id: 'Bandung',
    name: 'Bandung',
    note: 'Penerbangan internasional tetap berangkat melalui Jakarta (CGK). Kami akan membantu menyiapkan perjalanan menuju bandara.',
    feePerPax: 650000,
  },
]
