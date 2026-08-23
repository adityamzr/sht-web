/**
 * Konfigurasi situs terpusat.
 * whatsappNumber diambil dari runtimeConfig (public) — placeholder M0:
 * NILAI PRODUKSI (nomor resmi SHT) WAJIB diisi sebelum deployment.
 * Flow WhatsApp lead (dengan Estimation ID) diimplementasikan pada M8
 * (backend create lead dulu, baru buka WhatsApp).
 */
export function useSiteConfig() {
  const config = useRuntimeConfig()

  const whatsappNumber = config.public.whatsappNumber as string

  return {
    brandName: 'Sudut Haramain Tour',
    brandShort: 'SHT',
    tagline: 'Umroh Private, Sesuai Cara Anda.',
    whatsappNumber,
    siteUrl: config.public.siteUrl as string,
    email: 'halo@sudutharamain.id', // placeholder
    address: 'Jakarta, Indonesia', // placeholder
  }
}

/** Bangun link wa.me dengan pesan default yang ramah. */
export function whatsappLink(message?: string): string {
  const { whatsappNumber } = useSiteConfig()
  const text =
    message ??
    'Assalamu’alaikum, saya ingin konsultasi rencana Umroh Private bersama Sudut Haramain Tour.'
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}
