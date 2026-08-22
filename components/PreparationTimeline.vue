<script setup lang="ts">
/**
 * M4A.2 — PERSIAPAN UMROH MANDIRI (customer education timeline).
 * Narasi homepage: Hero ("tidak harus repot sendiri") → bagian ini
 * ("apa yang perlu saya persiapkan?"). BUKAN katalog layanan, BUKAN grid kartu.
 *
 * COPY = PROVISIONAL (belum dikunci) — semua teks berada di array `steps`
 * dan `closing` di bawah agar mudah direvisi Product Owner tanpa mengubah struktur.
 *
 * Animasi = progressive enhancement (IntersectionObserver + CSS, tanpa library):
 * - mobile: rail gold mengisi mengikuti scroll; node aktif saat step masuk viewport.
 * - desktop: reveal sekuensial sekali saat section pertama terlihat.
 * - prefers-reduced-motion: semua animasi mati, konten selalu terlihat penuh.
 * Konten terlihat BY DEFAULT — bila JS gagal, tidak ada yang tersembunyi.
 */

interface PrepStep {
  number: string
  title: string
  description: string
  link?: { label: string; to: string }
}

const steps: PrepStep[] = [
  {
    number: '01',
    title: 'Tentukan Jadwal Perjalanan',
    description: 'Tentukan kapan berangkat, berapa lama perjalanan, serta pembagian waktu di Makkah dan Madinah.',
    link: { label: 'Atur perjalanan', to: '/estimator' },
  },
  {
    number: '02',
    title: 'Siapkan Penerbangan',
    description: 'Pilih penerbangan yang sesuai dengan waktu perjalanan dan kebutuhan Anda atau rombongan.',
    link: { label: 'Lihat penerbangan', to: '/flights' },
  },
  {
    number: '03',
    title: 'Pilih Hotel',
    description: 'Pilih hotel di Makkah dan Madinah berdasarkan lokasi, kebutuhan kamar, kenyamanan, dan anggaran.',
    link: { label: 'Lihat hotel', to: '/hotels' },
  },
  {
    number: '04',
    title: 'Atur Transportasi',
    description: 'Siapkan transportasi untuk perjalanan antar kota, airport transfer, dan kebutuhan perjalanan lokal.',
    link: { label: 'Lihat transportasi', to: '/transportation' },
  },
  {
    number: '05',
    title: 'Lengkapi Kebutuhan Umroh',
    description: 'Lengkapi kebutuhan seperti visa, muthawwif, handling, perlengkapan, dan layanan pendukung lainnya.',
    link: { label: 'Lihat layanan', to: '/services' },
  },
]

const closing = {
  heading: 'Tidak harus mengurus semuanya sendiri.',
  text: 'Anda dapat menyiapkan sebagian kebutuhan sendiri dan meminta Sudut Haramain membantu pada bagian yang Anda perlukan.',
  cta: 'Persiapkan Perjalanan Saya',
  ctaTo: '/estimator',
}

// ─── Scroll/reveal state (mobile-first, halus) ───────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
const stepRefs = ref<(HTMLElement | null)[]>([])
const revealed = ref(false) // desktop: section sudah terlihat (sekali)
const activeStep = ref(0) // jumlah step yang sudah "dilewati" (node → gold)
const progressPct = ref(0) // isi rail gold mobile (0–100)
const railPx = ref(0) // tinggi rail gold dalam pixel (deterministik)
const reducedMotion = ref(false)
const ready = ref(false) // JS aktif — hanya setelah ini transisi "pre-reveal" berlaku

let revealObserver: IntersectionObserver | null = null
let onScrollCleanup: (() => void) | null = null

function setStepRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) stepRefs.value[index] = el
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ready.value = true

  if (reducedMotion.value) {
    // Tanpa animasi: semua terlihat penuh, tidak ada observer/scroll listener.
    revealed.value = true
    activeStep.value = steps.length
    return
  }

  // 1) Reveal desktop: sekali saat section masuk viewport.
  revealObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        revealed.value = true
        revealObserver?.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  if (sectionRef.value) revealObserver.observe(sectionRef.value)

  // 2) Rail gold + aktivasi node (mobile): geometri deterministik — jumlah step
  //    yang top-nya sudah melewati garis aktivasi. Robust untuk lompatan scroll
  //    besar (fling/anchor) sekalipun.
  const activationLine = () => window.innerHeight * 0.62
  let ticking = false
  const trackEl = () => sectionRef.value?.querySelector<HTMLElement>('.md\\:hidden ol')
  const updateProgress = () => {
    ticking = false
    const el = sectionRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const line = activationLine()
    const total = rect.height - line
    const pct = total <= 0 ? 100 : Math.min(100, Math.max(0, ((line - rect.top) / total) * 100))
    progressPct.value = pct
    const track = trackEl()
    if (track) railPx.value = Math.round(((track.clientHeight - 24) * pct) / 100)

    // Aktivasi: hitung step yang top-nya sudah melewati garis aktivasi.
    // Elemen display:none (timeline desktop) dilewati — aktivasi khusus mobile;
    // desktop sengaja statis (hanya reveal sekali + garis isi).
    let passed = 0
    for (const li of stepRefs.value) {
      if (li && li.offsetParent !== null && li.getBoundingClientRect().top < line) passed += 1
    }
    activeStep.value = passed
  }
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(updateProgress)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateProgress()
  onScrollCleanup = () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  onScrollCleanup?.()
})
</script>

