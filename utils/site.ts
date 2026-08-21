/**
 * Konfigurasi situs terpusat.
 * whatsappNumber diambil dari runtimeConfig (public) — placeholder Phase 1.
 * Flow WhatsApp lead (dengan Estimation ID) diimplementasikan Phase 2.
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
