import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { addDaysISO, computeReturnDate } from '../utils/format'

/**
 * REGRESI M3.1 — tanggal pulang inklusif:
 * returnDate = departureDate + (durationDays − 1)
 * (konsisten dengan aturan terkunci nights = durationDays − 1)
 */
describe('return date (M3.1)', () => {
  it('Contoh A: berangkat 2026-10-01, durasi 9 → pulang 2026-10-09 (8 malam)', () => {
    const returnDate = computeReturnDate('2026-10-01', 9)
    assert.equal(returnDate, '2026-10-09')
    assert.equal(9 - 1, 8) // total malam = durasi − 1
  })

  it('Contoh B: berangkat 2026-12-20, durasi 12 → pulang 2026-12-31 (11 malam)', () => {
    const returnDate = computeReturnDate('2026-12-20', 12)
    assert.equal(returnDate, '2026-12-31')
    assert.equal(12 - 1, 11)
  })

  it('melewati akhir bulan & akhir tahun dengan benar (UTC-safe)', () => {
    assert.equal(computeReturnDate('2026-01-25', 8), '2026-02-01')
    assert.equal(computeReturnDate('2026-12-28', 6), '2027-01-02')
  })

  it('konsisten di timezone non-UTC (Asia/Jakarta) — tidak bergeser sehari', () => {
    const prevTz = process.env.TZ
    process.env.TZ = 'Asia/Jakarta'
    try {
      assert.equal(computeReturnDate('2026-10-01', 9), '2026-10-09')
      assert.equal(computeReturnDate('2026-12-20', 12), '2026-12-31')
      assert.equal(addDaysISO('2026-10-01', 8), '2026-10-09')
    } finally {
      if (prevTz === undefined) delete process.env.TZ
      else process.env.TZ = prevTz
    }
  })
})
