import type { Config } from 'tailwindcss'

/**
 * Design tokens — SUDUT HARAMAIN TOUR UI Guidance.
 *
 * ═══ M4A.1.1 — PALET RESMI (berdasarkan logo resmi SHT) ═══════════════
 * Token `sht.*` adalah PALET RESMI & PREFERRED untuk semua pekerjaan UI
 * baru (M4A+). Prinsip proporsi visual: ±60% warm neutral/off-white,
 * ±25% olive family, ±10% charcoal/text, ±5% gold accent (gold = aksen,
 * BUKAN warna dominan). Jangan membuat semua section olive.
 *
 *  sht.olive        #3A4428  brand-primary   (identitas brand, dark surface, overlay hero)
 *  sht.olive-dark   #2D351F  brand-primary-dark (deep surface, hover gelap, teks di area terang)
 *  sht.gold         #D3C168  brand-accent    (highlight kecil, eyebrow, divider, CTA di dark surface)
 *  sht.sage         #7F8968  brand-soft      (ikon subtle, border/aksen sekunder)
 *  sht.off-white    #F6F4ED  surface-warm    (kanvas terang utama — bukan putih steril)
 *  sht.stone        #E4E3DE  surface-muted   (border, divider, separasi halus)
 *  sht.charcoal     #242822  text-primary    (teks utama di area terang)
 *
 * ═══ TOKEN LAMA (LEGACY — jangan dipakai untuk pekerjaan UI baru) ════
 * `brand.sky/sky-deep/teal/green`, `gold`, `neutral.*`, gradient
 * `bg-sky-gradient`/`bg-kabah-gradient` = asumsi warna lama (teal/sky/
 * green/gold). DIPERTAHANKAN untuk backward-compatibility halaman yang
 * belum dimigrasi (hotels, flights, services, estimator, admin, dsb.).
 * Halaman-halaman tersebut akan dimigrasi ke `sht.*` di task M4A
 * masing-masing — jangan dimigrasi serentak di sini.
 */
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        // ── PALET RESMI SHT (PREFERRED) ────────────────────────────────
        sht: {
          olive: '#3A4428', // brand-primary
          'olive-dark': '#2D351F', // brand-primary-dark
          gold: '#D3C168', // brand-accent
          sage: '#7F8968', // brand-soft
          'off-white': '#F6F4ED', // surface-warm
          stone: '#E4E3DE', // surface-muted
          charcoal: '#242822', // text-primary
        },

        // ── LEGACY (dipertahankan untuk kompatibilitas) ─────────────────
        brand: {
          sky: '#BFE6F2', // Sky Blue — langit Mekkah, bg hero/section (LEGACY)
          'sky-deep': '#7CC7DA', // Deep Sky — pendukung sky (LEGACY)
          teal: '#3DA7B7', // Teal Blue — aksen sekunder (LEGACY)
          green: '#0F3D3A', // Deep Green — brand utama (LEGACY)
        },
        neutral: {
          white: '#FFFFFF',
          soft: '#F8FAFB', // background utama (LEGACY — pindah ke sht.off-white bertahap)
          warm: '#F1F4F6', // section background (LEGACY — pindah ke sht.stone/off-white)
          line: '#E3E7EB', // border, divider (LEGACY — pindah ke sht.stone)
          charcoal: '#1B1F23', // teks utama (LEGACY — pindah ke sht.charcoal)
        },
        gold: {
          DEFAULT: '#D4AF37', // Emas Ka'bah (LEGACY — pindah ke sht.gold)
          soft: '#EAD8A6', // sentuhan emas lembut (LEGACY)
          sand: '#F3EBD7', // beige pendamping emas (LEGACY)
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Poppins', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '72rem',
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        card: '0 4px 24px -8px rgb(15 61 58 / 0.10)',
        'card-hover': '0 12px 32px -8px rgb(15 61 58 / 0.18)',
      },
    },
  },
}