<template>
  <section ref="sectionRef" class="bg-sht-off-white py-16 sm:py-20 lg:py-24" aria-labelledby="prep-heading">
    <Container>
      <!-- Header -->
      <div class="max-w-3xl">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
          <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
          PERSIAPAN UMROH MANDIRI
        </p>
        <h2 id="prep-heading" class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-4xl">
          Umroh Mandiri Dimulai dari Beberapa Kebutuhan Utama.
        </h2>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-sht-charcoal/75">
          Anda tidak harus menyiapkan semuanya sekaligus. Kenali dulu komponen perjalanan yang biasanya dibutuhkan,
          lalu tentukan bagian mana yang ingin Anda atur sendiri dan mana yang ingin dibantu Sudut Haramain.
        </p>
      </div>

      <!-- ══ DESKTOP: horizontal timeline (md+) ══ -->
      <div class="relative mt-16 hidden md:block">
        <!-- garis dasar -->
        <div class="absolute left-[8%] right-[8%] top-[19px] h-px bg-sht-stone" aria-hidden="true" />
        <!-- garis isi gold — reveal sekali -->
        <div
          class="absolute left-[8%] right-[8%] top-[19px] h-px origin-left bg-sht-gold"
          :class="ready && !reducedMotion ? 'transition-transform duration-[1200ms] ease-out' : ''"
          :style="revealed ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)' }"
          aria-hidden="true"
        />
        <ol class="grid grid-cols-5 gap-6" aria-label="Lima tahap persiapan Umroh Mandiri">
          <li
            v-for="(step, i) in steps"
            :key="step.number"
            :class="ready && !revealed ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'"
            :style="{
              transition: ready && !reducedMotion ? `opacity 600ms ease-out ${i * 110}ms, transform 600ms ease-out ${i * 110}ms` : 'none',
            }"
          >
            <span
              class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-sht-off-white font-heading text-sm font-semibold"
              :class="activeStep > i ? 'border-sht-gold bg-sht-gold text-sht-olive-dark' : 'border-sht-sage/50 text-sht-olive'"
              aria-hidden="true"
            >
              {{ step.number }}
            </span>
            <h3 class="mt-4 font-heading text-lg font-semibold leading-snug text-sht-olive-dark">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-sht-charcoal/70">{{ step.description }}</p>
            <NuxtLink
              v-if="step.link"
              :to="step.link.to"
              class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sht-olive underline-offset-4 transition-colors hover:text-sht-olive-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
            >
              {{ step.link.label }}
              <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
              </svg>
            </NuxtLink>
          </li>
        </ol>
      </div>

      <!-- ══ MOBILE: vertical journey (di bawah md) ══ -->
      <div class="relative mt-12 md:hidden">
        <ol class="relative" aria-label="Lima tahap persiapan Umroh Mandiri">
          <!-- rail dasar -->
          <div class="absolute bottom-3 left-[19px] top-3 w-px bg-sht-stone" aria-hidden="true" />
          <!-- rail gold — tinggi mengikuti scroll (nonaktif saat reduced-motion) -->
          <div
            v-if="!reducedMotion"
            class="absolute left-[19px] top-3 w-px bg-sht-gold transition-[height] duration-150 ease-out"
            :style="{ height: railPx + 'px' }"
            aria-hidden="true"
          />
          <li v-for="(step, i) in steps" :key="step.number" :ref="(el) => setStepRef(el, i)" class="relative flex gap-5 pb-10 last:pb-0">
            <span
              class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-sht-off-white font-heading text-sm font-semibold transition-colors duration-300"
              :class="activeStep > i ? 'border-sht-gold bg-sht-gold text-sht-olive-dark' : 'border-sht-sage/50 text-sht-olive'"
              aria-hidden="true"
            >
              {{ step.number }}
            </span>
            <div class="min-w-0 pt-1">
              <h3 class="font-heading text-lg font-semibold leading-snug text-sht-olive-dark">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-sht-charcoal/70">{{ step.description }}</p>
              <NuxtLink
                v-if="step.link"
                :to="step.link.to"
                class="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-sht-olive underline-offset-4 hover:text-sht-olive-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
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

      <!-- Closing: lanjutan cerita edukasi (restrained) -->
      <div class="mt-16 border-t border-sht-stone pt-12 text-center">
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
      </div>
    </Container>
  </section>
</template>
