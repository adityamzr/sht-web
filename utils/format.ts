import type { Currency } from '~/types'

/** Format angka ke mata uang, default IDR ringkas tanpa desimal. */
export function formatCurrency(value: number, currency: Currency = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value)
}

/** "Rp 4.500.000" style pendek untuk card. */
export function formatStartPrice(value: number, currency: Currency = 'IDR'): string {
  return formatCurrency(value, currency)
}
