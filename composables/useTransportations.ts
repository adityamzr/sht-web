import { mockTransportations, mockTransportRoutes, mockTransportRouteOptions } from '~/data/mock/transportations'
import type { TransportRouteOption, Transportation } from '~/types'

/** Data-access layer — TRANSPORTATION. Phase berikutnya: GET /api/transportations */
export function useTransportations() {
  const fetchTransportations = async (): Promise<Transportation[]> =>
    mockTransportations.filter((t) => t.status === 'active')

  const fetchPopularRoutes = async (): Promise<string[]> => mockTransportRoutes

  /** Rute terpandu + opsi kendaraan & harga (dipakai estimator). */
  const fetchTransportRouteOptions = async (): Promise<TransportRouteOption[]> =>
    mockTransportRouteOptions

  return { fetchTransportations, fetchPopularRoutes, fetchTransportRouteOptions }
}
