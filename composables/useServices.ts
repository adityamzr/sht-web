import { mockServices } from '~/data/mock/services'
import type { Service } from '~/types'

/** Data-access layer — SERVICE. Phase berikutnya: GET /api/services */
export function useServices() {
  const fetchServices = async (): Promise<Service[]> =>
    mockServices.filter((s) => s.status === 'active')

  return { fetchServices }
}
