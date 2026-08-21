<script setup lang="ts">
import type { EstimatorBreakdown, Flight, Hotel } from '~/types'

const props = defineProps<{
  breakdown: EstimatorBreakdown
  flight: Flight | undefined
  makkahHotel: Hotel | undefined
  madinahHotel: Hotel | undefined
  departureCityName: string | null
  editStepFor: Record<string, number>
}>()

const emit = defineEmits<{ edit: [step: number]; reset: [] }>()

const store = useEstimatorStore()
const waUrl = whatsappLink()

const journey = computed(() => [
  { city: store.departureCity ?? 'Jakarta', sub: 'Keberangkatan', highlight: false },
  { city: 'Jeddah', sub: 'Tiba di Saudi', highlight: false },
  { city: 'Makkah', sub: `${store.makkahNights} malam`, highlight: true },
  { city: 'Madinah', sub: `${store.madinahNights} malam`, highlight: true },
  { city: 'Jeddah', sub: 'Perjalanan pulang', highlight: false },
  { city: store.departureCity ?? 'Jakarta', sub: 'Tiba kembali', highlight: false },
])

function roomsSummary(hotel: Hotel | undefined, rooms: { roomTypeId: string; quantity: number }[]): string {
  if (!hotel) return ''
  return rooms
    .filter((r) => r.quantity > 0)
    .map((r) => {
      const rt = hotel.roomTypes.find((t) => t.id === r.roomTypeId)
      return `${rt?.name} × ${r.quantity}`
    })
    .join(' · ')
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <!-- Header "wow" -->
    <div class="text-center">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-gold-sand px-4 py-1.5 text-xs font-semibold text-neutral-charcoal">
        <svg class="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.4-6.3-4.6-6.3 4.6L8 13.6l-6-4.4h7.6L12 2z"/></svg>
        Estimasi Anda Siap
      </span>
      <h2 class="mt-4 font-heading text-3xl font-semibold text-neutral-charcoal text-balance sm:text-4xl">
        Perjalanan Umroh Anda
      </h2>
      <p class="mt-3 text-base text-neutral-charcoal/70">
        {{ store.pilgrims }} Jamaah · {{ store.durationDays }} Hari
        <template v-if="departureCityName"> · {{ departureCityName }} → Jeddah</template>
      </p>
    </div>

    <!-- Journey visual -->
    <div class="mt-10 rounded-card border border-neutral-line bg-white p-6 shadow-card sm:p-8">
      <ol class="relative space-y-0" aria-label="Alur perjalanan">
        <li v-for="(stop, i) in journey" :key="i" class="relative flex gap-4 pb-6 last:pb-0">
          <span
            v-if="i < journey.length - 1"
            class="absolute left-[9px] top-6 h-[calc(100%-12px)] w-0.5 bg-brand-sky"
            aria-hidden="true"
          />
          <span
            class="relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
            :class="stop.highlight ? 'border-gold bg-gold-sand' : 'border-brand-teal bg-white'"
            aria-hidden="true"
          >
            <span v-if="stop.highlight" class="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          <div>
            <p class="font-heading text-base font-semibold" :class="stop.highlight ? 'text-brand-green' : 'text-neutral-charcoal'">
              {{ stop.city }}
            </p>
            <p class="text-xs text-neutral-charcoal/60">{{ stop.sub }}</p>
          </div>
        </li>
      </ol>
    </div>

    <!-- Rincian biaya per kategori -->
    <div class="mt-6 space-y-4">
      <section
        v-for="cat in breakdown.categories"
        :key="cat.id"
        :aria-label="cat.label"
        class="rounded-card border border-neutral-line bg-white p-5 shadow-card sm:p-6"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="font-heading text-base font-semibold text-neutral-charcoal">{{ cat.label }}</h3>
            <p v-if="cat.id === 'hotelMakkah' && makkahHotel" class="mt-0.5 text-xs text-neutral-charcoal/60">
              {{ roomsSummary(makkahHotel, store.makkahRooms) }} · {{ store.makkahNights }} malam
            </p>
            <p v-else-if="cat.id === 'hotelMadinah' && madinahHotel" class="mt-0.5 text-xs text-neutral-charcoal/60">
              {{ roomsSummary(madinahHotel, store.madinahRooms) }} · {{ store.madinahNights }} malam
            </p>
          </div>
          <div class="flex shrink-0 items-center gap-3">
            <p class="font-heading text-lg font-semibold text-brand-green">
              {{ cat.amount > 0 ? formatCurrency(cat.amount) : 'Termasuk' }}
            </p>
            <button
              v-if="editStepFor[cat.id]"
              type="button"
              class="min-h-[36px] rounded-full px-3 text-xs font-semibold text-brand-teal hover:bg-brand-green/5 hover:text-brand-green"
              @click="emit('edit', editStepFor[cat.id])"
            >
              Ubah
            </button>
          </div>
        </div>
        <ul class="mt-3 space-y-1.5 border-t border-neutral-line pt-3">
          <li v-for="(line, li) in cat.lines" :key="li" class="flex items-baseline justify-between gap-3 text-sm">
            <span class="text-neutral-charcoal/70">
              {{ line.label }}
              <span v-if="line.detail" class="block text-xs text-neutral-charcoal/50">{{ line.detail }}</span>
            </span>
            <span class="shrink-0 text-neutral-charcoal/80">{{ formatCurrency(line.amount) }}</span>
          </li>
        </ul>
      </section>
    </div>

    <!-- Total -->
    <div class="mt-6 overflow-hidden rounded-card bg-kabah-gradient p-6 text-white shadow-card-hover sm:p-8">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft">Total Estimasi</p>
          <p class="mt-2 font-heading text-3xl font-semibold sm:text-4xl" aria-live="polite">
            {{ formatCurrency(breakdown.total) }}
          </p>
          <p class="mt-1.5 text-sm text-white/70">± {{ formatCurrency(breakdown.perPerson) }} /orang</p>
        </div>
      </div>
      <p class="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/60">
        Estimasi ini bukan harga final. Ketersediaan dan harga akan dikonfirmasi oleh tim kami
        setelah Anda berkonsultasi.
      </p>
    </div>

    <!-- Final CTA -->
    <div class="mt-10 text-center">
      <h3 class="font-heading text-2xl font-semibold text-neutral-charcoal">Siap mewujudkan perjalanan ini?</h3>
      <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-charcoal/70">
        Konsultasikan estimasi perjalanan Anda dengan tim Sudut Haramain Tour. Kami akan membantu
        mengecek ketersediaan dan menyesuaikan perjalanan Anda.
      </p>
      <div class="mt-6 flex flex-col items-center gap-3">
        <AppButton :href="waUrl" variant="whatsapp" size="lg" external block class="sm:w-auto">
          Konsultasikan via WhatsApp
        </AppButton>
        <button
          type="button"
          class="min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold text-neutral-charcoal/60 transition-colors hover:text-brand-green"
          @click="emit('reset')"
        >
          Hitung ulang dari awal
        </button>
      </div>
    </div>
  </div>
</template>
