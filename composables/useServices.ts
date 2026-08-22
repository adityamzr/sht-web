import type { Service } from '~/types'
import { mapService, type ApiService } from '~/utils/mappers'

/** Data-access layer — SERVICE (GET /api/v1/services, sht-admin). */
export function useServices() {
  const config = useRuntimeConfig()
  const { data, pending, error, refresh } = useFetch<{ data: ApiService[] }>(
    `${config.public.apiBaseUrl}/api/v1/services`,
    { default: () => ({ data: [] }) },
  )

  const services = computed<Service[]>(() => (data.value?.data ?? []).map(mapService))

  return { services, pending, error, refresh }
}
