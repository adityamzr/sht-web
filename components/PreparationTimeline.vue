<script setup lang="ts">
/**
 * M4A.2 — PERSIAPAN UMROH MANDIRI (customer education timeline).
 * Narasi homepage: Hero ("tidak harus repot sendiri") → bagian ini
 * ("apa yang perlu saya persiapkan?"). BUKAN katalog layanan, BUKAN grid kartu.
 *
 * Copy M4A.2.1 telah dikunci. Layout M4A.2.2 memakai progressive enhancement:
 * split sticky storytelling di desktop dan vertical storytelling di mobile.
 * Konten terlihat BY DEFAULT — bila JS gagal, tidak ada yang tersembunyi.
 */

interface PrepStep {
  number: string
  title: string
  description: string
  link?: { label: string; to: string }
  icon: 'plan' | 'document' | 'travel' | 'guide' | 'support'
}

const steps: PrepStep[] = [
  {
    number: '01',
    icon: 'plan',
    title: 'Susun Rencana',
    description: 'Tentukan waktu keberangkatan, durasi, serta pembagian hari di Makkah dan Madinah.',
    link: { label: 'Mulai susun perjalanan', to: '/estimator' },
  },
  {
    number: '02',
    icon: 'document',
    title: 'Siapkan Dokumen',
    description: 'Pastikan paspor, visa, dan dokumen pendukung lainnya sudah siap sebelum keberangkatan.',
    link: { label: 'Lihat layanan visa', to: '/services/visa' },
  },
  {
    number: '03',
    icon: 'travel',
    title: 'Atur Perjalanan dan Akomodasi',
    description: 'Pilih penerbangan, hotel, transportasi antar kota, airport transfer, dan kebutuhan perjalanan darat lainnya.',
    link: { label: 'Lihat penerbangan', to: '/flights' },
  },
  {
    number: '04',
    icon: 'guide',
    title: 'Pelajari Manasik Umroh',
    description: 'Pahami tata cara Umroh, rukun, wajib, larangan ihram, serta hal penting sebelum menjalankan ibadah.',
    link: { label: 'Lihat panduan manasik', to: '/guides' },
  },
  {
    number: '05',
    icon: 'support',
    title: 'Lengkapi Kebutuhan Pendukung',
    description: 'Siapkan muthawwif, handling, perlengkapan, ziarah, dan kebutuhan tambahan lainnya sesuai rencana Anda.',
    link: { label: 'Lihat layanan', to: '/services' },
  },
]

const closing = {
  heading: 'Tidak harus mengurus semuanya sendiri.',
  text: 'Anda dapat menyiapkan sebagian kebutuhan sendiri dan meminta Sudut Haramain membantu pada bagian yang Anda perlukan.',
  cta: 'Persiapkan Perjalanan Saya',
  ctaTo: '/estimator',
}

const sectionRef = ref<HTMLElement | null>(null)
const desktopStepRefs = ref<(HTMLElement | null)[]>([])
const mobileStepRefs = ref<(HTMLElement | null)[]>([])
const activeStep = ref(0)
const reducedMotion = ref(false)
const ready = ref(false)

let stepObserver: IntersectionObserver | null = null

function setStepRef(target: 'desktop' | 'mobile', el: unknown, index: number) {
  if (!(el instanceof HTMLElement)) return
  if (target === 'desktop') desktopStepRefs.value[index] = el
  else mobileStepRefs.value[index] = el
}

const progressHeight = computed(() => `${(activeStep.value / (steps.length - 1)) * 100}%`)

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ready.value = true

  if (reducedMotion.value) return

  // The observer follows normal page scroll. The focal band sits below the
  // header, so one step becomes prominent without trapping the page in a
  // nested scroller or requiring scroll-jacking.
  stepObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))
      const current = visible[0]?.target.getAttribute('data-step-index')
      if (current !== null && current !== undefined) activeStep.value = Number(current)
    },
    { rootMargin: '-28% 0px -48% 0px', threshold: [0, 0.2, 0.6, 1] },
  )

  ;[...desktopStepRefs.value, ...mobileStepRefs.value].forEach((el) => {
    if (el) stepObserver?.observe(el)
  })
})

