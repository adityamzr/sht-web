<script setup lang="ts">
type AssistanceTab = {
  label: string
  title: string
  description: string
  context: string[]
  cta: string
  to: string
  icon: 'services' | 'land' | 'journey'
}

const tabs: AssistanceTab[] = [
  {
    label: 'À La Carte',
    title: 'Pilih Hanya yang Anda Butuhkan.',
    description: 'Sudah menyiapkan sebagian perjalanan sendiri? Gunakan hanya layanan yang masih Anda perlukan tanpa harus mengambil semuanya.',
    context: ['Visa', 'Hotel', 'Transportasi', 'Muthawwif', 'Handling'],
    cta: 'Pilih Layanan',
    to: '/services',
    icon: 'services',
  },
  {
    label: 'Land Arrangement',
    title: 'Fokus pada Kebutuhan Selama di Saudi.',
    description: 'Jika tiket atau sebagian perjalanan sudah tersedia, Sudut Haramain dapat membantu menyiapkan kebutuhan selama berada di Makkah dan Madinah.',
    context: ['Hotel', 'Transportasi', 'Handling', 'Muthawwif'],
    cta: 'Lihat Land Arrangement',
    to: '/services',
    icon: 'land',
  },
  {
    label: 'Complete Journey',
    title: 'Susun Perjalanan dengan Lebih Lengkap.',
    description: 'Mulai dari rencana perjalanan hingga kebutuhan utama lainnya, susun pilihan Anda terlebih dahulu lalu lanjutkan bersama Sudut Haramain.',
    context: ['Rencana perjalanan', 'Penerbangan', 'Hotel', 'Layanan pendukung'],
    cta: 'Mulai Susun Perjalanan',
    to: '/estimator',
    icon: 'journey',
  },
]

const activeTab = ref(0)
const selectedTab = computed(() => tabs[activeTab.value])
</script>

<template>
  <section class="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="assistance-heading">
    <Container>
      <div class="mx-auto max-w-3xl text-center">
        <p class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
          <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
          BANTUAN SESUAI KEBUTUHAN
          <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
        </p>
        <h2 id="assistance-heading" class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-4xl">
          Pilih Bantuan Sesuai Kebutuhan Anda.
        </h2>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sht-charcoal/75">
          Anda bisa mengatur sendiri sebagian perjalanan, lalu menggunakan bantuan Sudut Haramain hanya pada bagian yang diperlukan.
        </p>
      </div>

      <div class="mx-auto mt-10 max-w-5xl">
        <div class="overflow-x-auto rounded-2xl bg-sht-off-white p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Pilihan tingkat bantuan">
          <div class="flex min-w-max sm:min-w-0 sm:grid sm:grid-cols-3">
            <button
              v-for="(tab, index) in tabs"
              :key="tab.label"
              type="button"
              role="tab"
              :aria-selected="activeTab === index"
              :aria-controls="`assistance-panel-${index}`"
              class="min-h-[48px] flex-1 rounded-xl px-5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold sm:px-4"
              :class="activeTab === index ? 'bg-sht-olive text-sht-off-white shadow-sm' : 'text-sht-charcoal/65 hover:text-sht-olive-dark'"
              @click="activeTab = index"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <Transition name="assistance-panel" mode="out-in">
          <div
            :key="selectedTab.label"
            :id="`assistance-panel-${activeTab}`"
            role="tabpanel"
            :aria-label="selectedTab.label"
            class="mt-5 grid min-h-[300px] items-center gap-8 rounded-3xl border border-sht-stone/80 bg-sht-off-white/55 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">{{ selectedTab.label }}</p>
              <h3 class="mt-3 max-w-xl font-heading text-2xl font-semibold leading-tight text-sht-olive-dark sm:text-3xl">{{ selectedTab.title }}</h3>
              <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">{{ selectedTab.description }}</p>
              <div class="mt-5 flex flex-wrap gap-2" aria-label="Contoh kebutuhan bantuan">
                <span v-for="item in selectedTab.context" :key="item" class="rounded-full border border-sht-sage/35 px-3 py-1.5 text-xs font-medium text-sht-olive-dark">{{ item }}</span>
              </div>
              <NuxtLink
                :to="selectedTab.to"
                class="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-sht-olive px-6 py-3 text-sm font-semibold text-sht-off-white shadow-card transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
              >
                {{ selectedTab.cta }}
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" /></svg>
              </NuxtLink>
            </div>

            <div class="hidden min-h-[220px] items-center justify-center lg:flex" aria-hidden="true">
              <div class="relative flex h-48 w-48 items-center justify-center rounded-full border border-sht-gold/35 bg-sht-gold/10">
                <div class="absolute inset-5 rounded-full border border-sht-sage/30" />
                <svg v-if="selectedTab.icon === 'services'" class="h-16 w-16 text-sht-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path stroke-linecap="round" d="M8 8h8M8 12h5M8 16h3" /></svg>
                <svg v-else-if="selectedTab.icon === 'land'" class="h-16 w-16 text-sht-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 19.5 9 5l6 14.5M9 5l5 3 6-2.5M15 8l-1 11.5M6.5 12h4.8" /></svg>
                <svg v-else class="h-16 w-16 text-sht-olive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="8.5" /><path stroke-linecap="round" d="M12 7v5l3.5 2M4.5 12H2.8M21.2 12h-1.7" /></svg>
              </div>
            </div>
          </div>
        </Transition>

        <p class="mt-5 text-center text-sm text-sht-charcoal/60">Tidak semua bantuan harus digunakan sekaligus. Pilih sesuai rencana dan kebutuhan perjalanan Anda.</p>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.assistance-panel-enter-active,
.assistance-panel-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.assistance-panel-enter-from,
.assistance-panel-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .assistance-panel-enter-active,
  .assistance-panel-leave-active {
    transition: none;
  }
}
</style>
