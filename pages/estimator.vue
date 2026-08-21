<script setup lang="ts">
useSeoMeta({
  title: 'Estimator Biaya Umroh — Sudut Haramain Tour',
  description:
    'Hitung estimasi biaya Umroh private berdasarkan jumlah jamaah, durasi, hotel, penerbangan, dan kebutuhan lainnya.',
  ogTitle: 'Estimator Biaya Umroh — Sudut Haramain Tour',
  ogDescription: 'Hitung estimasi perjalanan Umroh private Anda — gratis, tanpa komitmen.',
})

const store = useEstimatorStore()
const { draft } = storeToRefs(store)
const waUrl = whatsappLink()

const steps = [
  { num: 1, label: 'Jamaah & Jadwal', active: true },
  { num: 2, label: 'Hotel & Penerbangan', active: false },
  { num: 3, label: 'Transportasi & Layanan', active: false },
  { num: 4, label: 'Review & Estimasi', active: false },
]
</script>

<template>
  <div>
    <section class="bg-sky-gradient py-12 sm:py-16">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Estimator Biaya"
          title="Berapa biaya Umroh Private Anda?"
          subtitle="Jawab beberapa pertanyaan singkat — kami tunjukkan gambaran biayanya. Gratis dan tanpa komitmen."
        />
      </Container>
    </section>

    <section class="py-12 sm:py-16">
      <Container>
        <!-- Step indicator -->
        <ol class="mx-auto flex max-w-2xl items-start justify-between gap-2" aria-label="Tahapan estimator">
          <li v-for="(step, i) in steps" :key="step.num" class="flex flex-1 flex-col items-center gap-2 text-center">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
              :class="step.active ? 'bg-brand-green text-white' : 'bg-neutral-warm text-neutral-charcoal/50'"
              aria-hidden="true"
            >
              {{ step.num }}
            </span>
            <span class="hidden text-xs font-medium sm:block" :class="step.active ? 'text-brand-green' : 'text-neutral-charcoal/50'">
              {{ step.label }}
            </span>
            <span v-if="i < steps.length - 1" class="absolute" aria-hidden="true" />
          </li>
        </ol>

        <!-- Shell form (Phase 1: mock, tanpa kalkulasi) -->
        <div class="mx-auto mt-10 max-w-2xl rounded-card border border-neutral-line bg-white p-6 shadow-card sm:p-8">
          <h2 class="font-heading text-xl font-semibold">Mulai dari yang paling dasar</h2>
          <p class="mt-1.5 text-sm text-neutral-charcoal/60">
            Estimator lengkap sedang kami siapkan untuk Anda. Ini gambaran awalnya:
          </p>

          <div class="mt-6 space-y-5">
            <!-- Jumlah jamaah -->
            <div>
              <label for="pilgrims" class="text-sm font-semibold">Berapa jamaah yang akan berangkat?</label>
              <div class="mt-2 flex items-center gap-4">
                <input
                  id="pilgrims"
                  v-model.number="draft.pilgrims"
                  type="range"
                  min="1"
                  max="20"
                  class="h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-warm accent-brand-green"
                />
                <span class="w-20 rounded-card bg-brand-sky/50 px-3 py-2 text-center font-heading text-lg font-semibold text-brand-green">
                  {{ draft.pilgrims }}
                </span>
              </div>
            </div>

            <!-- Kota keberangkatan -->
            <fieldset>
              <legend class="text-sm font-semibold">Berangkat dari mana?</legend>
              <div class="mt-2 grid grid-cols-2 gap-3">
                <button
                  v-for="city in ['Jakarta', 'Bandung'] as const"
                  :key="city"
                  type="button"
                  class="min-h-[48px] rounded-card border px-4 py-3 text-sm font-semibold transition-colors"
                  :class="
                    draft.departureCity === city
                      ? 'border-brand-green bg-brand-green/5 text-brand-green'
                      : 'border-neutral-line text-neutral-charcoal/70 hover:border-brand-teal'
                  "
                  @click="draft.departureCity = city"
                >
                  {{ city }}
                </button>
              </div>
            </fieldset>

            <!-- Durasi -->
            <div>
              <label for="duration" class="text-sm font-semibold">Berapa hari perjalanan Anda?</label>
              <div class="mt-2 grid grid-cols-3 gap-3">
                <button
                  v-for="days in [9, 12, 16]"
                  :key="days"
                  type="button"
                  class="min-h-[48px] rounded-card border px-4 py-3 text-sm font-semibold transition-colors"
                  :class="
                    draft.durationDays === days
                      ? 'border-brand-green bg-brand-green/5 text-brand-green'
                      : 'border-neutral-line text-neutral-charcoal/70 hover:border-brand-teal'
                  "
                  @click="draft.durationDays = days"
                >
                  {{ days }} hari
                </button>
              </div>
            </div>
          </div>

          <!-- Coming soon notice -->
          <div class="mt-8 rounded-card border border-gold-soft bg-gold-sand/50 p-5">
            <p class="text-sm leading-relaxed text-neutral-charcoal/80">
              <span class="font-semibold text-brand-green">Segera hadir:</span> kalkulasi otomatis dengan
              pilihan hotel Makkah &amp; Madinah, penerbangan, transportasi, hingga layanan tambahan —
              lengkap dengan rincian per komponen.
            </p>
          </div>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row">
            <AppButton :href="waUrl" variant="whatsapp" external block class="sm:flex-1">
              Hitung Manual via WhatsApp
            </AppButton>
          </div>
          <p class="mt-4 text-center text-xs text-neutral-charcoal/50">
            Untuk saat ini, konsultan kami siap menghitungkan estimasi Anda secara personal.
          </p>
        </div>
      </Container>
    </section>
  </div>
</template>
