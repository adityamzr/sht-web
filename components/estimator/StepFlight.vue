<script setup lang="ts">
import type { Flight } from '~/types'

defineProps<{
  flights: Flight[]
  pilgrims: number
}>()

const store = useEstimatorStore()
</script>

<template>
  <StepShell
    question="Pilih penerbangan Anda"
    hint="Rute internasional Jakarta (CGK) → Jeddah (JED). Harga per orang sudah termasuk bagasi."
  >
    <div class="space-y-4" role="radiogroup" aria-label="Pilihan penerbangan">
      <button
        v-for="flight in flights"
        :key="flight.id"
        type="button"
        role="radio"
        :aria-checked="store.flightId === flight.id"
        class="relative w-full rounded-card border bg-white p-5 text-left transition-all sm:p-6"
        :class="
          store.flightId === flight.id
            ? 'border-brand-green bg-brand-green/5 shadow-card'
            : 'border-neutral-line hover:border-brand-teal hover:shadow-card'
        "
        @click="store.selectFlight(flight.id)"
      >
        <span
          v-if="store.flightId === flight.id"
          class="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white"
          aria-hidden="true"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
        </span>
        <span class="flex flex-wrap items-center gap-2">
          <span class="font-heading text-lg font-semibold text-neutral-charcoal">{{ flight.airline }}</span>
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            :class="flight.type === 'Direct' ? 'bg-brand-green/10 text-brand-green' : 'bg-gold-sand text-neutral-charcoal'"
          >
            {{ flight.type === 'Direct' ? 'Direct' : 'Transit' }}
          </span>
        </span>
        <span class="mt-2 block text-sm text-neutral-charcoal/70">{{ flight.route }} · {{ flight.baggage }}</span>
        <span class="mt-3 block font-heading text-xl font-semibold text-brand-green">
          {{ formatPrice(flight.sellingPrice) }}
          <span class="font-sans text-xs font-normal text-neutral-charcoal/60">/orang · {{ pilgrims }} jamaah</span>
        </span>
      </button>
    </div>
  </StepShell>
</template>
