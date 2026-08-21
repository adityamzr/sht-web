import { mockTransportations, mockTransportRoutes } from '~/data/mock/transportations'
import type { Transportation } from '~/types'

/** Data-access layer — TRANSPORTATION. Phase berikutnya: GET /api/transportations */
export function useTransportations() {
  const fetchTransportations = async (): Promise<Transportation[]> =>
    mockTransportations.filter((t) => t.status === 'active')

  const fetchPopularRoutes = async (): Promise<string[]> => mockTransportRoutes

  return { fetchTransportations, fetchPopularRoutes }
}