onBeforeUnmount(() => {
  stepObserver?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="bg-sht-off-white py-16 sm:py-20 lg:py-24" aria-labelledby="prep-heading">
    <Container>
      <!-- Desktop: anchored context + page-scrolling timeline -->
      <div class="hidden md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-start md:gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div class="md:sticky md:top-24">
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
            PERSIAPAN UMROH MANDIRI
          </p>
          <h2 id="prep-heading" class="mt-4 max-w-xl font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance lg:text-4xl">
            Apa Saja yang Perlu Disiapkan untuk Umroh Mandiri?
          </h2>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-sht-charcoal/75">
            Tidak perlu memahami semuanya sekaligus. Kenali dulu kebutuhan perjalanan, dokumen, manasik, dan layanan pendukung agar persiapan Umroh lebih terarah.
          </p>
        </div>

        <div class="relative min-w-0 md:pt-2">
          <div class="absolute bottom-10 left-5 top-10 w-px bg-sht-stone" aria-hidden="true" />
          <div
            class="absolute left-5 top-10 w-px origin-top bg-sht-gold transition-[height] duration-500 ease-out"
            :class="ready && !reducedMotion ? '' : 'transition-none'"
            :style="{ height: progressHeight }"
            aria-hidden="true"
          />
          <ol class="relative space-y-12" aria-label="Lima tahap persiapan Umroh Mandiri">
            <li
              v-for="(step, i) in steps"
              :key="step.number"
              :ref="(el) => setStepRef('desktop', el, i)"
              :data-step-index="i"
              :aria-current="activeStep === i ? 'step' : undefined"
              class="relative flex min-h-[236px] gap-6"
            >
              <span
                class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-sht-off-white font-heading text-sm font-semibold transition-colors duration-500"
                :class="activeStep === i || i < activeStep ? 'border-sht-gold bg-sht-gold text-sht-olive-dark' : 'border-sht-sage/50 text-sht-olive'"
                aria-hidden="true"
              >
                {{ step.number }}
              </span>
              <div
                class="min-w-0 flex-1 rounded-2xl border px-6 py-5 transition-[background-color,border-color,opacity,transform] duration-500 lg:px-7 lg:py-6"
                :class="activeStep === i ? 'translate-x-0 border-sht-gold/70 bg-white opacity-100' : i < activeStep ? 'translate-x-0 border-sht-stone bg-sht-stone/30 opacity-80' : 'translate-x-1 border-transparent bg-sht-stone/20 opacity-60'"
              >
                <span
                  class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sht-gold/15 text-sht-olive transition-colors duration-500"
                  :class="activeStep === i ? 'bg-sht-gold/25 text-sht-olive-dark' : 'text-sht-sage'"
                  aria-hidden="true"
                >
                  <svg v-if="step.icon === 'plan'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="5" width="16" height="15" rx="2"/><path stroke-linecap="round" d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h5"/></svg>
                  <svg v-else-if="step.icon === 'document'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path stroke-linecap="round" d="M14 3.5V7h3M8.5 11h5M8.5 14h5M8.5 17h3"/></svg>
                  <svg v-else-if="step.icon === 'travel'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m3.5 16 5.2-1.1 2.1-6.8a1.2 1.2 0 0 1 2.3.1l.7 5.4 4.3-.9a2 2 0 0 1 .8 3.9l-13.8 2.8a2 2 0 0 1-1.6-3.4Z"/><path stroke-linecap="round" d="m6 19.2 1.2 1.3M17.2 16.8l1.1 1.1"/></svg>
                  <svg v-else-if="step.icon === 'guide'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4.5v16H7a2.5 2.5 0 0 0-2.5 2.5v-16Z"/><path stroke-linejoin="round" d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4.5v16H17a2.5 2.5 0 0 1 2.5 2.5v-16Z"/></svg>
                  <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="m7 7 5-3 5 3v7l-5 3-5-3V7Z"/><path stroke-linecap="round" d="m7 7 5 3 5-3M12 10v7M5 18.5l7 3 7-3"/></svg>
                </span>
                <!-- <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">Langkah {{ step.number }}</p> -->
                <h3 class="mt-2 font-heading text-xl font-semibold leading-snug text-sht-olive-dark lg:text-2xl">{{ step.title }}</h3>
                <p class="mt-3 max-w-xl text-sm leading-relaxed text-sht-charcoal/70 lg:text-base">{{ step.description }}</p>
                <NuxtLink
                  v-if="step.link"
                  :to="step.link.to"
                  class="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-sht-olive underline-offset-4 transition-colors hover:text-sht-olive-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
                >
                  {{ step.link.label }}
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
                  </svg>
                </NuxtLink>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <!-- Mobile: single-column page-scrolling storytelling -->
      <div class="md:hidden">
        <div>
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
            PERSIAPAN UMROH MANDIRI
          </p>
          <h2 id="prep-heading-mobile" class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-4xl">
            Apa Saja yang Perlu Disiapkan untuk Umroh Mandiri?
          </h2>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-sht-charcoal/75">
            Tidak perlu memahami semuanya sekaligus. Kenali dulu kebutuhan perjalanan, dokumen, manasik, dan layanan pendukung agar persiapan Umroh lebih terarah.
          </p>
        </div>

        <div class="relative mt-14">
          <div class="absolute bottom-10 left-5 top-10 w-px bg-sht-stone" aria-hidden="true" />
          <div
            class="absolute left-5 top-10 w-px origin-top bg-sht-gold transition-[height] duration-500 ease-out"
            :class="ready && !reducedMotion ? '' : 'transition-none'"
            :style="{ height: progressHeight }"
            aria-hidden="true"
          />
          <ol class="relative space-y-8" aria-label="Lima tahap persiapan Umroh Mandiri">
            <li
              v-for="(step, i) in steps"
              :key="step.number"
              :ref="(el) => setStepRef('mobile', el, i)"
              :data-step-index="i"
              :aria-current="activeStep === i ? 'step' : undefined"
              class="relative flex min-h-[196px] gap-5"
            >
              <span
                class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-sht-off-white font-heading text-sm font-semibold transition-colors duration-500"
                :class="activeStep === i || i < activeStep ? 'border-sht-gold bg-sht-gold text-sht-olive-dark' : 'border-sht-sage/50 text-sht-olive'"
                aria-hidden="true"
              >
                {{ step.number }}
              </span>
              <div
                class="min-w-0 flex-1 rounded-2xl border px-5 py-5 transition-[background-color,border-color,opacity,transform] duration-500"
                :class="activeStep === i ? 'translate-x-0 border-sht-gold/70 bg-white opacity-100' : i < activeStep ? 'translate-x-0 border-sht-stone bg-sht-stone/30 opacity-80' : 'translate-x-1 border-transparent bg-sht-stone/20 opacity-60'"
              >
                <span
                  class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sht-gold/15 text-sht-olive transition-colors duration-500"
                  :class="activeStep === i ? 'bg-sht-gold/25 text-sht-olive-dark' : 'text-sht-sage'"
                  aria-hidden="true"
                >
                  <svg v-if="step.icon === 'plan'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="5" width="16" height="15" rx="2"/><path stroke-linecap="round" d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h5"/></svg>
                  <svg v-else-if="step.icon === 'document'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path stroke-linecap="round" d="M14 3.5V7h3M8.5 11h5M8.5 14h5M8.5 17h3"/></svg>
                  <svg v-else-if="step.icon === 'travel'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m3.5 16 5.2-1.1 2.1-6.8a1.2 1.2 0 0 1 2.3.1l.7 5.4 4.3-.9a2 2 0 0 1 .8 3.9l-13.8 2.8a2 2 0 0 1-1.6-3.4Z"/><path stroke-linecap="round" d="m6 19.2 1.2 1.3M17.2 16.8l1.1 1.1"/></svg>
                  <svg v-else-if="step.icon === 'guide'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="M4.5 5.5A2.5 2.5 0 0 1 7 3h4.5v16H7a2.5 2.5 0 0 0-2.5 2.5v-16Z"/><path stroke-linejoin="round" d="M19.5 5.5A2.5 2.5 0 0 0 17 3h-4.5v16H17a2.5 2.5 0 0 1 2.5 2.5v-16Z"/></svg>
                  <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="m7 7 5-3 5 3v7l-5 3-5-3V7Z"/><path stroke-linecap="round" d="m7 7 5 3 5-3M12 10v7M5 18.5l7 3 7-3"/></svg>
                </span>
                <!-- <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">Langkah {{ step.number }}</p> -->
                <h3 class="mt-2 font-heading text-xl font-semibold leading-snug text-sht-olive-dark">{{ step.title }}</h3>
                <p class="mt-3 text-sm leading-relaxed text-sht-charcoal/70">{{ step.description }}</p>
                <NuxtLink
                  v-if="step.link"
                  :to="step.link.to"
                  class="mt-4 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-sht-olive underline-offset-4 hover:text-sht-olive-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
                >
                  {{ step.link.label }}
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
                  </svg>
                </NuxtLink>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <!-- Existing closing callout preserved -->
      <!-- <div class="mt-16 border-t border-sht-stone pt-12 text-center">
        <h3 class="font-heading text-2xl font-semibold text-sht-olive-dark text-balance sm:text-3xl">
          {{ closing.heading }}
        </h3>
        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/75">
          {{ closing.text }}
        </p>
        <div class="mt-8 flex justify-center">
          <NuxtLink
            :to="closing.ctaTo"
            class="inline-flex min-h-[48px] items-center justify-center rounded-full bg-sht-olive px-8 py-3.5 text-base font-semibold text-sht-off-white shadow-card transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          >
            {{ closing.cta }}
          </NuxtLink>
        </div>
      </div> -->
    </Container>
  </section>
</template>
