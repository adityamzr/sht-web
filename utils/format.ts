import type { Currency } from '~/types'

/** Format angka ke mata uang, default IDR ringkas tanpa desimal. */
export function formatCurrency(value: number, currency: Currency = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value)
}

/** Format tanggal ISO (yyyy-mm-dd) → "12 Oktober 2026". */
export function formatDateID(iso: string): string {
  if (!iso) return ''
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`))
}

/** Tambah N hari ke tanggal ISO, hasil ISO (yyyy-mm-dd). */
export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Hari ini dalam ISO (yyyy-mm-dd). */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}
