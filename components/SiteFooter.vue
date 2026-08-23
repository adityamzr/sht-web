<script setup lang="ts">
const site = useSiteConfig()
const waUrl = whatsappLink()

const navGroups = [
  {
    title: 'Layanan',
    links: [
      { label: 'Visa Umroh', to: '/services' },
      { label: 'Penerbangan', to: '/flights' },
      { label: 'Hotel', to: '/hotels' },
      { label: 'Transportasi', to: '/transportation' },
    ],
  },
  {
    title: 'Sudut Haramain',
    links: [
      { label: 'Panduan Umroh', to: '/guides' },
      { label: 'Estimator Biaya', to: '/estimator' },
      { label: 'Konsultasi WhatsApp', href: waUrl },
    ],
  },
]
</script>

<template>
  <footer class="bg-sht-olive-dark text-white">
    <Container>
      <div class="grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="md:col-span-2 lg:col-span-2">
          <div class="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" class="h-10 w-10" />
            <span class="leading-tight">
              <span class="block font-heading text-lg font-semibold">Sudut Haramain</span>
              <span class="block text-[10px] font-medium uppercase tracking-[0.24em] text-sht-gold">Tour</span>
            </span>
          </div>
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Sudut Haramain membantu Anda menyiapkan Umroh Mandiri dengan lebih terarah melalui layanan fleksibel,
            estimasi perjalanan, dan panduan yang dibutuhkan.
          </p>
          <p class="mt-6 text-xs text-white/50">{{ site.address }}</p>
        </div>

        <!-- Nav -->
        <div v-for="group in navGroups" :key="group.title">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-sht-gold">{{ group.title }}</h3>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in group.links" :key="link.label">
              <NuxtLink v-if="link.to" :to="link.to" class="text-sm text-white/70 transition-colors hover:text-white">
                {{ link.label }}
              </NuxtLink>
              <a v-else :href="link.href" target="_blank" rel="noopener noreferrer" class="text-sm text-white/70 transition-colors hover:text-white">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} {{ site.brandName }}. All rights reserved.</p>
        <p>Estimasi bukan harga final — ketersediaan dikonfirmasi tim kami.</p>
      </div>
    </Container>
  </footer>
</template>
