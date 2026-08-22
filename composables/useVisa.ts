import type { VisaProduct } from '~/types'
import { mapVisa, type ApiService } from '~/utils/mappers'

/**
 * Data-access layer — VISA (M3).
 * Visa dimodelkan sebagai service (code 'visa') di backend — diambil dari
 * GET /api/v1/services.
 */
export function useVisa() {
  const config = useRuntimeConfig()
  const { data, pending, error, refresh } = useFetch<{ data: ApiService[] }>(
    `${config.public.apiBaseUrl}/api/v1/services`,
    { default: () => ({ data: [] }) },
  )

  const visa = computed<VisaProduct | null>(() => mapVisa((data.value?.data ?? []).find((s) => s.code === 'visa')))

  return { visa, pending, error, refresh }
}
