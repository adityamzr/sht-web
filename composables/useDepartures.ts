import type { DepartureCityOption } from '~/types'
import { mapDepartureCity, type ApiDepartureCity } from '~/utils/mappers'

/** Data-access layer — DEPARTURE CITIES (GET /api/v1/departure-cities). */
export function useDepartures() {
  const config = useRuntimeConfig()
  const { data, pending, error, refresh } = useFetch<{ data: ApiDepartureCity[] }>(
    `${config.public.apiBaseUrl}/api/v1/departure-cities`,
    { default: () => ({ data: [] }) },
  )

  const cities = computed<DepartureCityOption[]>(() => (data.value?.data ?? []).map(mapDepartureCity))

  return { cities, pending, error, refresh }
}
