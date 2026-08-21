import type { Config } from 'tailwindcss'

/**
 * Design tokens — SUDUT HARAMAIN TOUR UI Guidance (locked).
 * Warna terinspirasi langit Mekkah, Kiswah Ka'bah, emas, dan kesucian putih.
 */
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          sky: '#BFE6F2', // Sky Blue — langit Mekkah, bg hero/section
          'sky-deep': '#7CC7DA', // Deep Sky — pendukung sky, elemen interaktif ringan
          teal: '#3DA7B7', // Teal Blue — aksen sekunder yang tetap tenang
          green: '#0F3D3A', // Deep Green — warna brand utama, tombol utama
        },
        neutral: {
          white: '#FFFFFF',
          soft: '#F8FAFB', // background utama
          warm: '#F1F4F6', // section background
          line: '#E3E7EB', // border, divider
          charcoal: '#1B1F23', // teks utama
        },
        gold: {
          DEFAULT: '#D4AF37', // Emas Ka'bah — aksen premium
          soft: '#EAD8A6', // sentuhan emas lembut
          sand: '#F3EBD7', // beige pendamping emas
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
