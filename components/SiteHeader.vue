<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)

const navItems = [
  { label: 'Layanan', to: '/services' },
  { label: 'Hotel', to: '/hotels' },
  { label: 'Penerbangan', to: '/flights' },
  { label: 'Transportasi', to: '/transportation' },
  { label: 'Panduan', to: '/guides' },
]

const waUrl = whatsappLink()

// Tutup menu mobile setiap pindah halaman
watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-neutral-line/60 bg-white/90 backdrop-blur-md">
    <Container>
      <div class="flex h-16 items-center justify-between sm:h-[72px]">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5" aria-label="Sudut Haramain Tour — Beranda">
          <img src="/favicon.svg" alt="" class="h-9 w-9" />
          <span class="leading-tight">
            <span class="block font-heading text-base font-semibold text-brand-green sm:text-lg">Sudut Haramain</span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.24em] text-gold">Tour</span>
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium text-neutral-charcoal/70 transition-colors hover:text-brand-green"
            :class="{ 'text-brand-green': route.path.startsWith(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <AppButton :href="waUrl" variant="ghost" size="sm" external> WhatsApp </AppButton>
          <AppButton to="/estimator" variant="primary" size="sm"> Hitung Estimasi </AppButton>
        </div>

        <!-- Mobile hamburger -->
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-green hover:bg-brand-green/5 lg:hidden"
          :aria-expanded="isOpen"
          aria-controls="mobile-menu"
          aria-label="Buka menu navigasi"
          @click="isOpen = !isOpen"
        >
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </Container>

    <!-- Mobile menu -->
    <div v-show="isOpen" id="mobile-menu" class="border-t border-neutral-line/60 bg-white lg:hidden">
      <Container>
        <nav class="flex flex-col gap-1 py-4" aria-label="Navigasi seluler">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-card px-4 py-3 text-base font-medium text-neutral-charcoal/80 hover:bg-brand-green/5 hover:text-brand-green"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="mt-3 flex flex-col gap-2 px-1 pb-2">
            <AppButton to="/estimator" variant="primary" block> Hitung Estimasi Umroh </AppButton>
            <AppButton :href="waUrl" variant="whatsapp" block external> Konsultasi via WhatsApp </AppButton>
          </div>
        </nav>
      </Container>
    </div>
  </header>
</template>
