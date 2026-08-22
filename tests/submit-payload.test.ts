import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildSubmitPayload } from '../utils/submitPayload'
import type { EstimatorConfiguration } from '../types'

const config: EstimatorConfiguration = {
  pilgrims: 4,
  departureCity: 'Bandung',
  departureDate: '2026-10-12',
  returnDate: '2026-10-24',
  durationDays: 12,
  makkahNights: 6,
  madinahNights: 5,
  flightId: '2',
  makkahHotelId: '1',
  makkahRooms: [
    { roomTypeId: '3', quantity: 1 },
    { roomTypeId: '1', quantity: 0 }, // qty 0 → dibuang
  ],
  madinahHotelId: '4',
  madinahRooms: [{ roomTypeId: '12', quantity: 2 }],
  transport: [{ routeId: '1', vehicleId: '3' }],
  visa: 'needed',
  services: [{ serviceId: '2', quantity: 3 }],
}

describe('submit payload builder (M3)', () => {
  it('ID string dikonversi ke number', () => {
    const p = buildSubmitPayload(config, { name: 'Ahmad', whatsapp: '6281234567890' })
    assert.equal(p.trip.flightId, 2)
    assert.equal(p.trip.makkahHotelId, 1)
    assert.equal(p.trip.makkahRooms[0].roomTypeId, 3)
    assert.equal(p.trip.transport[0].routeId, 1)
    assert.equal(p.trip.transport[0].vehicleId, 3)
  })

  it('kota keberangkatan dipetakan ke kode backend', () => {
    const p = buildSubmitPayload(config, { name: 'Ahmad', whatsapp: '6281234567890' })
    assert.equal(p.trip.departureCity, 'bandung')
  })

  it('seleksi qty 0 dibuang', () => {
    const p = buildSubmitPayload(config, { name: 'Ahmad', whatsapp: '6281234567890' })
    assert.equal(p.trip.makkahRooms.length, 1)
  })

  it('kontak di-trim & optional null', () => {
    const p = buildSubmitPayload(config, { name: '  Ahmad  ', whatsapp: '6281234567890', email: '', notes: 'tes' })
    assert.equal(p.contact.name, 'Ahmad')
    assert.equal(p.contact.email, null)
    assert.equal(p.contact.notes, 'tes')
  })

  it('INVARIANT: payload TIDAK memuat harga/total client', () => {
    const p = buildSubmitPayload(config, { name: 'Ahmad', whatsapp: '6281234567890' })
    const json = JSON.stringify(p).toLowerCase()
    for (const forbidden of ['price', 'total', 'amount', 'markup', 'supplier', 'cost', 'currency']) {
      assert.equal(json.includes(forbidden), false, `payload tidak boleh memuat field ${forbidden}`)
    }
  })
})
