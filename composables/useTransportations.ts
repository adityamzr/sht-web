import type { TransportRouteOption, Transportation } from '~/types'
import { mapRouteOption, type ApiRoute } from '~/utils/mappers'

/**
 * Data-access layer — TRANSPORTATION (GET /api/v1/transportation).
 * - routeOptions: rute terpandu + opsi kendaraan & harga (dipakai estimator)
 * - vehicles: kendaraan unik (katalog)
 * - routes: nama rute populer (katalog)
 */
export function useTransportations() {
  const config = useRuntimeConfig()
  const { data, pending, error, refresh } = useFetch<{ data: ApiRoute[] }>(
    `${config.public.apiBaseUrl}/api/v1/transportation`,
    { default: () => ({ data: [] }) },
  )

  const routeOptions = computed<TransportRouteOption[]>(() => (data.value?.data ?? []).map(mapRouteOption))

  const vehicles = computed<Transportation[]>(() => {
    const seen = new Set<string>()
    const out: Transportation[] = []
    for (const route of routeOptions.value) {
      for (const opt of route.vehicles) {
        if (seen.has(opt.vehicle.id)) continue
        seen.add(opt.vehicle.id)
        out.push(opt.vehicle)
      }
    }
    return out
  })

  const routes = computed<string[]>(() => routeOptions.value.map((r) => r.name))

  return { routeOptions, vehicles, routes, pending, error, refresh }
}
