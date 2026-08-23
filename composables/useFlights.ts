import type { Flight } from '~/types'
import { mapFlight, type ApiFlight } from '~/utils/mappers'

/** Data-access layer — FLIGHT (GET /api/v1/flights, sht-admin). */
export function useFlights() {
  const config = useRuntimeConfig()
  const { data, pending, error, refresh } = useFetch<{ data: ApiFlight[] }>(
    `${config.public.apiBaseUrl}/api/v1/flights`,
    { default: () => ({ data: [] }) },
  )

  const flights = computed<Flight[]>(() => (data.value?.data ?? []).map(mapFlight))

  return { flights, pending, error, refresh }
}
