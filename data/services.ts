export type PublicServiceIcon = 'visa' | 'badal' | 'hotel' | 'flight' | 'transport' | 'guide' | 'handling'

export interface PublicService {
  key: string
  name: string
  subtitle: string
  description: string
  icon: PublicServiceIcon
  to: string
  action: 'route' | 'inquiry'
}

/** Stable public directory metadata. Operational pricing stays backend-owned. */
export const serviceDirectory: PublicService[] = [
  { key: 'visa', name: 'Visa Umroh', subtitle: 'Pengurusan visa untuk perjalanan Umroh.', description: 'Pengurusan visa umroh resmi sampai terbit, termasuk asuransi perjalanan selama di Saudi.', icon: 'visa', to: '/services/visa', action: 'route' },
  { key: 'badal', name: 'Badal Umroh', subtitle: 'Pelaksanaan Badal Umroh sesuai amanah keluarga.', description: 'Bantuan pengurusan Badal Umroh sesuai kebutuhan keluarga Anda.', icon: 'badal', to: '/services', action: 'inquiry' },
  { key: 'hotel', name: 'Hotel', subtitle: 'Akomodasi Makkah dan Madinah.', description: 'Cari akomodasi di Makkah dan Madinah sesuai rencana perjalanan.', icon: 'hotel', to: '/hotels', action: 'route' },
  { key: 'flight', name: 'Penerbangan', subtitle: 'Pilihan penerbangan untuk perjalanan Umroh.', description: 'Lihat pilihan perjalanan udara yang tersedia.', icon: 'flight', to: '/flights', action: 'route' },
  { key: 'transport', name: 'Transportasi', subtitle: 'Transfer bandara dan perjalanan selama di Saudi.', description: 'Atur transfer dan perjalanan selama di Saudi.', icon: 'transport', to: '/transportation', action: 'route' },
  { key: 'muthawwif', name: 'Muthowwif / Pendamping', subtitle: 'Pendamping ibadah selama Umroh.', description: 'Pendamping ibadah berbahasa Indonesia — menemani dari niat hingga tahallul dengan tenang.', icon: 'guide', to: '/services', action: 'inquiry' },
  { key: 'handling', name: 'Handling Jamaah', subtitle: 'Bantuan kedatangan, bagasi, dan kebutuhan bandara.', description: 'Pendampingan check-in, bagasi, hingga proses kedatangan di Jeddah/Madinah.', icon: 'handling', to: '/services', action: 'inquiry' },
]
