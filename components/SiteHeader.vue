<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)
const isServicesOpen = ref(false)
const isScrolled = ref(false)
let serviceCloseTimer: ReturnType<typeof setTimeout> | null = null

function openServicesMenu() {
  if (serviceCloseTimer) clearTimeout(serviceCloseTimer)
  isServicesOpen.value = true
}

function scheduleServicesClose() {
  if (serviceCloseTimer) clearTimeout(serviceCloseTimer)
  serviceCloseTimer = setTimeout(() => {
    isServicesOpen.value = false
  }, 160)
}
const isHome = computed(() => route.path === '/')

function updateScrollState() {
  isScrolled.value = window.scrollY > 24
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState))

const navItems = [
  { label: 'Panduan', to: '/guides', icon: 'guide' },
  // Dedicated routes belum tersedia; gunakan destination valid terdekat sampai milestone konten berikutnya.
  { label: 'Artikel', to: '/guides', icon: 'article' },
  { label: 'Cerita Jamaah', to: '/', icon: 'stories' },
  { label: 'FAQ', to: '/guides', icon: 'faq' },
]
const serviceMenu = [
  { label: 'Visa Umroh', subtitle: 'Pengurusan visa untuk perjalanan Umroh.', to: '/services/visa', icon: 'visa' },
  { label: 'Badal Umroh', subtitle: 'Pelaksanaan Badal Umroh sesuai amanah keluarga.', to: '/services', icon: 'badal' },
  { label: 'Hotel', subtitle: 'Akomodasi Makkah dan Madinah.', to: '/hotels', icon: 'hotel' },
  { label: 'Penerbangan', subtitle: 'Pilihan penerbangan untuk perjalanan Umroh.', to: '/flights', icon: 'flight' },
  { label: 'Transportasi', subtitle: 'Transfer bandara dan perjalanan selama di Saudi.', to: '/transportation', icon: 'transport' },
  { label: 'Muthawwif', subtitle: 'Pendamping ibadah selama Umroh.', to: '/services', icon: 'guide' },
  { label: 'Handling', subtitle: 'Bantuan kedatangan, bagasi, dan kebutuhan bandara.', to: '/services', icon: 'handling' },
]
const waUrl = whatsappLink()

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
    isServicesOpen.value = false
  },
)
</script>

