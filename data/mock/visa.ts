import type { VisaProduct } from '~/types'

/**
 * MOCK DATA — akan digantikan response GET /api/visa (SHT REST API — sht-admin).
 * Visa mandatory secara konsep; opsional sebagai biaya (customer bisa sudah punya).
 */
export const mockVisa: VisaProduct = {
  id: 'VSA-001',
  name: 'Visa Umroh',
  description: 'Pengurusan visa umroh resmi sampai terbit — termasuk asuransi perjalanan selama di Saudi.',
  pricePerPax: 3100000,
  currency: 'IDR',
}
