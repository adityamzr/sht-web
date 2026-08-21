import { mockDepartureCities } from '~/data/mock/departures'
import type { DepartureCityOption } from '~/types'

/** Data-access layer — DEPARTURE CITIES. Phase berikutnya: GET /api/departure-cities */
export function useDepartures() {
  const fetchDepartureCities = async (): Promise<DepartureCityOption[]> => mockDepartureCities

  return { fetchDepartureCities }
}