<template>
  <header
    class="z-50 mx-auto w-[calc(100%-1.5rem)] max-w-[1152px] rounded-2xl border backdrop-blur-md transition-[background-color,box-shadow,border-color,border-radius] duration-300 lg:rounded-full"
    :class="[
      isHome ? 'fixed left-1/2 top-4 -translate-x-1/2' : 'sticky top-4',
      isScrolled ? 'border-sht-olive/10 bg-white/95 shadow-lg shadow-sht-olive/10' : 'border-sht-olive/10 bg-white/80',
    ]"
  >
    <Container>
      <div class="flex h-14 items-center justify-between sm:h-16">
        <NuxtLink to="/" class="flex items-center gap-2.5" aria-label="Sudut Haramain Tour — Beranda">
          <img src="/assets/images/sht_horizontal_black_logo.png" alt="" class="h-12 w-auto" />
        </NuxtLink>

        <nav class="hidden items-center gap-5 lg:flex" aria-label="Navigasi utama">
          <div class="relative" @mouseenter="openServicesMenu" @mouseleave="scheduleServicesClose">
            <button type="button" class="inline-flex items-center gap-1.5 text-sm font-medium text-sht-charcoal/70 transition-colors hover:text-sht-olive-dark" :aria-expanded="isServicesOpen" aria-controls="services-menu" @click="isServicesOpen = !isServicesOpen" @keydown.esc="isServicesOpen = false">
              Layanan
              <svg class="h-4 w-4 transition-transform duration-200" :class="isServicesOpen ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" /></svg>
            </button>
            <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
              <div v-if="isServicesOpen" id="services-menu" class="absolute left-1/2 top-full z-20 mt-2 w-[560px] -translate-x-1/2 rounded-2xl border border-sht-stone bg-white p-4 shadow-xl shadow-sht-olive/10 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3" role="menu" aria-label="Layanan Sudut Haramain">
                <div class="grid grid-cols-2 gap-1">
                  <NuxtLink v-for="item in serviceMenu" :key="item.label" :to="item.to" role="menuitem" class="group flex items-center gap-3 rounded-xl p-3 text-sm text-sht-charcoal/75 transition-colors hover:bg-sht-off-white hover:text-sht-olive-dark">
                    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sht-gold/15 text-sht-olive" aria-hidden="true">
                      <svg v-if="item.icon === 'visa'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path stroke-linecap="round" d="M14 3.5V7h3M8.5 12h5"/></svg>
                      <svg v-else-if="item.icon === 'badal'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M20 8.5c0 5-8 10-8 10s-8-5-8-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z"/></svg>
                      <svg v-else-if="item.icon === 'hotel'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m-12 0h16m-16 0v-4h4m8 0v-6h4"/></svg>
                      <svg v-else-if="item.icon === 'flight'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 13.5-7.5-2.5 1.5-1.5L11 10l4.5-4.5a2.1 2.1 0 0 1 3 3L14 13l.5 6.5L13 21l-2.5-7.5Z"/></svg>
                      <svg v-else-if="item.icon === 'transport'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14M6.5 17l1.3-5.2A2 2 0 0 1 9.74 10.3h4.52a2 2 0 0 1 1.94 1.5L17.5 17m-10 0a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0"/></svg>
                      <svg v-else-if="item.icon === 'guide'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path stroke-linecap="round" d="M12 7v5l3.5 2"/></svg>
                      <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M6 8h12l1 12H5L6 8Z"/><path stroke-linecap="round" d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
                    </span>
                    <span class="min-w-0"><span class="block font-semibold text-sht-olive-dark">{{ item.label }}</span><span class="mt-0.5 block text-xs leading-snug text-sht-charcoal/55">{{ item.subtitle }}</span></span>
                  </NuxtLink>
                </div>
                <NuxtLink to="/services" role="menuitem" class="mt-3 block border-t border-sht-stone pt-3 text-center text-sm font-semibold text-sht-olive hover:text-sht-olive-dark">Lihat semua layanan →</NuxtLink>
              </div>
            </Transition>
          </div>
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="text-sm font-medium text-sht-charcoal/70 transition-colors hover:text-sht-olive-dark" :class="{ 'text-sht-olive-dark': route.path.startsWith(item.to) }">{{ item.label }}</NuxtLink>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <AppButton :href="waUrl" variant="ghost" size="sm" external class="text-sht-olive-dark hover:bg-sht-olive/5 hover:text-sht-olive-dark">WhatsApp</AppButton>
          <AppButton to="/estimator" variant="gold" size="sm">Hitung Estimasi</AppButton>
        </div>

        <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-sht-olive-dark hover:bg-sht-olive/5 lg:hidden" :aria-expanded="isOpen" aria-controls="mobile-menu" aria-label="Buka menu navigasi" @click="isOpen = !isOpen">
          <svg v-if="!isOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </Container>

    <Transition enter-active-class="transition-[max-height,opacity] duration-300 ease-out" enter-from-class="max-h-0 opacity-0" enter-to-class="max-h-[600px] opacity-100" leave-active-class="transition-[max-height,opacity] duration-250 ease-in" leave-from-class="max-h-[600px] opacity-100" leave-to-class="max-h-0 opacity-0">
      <div v-show="isOpen" id="mobile-menu" class="min-h-[600px] border-t border-sht-olive/10 bg-white/95 lg:hidden rounded-xl">
        <Container>
          <nav class="py-4" aria-label="Navigasi seluler">
            <p class="px-4 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">Layanan</p>
            <div class="grid grid-cols-2 gap-1">
              <NuxtLink v-for="item in serviceMenu" :key="item.label" :to="item.to" class="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-sht-charcoal/80 hover:bg-sht-off-white hover:text-sht-olive-dark">
                <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sht-gold/15 text-sht-olive" aria-hidden="true">
                  <svg v-if="item.icon === 'visa'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path stroke-linecap="round" d="M14 3.5V7h3M8.5 12h5"/></svg>
                  <svg v-else-if="item.icon === 'badal'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M20 8.5c0 5-8 10-8 10s-8-5-8-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z"/></svg>
                  <svg v-else-if="item.icon === 'hotel'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m-12 0h16m-16 0v-4h4m8 0v-6h4"/></svg>
                  <svg v-else-if="item.icon === 'flight'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 13.5-7.5-2.5 1.5-1.5L11 10l4.5-4.5a2.1 2.1 0 0 1 3 3L14 13l.5 6.5L13 21l-2.5-7.5Z"/></svg>
                  <svg v-else-if="item.icon === 'transport'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14M6.5 17l1.3-5.2A2 2 0 0 1 9.74 10.3h4.52a2 2 0 0 1 1.94 1.5L17.5 17m-10 0a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0"/></svg>
                  <svg v-else-if="item.icon === 'guide'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path stroke-linecap="round" d="M12 7v5l3.5 2"/></svg>
                  <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M6 8h12l1 12H5L6 8Z"/><path stroke-linecap="round" d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
                </span>
                {{ item.label }}
              </NuxtLink>
            </div>
            <div class="mt-2 space-y-1 border-t border-sht-stone/70 pt-2">
              <p class="mt-2 px-4 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">Jelajahi</p>
              <NuxtLink v-for="item in navItems" :key="item.label" :to="item.to" class="flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sht-charcoal/80 hover:bg-sht-off-white hover:text-sht-olive-dark">
                <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sht-gold/15 text-sht-olive" aria-hidden="true">
                  <svg v-if="item.icon === 'guide'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4.5v16H7a2.5 2.5 0 0 0-2.5 2.5v-16Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4.5v16H17a2.5 2.5 0 0 1 2.5 2.5v-16Z"/></svg>
                  <svg v-else-if="item.icon === 'article'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="M6.5 3.5h8l3 3v14h-11a1.5 1.5 0 0 1-1.5-1.5V5a1.5 1.5 0 0 1 1.5-1.5Z"/><path stroke-linecap="round" d="M9 11h6M9 14h6M9 17h4M14.5 3.5V7h3"/></svg>
                  <svg v-else-if="item.icon === 'stories'" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="2.5"/><circle cx="16.5" cy="9" r="2"/><path stroke-linecap="round" d="M4.5 18a4.5 4.5 0 0 1 9 0M14 17a3.5 3.5 0 0 1 6 1"/></svg>
                  <svg v-else class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path stroke-linecap="round" d="M9.8 9.5a2.3 2.3 0 1 1 3.8 1.7c-1 .8-1.6 1.2-1.6 2.5M12 17h.01"/></svg>
                </span>
                {{ item.label }}
              </NuxtLink>
            </div>
            <div class="mt-3 flex flex-col gap-2 px-1 pb-2"><AppButton to="/estimator" variant="gold" block><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path stroke-linecap="round" d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h8"/></svg>Hitung Estimasi Umroh</AppButton><AppButton :href="waUrl" variant="ghost" block external class="border border-sht-olive/20 text-sht-olive-dark hover:bg-sht-olive/5 hover:text-sht-olive-dark"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5.5h14A2.5 2.5 0 0 1 21.5 8v7A2.5 2.5 0 0 1 19 17.5H11L7 21v-3.5H5A2.5 2.5 0 0 1 2.5 15V8A2.5 2.5 0 0 1 5 5.5Z"/></svg>Konsultasi via WhatsApp</AppButton></div>
          </nav>
        </Container>
      </div>
    </Transition>
  </header>
</template>
