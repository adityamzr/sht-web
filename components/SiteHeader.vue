<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const isScrolled = ref(false)
const isHome = computed(() => route.path === '/')

function updateScrollState() {
  isScrolled.value = window.scrollY > 24
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})

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
  <header
    class="z-50 mx-auto w-[calc(100%-1.5rem)] max-w-[1152px] overflow-hidden rounded-2xl border backdrop-blur-md transition-[background-color,box-shadow,border-color,border-radius] duration-300 lg:rounded-full"
    :class="[
      isHome ? 'fixed left-1/2 top-4 -translate-x-1/2' : 'sticky top-4',
      isScrolled ? 'border-sht-olive/10 bg-white/95 shadow-lg shadow-sht-olive/10' : 'border-sht-olive/10 bg-white/90',
    ]"
  >
    <Container>
      <div class="flex h-14 items-center justify-between sm:h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5" aria-label="Sudut Haramain Tour — Beranda">
          <img src="/favicon.svg" alt="" class="h-9 w-9" />
          <span class="leading-tight">
            <span class="block font-heading text-base font-semibold text-sht-olive-dark sm:text-lg">Sudut Haramain</span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.24em] text-sht-gold">Tour</span>
          </span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium text-sht-charcoal/70 transition-colors hover:text-sht-olive-dark"
            :class="{ 'text-sht-olive-dark': route.path.startsWith(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <AppButton :href="waUrl" variant="ghost" size="sm" external class="text-sht-olive-dark hover:bg-sht-olive/5 hover:text-sht-olive-dark"> WhatsApp </AppButton>
          <AppButton to="/estimator" variant="gold" size="sm"> Hitung Estimasi </AppButton>
        </div>

        <!-- Mobile hamburger -->
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full text-sht-olive-dark hover:bg-sht-olive/5 lg:hidden"
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

    <!-- Mobile menu: soft height/opacity transition, tanpa scroll-jacking -->
    <Transition
      enter-active-class="transition-[max-height,opacity] duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-96 opacity-100"
      leave-active-class="transition-[max-height,opacity] duration-250 ease-in"
      leave-from-class="max-h-96 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isOpen" id="mobile-menu" class="max-h-96 border-t border-sht-olive/10 bg-white/95 lg:hidden">
      <Container>
        <nav class="flex flex-col gap-1 py-4" aria-label="Navigasi seluler">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-xl px-4 py-3 text-base font-medium text-sht-charcoal/80 hover:bg-sht-olive/5 hover:text-sht-olive-dark"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="mt-3 flex flex-col gap-2 px-1 pb-2">
            <AppButton to="/estimator" variant="gold" block> Hitung Estimasi Umroh </AppButton>
            <AppButton :href="waUrl" variant="whatsapp" block external> Konsultasi via WhatsApp </AppButton>
          </div>
        </nav>
      </Container>
      </div>
    </Transition>
  </header>
</template>
