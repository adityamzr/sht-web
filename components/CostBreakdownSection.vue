<script setup lang="ts">
type Season = 'lowSeason' | 'highSeason'

type SimulationCosts = {
  flight: number
  makkahHotel: number
  madinahHotel: number
  transportation: number
  visa: number
  supportingServices: number
}

const simulation = {
  lowSeason: {
    label: 'Low Season',
    explanation: 'Periode perjalanan dengan permintaan relatif lebih rendah.',
    costs: {
      flight: 28_000_000,
      makkahHotel: 12_500_000,
      madinahHotel: 5_400_000,
      transportation: 4_800_000,
      visa: 12_000_000,
      supportingServices: 4_000_000,
    },
  },
  highSeason: {
    label: 'High Season',
    explanation: 'Periode dengan permintaan lebih tinggi seperti masa liburan atau periode ramai tertentu.',
    costs: {
      flight: 36_000_000,
      makkahHotel: 18_000_000,
      madinahHotel: 7_200_000,
      transportation: 5_200_000,
      visa: 12_800_000,
      supportingServices: 4_500_000,
    },
  },
} satisfies Record<Season, { label: string; explanation: string; costs: SimulationCosts }>

const activeSeason = ref<Season>('lowSeason')
const currentSimulation = computed(() => simulation[activeSeason.value])
const total = computed(() => Object.values(currentSimulation.value.costs).reduce((sum, amount) => sum + amount, 0))
const perJamaah = computed(() => total.value / 4)

const costRows = computed(() => [
  { number: '01', label: 'Penerbangan', amount: currentSimulation.value.costs.flight },
  { number: '02', label: 'Hotel Makkah', amount: currentSimulation.value.costs.makkahHotel },
  { number: '03', label: 'Hotel Madinah', amount: currentSimulation.value.costs.madinahHotel },
  { number: '04', label: 'Transportasi', amount: currentSimulation.value.costs.transportation },
  { number: '05', label: 'Visa', amount: currentSimulation.value.costs.visa },
  { number: '06', label: 'Layanan Pendukung', amount: currentSimulation.value.costs.supportingServices },
])

function formatIdr(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}
</script>

<template>
  <section class="bg-sht-off-white py-16 sm:py-20 lg:py-24" aria-labelledby="cost-heading">
    <Container>
      <div class="mx-auto max-w-3xl text-center">
        <p class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
          <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
          GAMBARAN BIAYA
          <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
        </p>
        <h2 id="cost-heading" class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-4xl">
          Kenali Komponen Biaya Umroh Mandiri.
        </h2>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sht-charcoal/75">
          Setiap pilihan perjalanan memengaruhi biaya. Lihat bagaimana komponennya terbentuk dalam satu simulasi.
        </p>
      </div>

      <div class="mx-auto mt-12 max-w-4xl rounded-3xl border border-sht-stone bg-white p-5 shadow-[0_12px_40px_-24px_rgba(45,53,31,0.3)] sm:p-8 lg:p-10">
        <div class="flex flex-col gap-6 border-b border-sht-stone pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">SIMULASI PERJALANAN</p>
            <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-sht-charcoal/75">
              <span>4 Jamaah</span>
              <span class="text-sht-stone" aria-hidden="true">·</span>
              <span>9 Hari</span>
              <span class="text-sht-stone" aria-hidden="true">·</span>
              <span>Jakarta</span>
            </div>
            <div class="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-sht-charcoal/60">
              <span>5 malam Makkah</span>
              <span>3 malam Madinah</span>
            </div>
          </div>

          <div class="inline-flex self-start rounded-full bg-sht-off-white p-1 sm:self-auto" aria-label="Pilih periode simulasi">
            <button
              v-for="(season, key) in simulation"
              :key="key"
              type="button"
              class="min-h-[40px] rounded-full px-4 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold sm:px-5"
              :class="activeSeason === key ? 'bg-sht-olive text-sht-off-white shadow-sm' : 'text-sht-charcoal/60 hover:text-sht-olive-dark'"
              :aria-pressed="activeSeason === key"
              @click="activeSeason = key"
            >
              {{ season.label }}
            </button>
          </div>
        </div>

        <p class="mt-5 text-sm text-sht-charcoal/60" aria-live="polite">
          {{ currentSimulation.explanation }}
        </p>

        <div class="mt-6">
          <div class="mb-3 hidden grid-cols-[1fr_auto] px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sht-sage sm:grid">
            <span>Komponen perjalanan</span>
            <span>Perkiraan biaya</span>
          </div>
          <TransitionGroup name="cost-row" tag="div" class="divide-y divide-sht-stone/80">
            <div v-for="row in costRows" :key="`${activeSeason}-${row.number}`" class="grid grid-cols-[1fr_auto] items-center gap-4 py-4 first:pt-2">
              <div class="flex min-w-0 items-center gap-3">
                <span class="text-xs font-semibold tracking-[0.12em] text-sht-sage">{{ row.number }}</span>
                <span class="truncate text-sm font-medium text-sht-charcoal sm:text-base">{{ row.label }}</span>
              </div>
              <span class="text-right text-sm font-semibold tabular-nums text-sht-olive-dark sm:text-base">{{ formatIdr(row.amount) }}</span>
            </div>
          </TransitionGroup>
        </div>

        <div class="mt-4 border-t-2 border-sht-olive/15 pt-6">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">Estimasi Total</p>
              <Transition name="amount" mode="out-in">
                <p :key="total" class="mt-2 font-heading text-2xl font-semibold tabular-nums text-sht-olive-dark sm:text-4xl">{{ formatIdr(total) }}</p>
              </Transition>
            </div>
            <div class="text-right">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-sht-sage">Per Jamaah</p>
              <Transition name="amount" mode="out-in">
                <p :key="perJamaah" class="mt-2 text-base font-semibold tabular-nums text-sht-olive-dark sm:text-xl">± {{ formatIdr(perJamaah) }}</p>
              </Transition>
            </div>
          </div>
        </div>

        <p class="mt-6 border-t border-sht-stone/70 pt-5 text-xs leading-relaxed text-sht-charcoal/60">
          Simulasi ini digunakan sebagai gambaran biaya, bukan harga penawaran. Estimasi aktual dapat berubah mengikuti tanggal keberangkatan, ketersediaan, pilihan hotel dan penerbangan, kurs, jumlah jamaah, serta layanan yang dipilih.
        </p>
      </div>

      <div class="mx-auto mt-8 text-center">
        <p class="text-sm text-sht-charcoal/70">Ingin menghitung sesuai rencana Anda?</p>
        <NuxtLink
          to="/estimator"
          class="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sht-olive px-7 py-3.5 text-base font-semibold text-sht-off-white shadow-card transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
        >
          Hitung Estimasi Saya
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" /></svg>
        </NuxtLink>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.cost-row-move,
.cost-row-enter-active,
.cost-row-leave-active,
.amount-enter-active,
.amount-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.cost-row-enter-from,
.cost-row-leave-to,
.amount-enter-from,
.amount-leave-to {
  opacity: 0;
  transform: translateY(3px);
}

@media (prefers-reduced-motion: reduce) {
  .cost-row-move,
  .cost-row-enter-active,
  .cost-row-leave-active,
  .amount-enter-active,
  .amount-leave-active {
    transition: none;
  }
}
</style>
