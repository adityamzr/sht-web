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
      title: 'Sudut Haramain Tour — Umroh Mandiri & Land Arrangement',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content:
            'Jalani Umroh mandiri tanpa repot sendiri. Sudut Haramain Tour membantu menyiapkan hotel, transportasi, visa, muthawwif, handling, dan kebutuhan perjalanan lainnya.',
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

      // Base URL backend SHT (sht-admin). Development: http://localhost:3001.
      // Production: set NUXT_PUBLIC_API_BASE_URL di environment Vercel.
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
    },
  },

  typescript: {
    strict: true,
    typeCheck: true, // diaktifkan M0 — baseline typecheck bersih
  },
})
