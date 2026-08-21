import { mockVisa } from '~/data/mock/visa'
import type { VisaProduct } from '~/types'

/** Data-access layer — VISA. Phase berikutnya: GET /api/visa */
export function useVisa() {
  const fetchVisaProduct = async (): Promise<VisaProduct> => mockVisa

  return { fetchVisaProduct }
}
