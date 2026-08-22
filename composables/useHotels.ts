import type { Hotel } from '~/types'
import { mapHotel, type ApiHotel } from '~/utils/mappers'

/**
 * Data-access layer — HOTEL.
 * M3: data nyata dari sht-admin (GET /api/v1/hotels).
 * Komponen hanya memakai refs di sini; mapper menormalkan payload backend.
 */
export function useHotels() {
  const config = useRuntimeConfig()
  const { data, pending, error, refresh } = useFetch<{ data: ApiHotel[] }>(
    `${config.public.apiBaseUrl}/api/v1/hotels`,
    { default: () => ({ data: [] }) },
  )

  const hotels = computed<Hotel[]>(() => (data.value?.data ?? []).map(mapHotel))
  const featured = computed<Hotel[]>(() => hotels.value.slice(0, 3))

  return { hotels, featured, pending, error, refresh }
}
