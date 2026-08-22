import type { Currency } from '~/types'

/** Format angka ke mata uang, default IDR ringkas tanpa desimal. */
export function formatCurrency(value: number, currency: Currency = 'IDR'): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value)
}

/** Format harga IDR dengan state aman: null → "Harga dikonfirmasi" (BUKAN Rp0 / angka sumber). */
export function formatPrice(value: number | null, currency: Currency = 'IDR'): string {
  if (value === null) return 'Harga dikonfirmasi'
  return formatCurrency(value, currency)
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

/** Tambah N hari ke tanggal ISO, hasil ISO (yyyy-mm-dd) — UTC-based (aman lintas timezone). */
export function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Hari ini dalam ISO (yyyy-mm-dd) — UTC, konsisten dengan addDaysISO. */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

/**
 * M3.1 — tanggal pulang inklusif: pulang = berangkat + (durasi − 1).
 * Terkunci: makkahNights + madinahNights = durasi − 1.
 * Contoh: berangkat 2026-10-01, durasi 9 → pulang 2026-10-09 (8 malam).
 */
export function computeReturnDate(departureIso: string, durationDays: number): string {
  return addDaysISO(departureIso, durationDays - 1)
}
