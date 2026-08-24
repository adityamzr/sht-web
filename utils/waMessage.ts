import type { EstimationSubmitResult, Service } from '~/types'

/**
 * Bangun pesan WhatsApp handoff (M3).
 * HANYA dibuka setelah backend berhasil menyimpan estimasi + lead + EST-ID.
 * Isi dibangun dari RESPONS SERVER (nilai otoritatif) — bukan preview client.
 * Dilarang memuat: supplier cost, markup, catatan internal, ID internal
 * selain EST-ID.
 */

const fmtMoney = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

function fmtDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function buildWhatsAppMessage(customerName: string, result: EstimationSubmitResult): string {
  const lines: string[] = []
  lines.push(`Assalamu'alaikum, saya ${customerName} ingin konsultasi rencana Umroh private.`)
  lines.push('')
  lines.push(`📋 Estimasi: ${result.estimationNumber}`)
  const t = result.trip
  lines.push(`👥 Jamaah: ${t.pilgrims} · ${t.departureCity}`)
  lines.push(`🗓️ ${fmtDate(t.departureDate)} → ${fmtDate(t.returnDate)} (${t.durationDays} hari)`)
  lines.push(`🕋 Makkah ${t.makkahNights} malam · Madinah ${t.madinahNights} malam`)
  lines.push('')
  lines.push('Rincian:')
  for (const item of result.items) {
    const detail = item.detail ? ` — ${item.detail}` : ''
    lines.push(`• ${item.label}${detail}: ${fmtMoney(item.amount)}`)
  }
  lines.push('')
  lines.push(`💰 Total estimasi: ${fmtMoney(result.totalAmount)} (± ${fmtMoney(result.perPersonAmount)}/orang)`)
  lines.push('')
  lines.push('Mohon bantu konfirmasi ketersediaan & harga final. Terima kasih!')
  return lines.join('\n')
}

/** Pesan inquiry layanan tunggal (tanpa estimasi). */
export function buildServiceInquiryMessage(customerName: string, service: Pick<Service, 'name'> | null): string {
  const lines: string[] = []
  lines.push(`Assalamu'alaikum, saya ${customerName} ingin konsultasi layanan:${service ? ` ${service.name}` : ''}.`)
  lines.push('Mohon info detail dan proses selanjutnya. Terima kasih!')
  return lines.join('\n')
}
