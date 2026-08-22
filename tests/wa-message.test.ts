import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { buildWhatsAppMessage, buildServiceInquiryMessage } from '../utils/waMessage'
import type { EstimationSubmitResult, Service } from '../types'

const result: EstimationSubmitResult = {
  estimationNumber: 'EST-000123',
  status: 'submitted',
  totalAmount: 224300000,
  perPersonAmount: 37383333,
  currency: 'IDR',
  leadId: 7,
  trip: {
    pilgrims: 6,
    departureCity: 'Bandung',
    departureDate: '2026-10-12',
    returnDate: '2026-10-24',
    durationDays: 12,
    makkahNights: 6,
    madinahNights: 5,
    visa: 'needed',
  },
  items: [
    { category: 'flight', label: 'Penerbangan', detail: 'Garuda Indonesia · CGK → JED — Rp 17.500.000 × 6 jamaah', unit: 'pax', quantity: 6, amount: 105000000 },
    { category: 'hotel_makkah', label: 'Hotel Makkah — Swissôtel Makkah', detail: 'Quad × 1 · 6 malam', unit: 'room_night', quantity: 1, amount: 58800000 },
    { category: 'visa', label: 'Visa Umroh', detail: 'Rp 3.100.000 × 6 jamaah', unit: 'pax', quantity: 6, amount: 18600000 },
  ],
}

describe('WhatsApp message builder (M3)', () => {
  it('memuat EST-ID', () => {
    const msg = buildWhatsAppMessage('Ahmad Fauzi', result)
    assert.match(msg, /EST-000123/)
  })

  it('memuat total otoritatif & per orang', () => {
    const msg = buildWhatsAppMessage('Ahmad Fauzi', result)
    assert.match(msg, /224\.300\.000/)
    assert.match(msg, /37\.383\.333/)
  })

  it('memuat ringkasan trip (jamaah, kota, malam)', () => {
    const msg = buildWhatsAppMessage('Ahmad Fauzi', result)
    assert.match(msg, /6 · Bandung/)
    assert.match(msg, /Makkah 6 malam · Madinah 5 malam/)
    assert.match(msg, /12 hari/)
  })

  it('memuat rincian item dari respons server', () => {
    const msg = buildWhatsAppMessage('Ahmad Fauzi', result)
    assert.match(msg, /Penerbangan/)
    assert.match(msg, /Swissôtel Makkah/)
    assert.match(msg, /Visa Umroh/)
  })

  it('TIDAK memuat data internal (supplier/markup/notes internal)', () => {
    const msg = buildWhatsAppMessage('Ahmad Fauzi', result)
    for (const forbidden of ['supplier', 'markup', 'internalNotes', 'supplier_cost']) {
      assert.equal(msg.toLowerCase().includes(forbidden), false)
    }
  })

  it('pesan inquiry layanan memuat nama layanan', () => {
    const svc: Service = {
      id: '1',
      code: 'visa',
      name: 'Visa Umroh',
      description: 'd',
      price: 3100000,
      pricingUnit: 'pax',
      image: '',
      status: 'active',
    }
    const msg = buildServiceInquiryMessage('Siti Maryam', svc)
    assert.match(msg, /Visa Umroh/)
    assert.match(msg, /Siti Maryam/)
  })
})
