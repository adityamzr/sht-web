// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  components: [{ path: '~/components', pathPrefix: false }],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'Sudut Haramain Tour — Umroh Private, Sesuai Cara Anda',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content:
            'Sudut Haramain Tour membantu Anda merencanakan Umroh private sesuai cara Anda — visa, penerbangan, hotel, hingga transportasi, dalam satu rencana perjalanan.',
        },
        { property: 'og:site_name', content: 'Sudut Haramain Tour' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/hero-makkah.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@500;600&family=Poppins:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // ⚠️ PRODUCTION CONFIG (M0): nilai di bawah masih PLACEHOLDER.
      // Ganti dengan nilai resmi SHT sebelum deployment (override via env:
      // NUXT_PUBLIC_WHATSAPP_NUMBER dan NUXT_PUBLIC_SITE_URL, lihat .env.example).
      whatsappNumber: '6281234567890', // PLACEHOLDER — ganti dengan nomor resmi SHT
      siteUrl: 'https://sudutharamain.id',
    },
  },

  typescript: {
    strict: true,
    typeCheck: true, // diaktifkan M0 — baseline typecheck bersih
  },
})
