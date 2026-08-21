import { mockFlights } from '~/data/mock/flights'
import type { Flight } from '~/types'

/** Data-access layer — FLIGHT. Phase berikutnya: GET /api/flights */
export function useFlights() {
  const fetchFlights = async (): Promise<Flight[]> =>
    mockFlights.filter((f) => f.status === 'active')

  return { fetchFlights }
}
