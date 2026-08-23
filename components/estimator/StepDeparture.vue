<script setup lang="ts">
import type { DepartureCityOption } from '~/types'

defineProps<{
  cities: DepartureCityOption[]
}>()

const store = useEstimatorStore()
</script>

<template>
  <StepShell
    question="Dari mana Anda akan berangkat?"
    hint="Pilih kota yang paling nyaman untuk Anda dan keluarga."
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <button
        v-for="city in cities"
        :key="city.id"
        type="button"
        role="radio"
        :aria-checked="store.departureCity === city.id"
        class="relative rounded-card border bg-white p-6 text-left transition-all"
        :class="
          store.departureCity === city.id
            ? 'border-brand-green bg-brand-green/5 shadow-card'
            : 'border-neutral-line hover:border-brand-teal hover:shadow-card'
        "
        @click="store.selectDepartureCity(city.id)"
      >
        <span
          v-if="store.departureCity === city.id"
          class="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white"
          aria-hidden="true"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
        </span>
        <span class="font-heading text-lg font-semibold text-neutral-charcoal">{{ city.name }}</span>
        <span class="mt-2 block text-sm leading-relaxed text-neutral-charcoal/70">{{ city.note }}</span>
        <span
          v-if="city.feePerPax !== null && city.feePerPax > 0"
          class="mt-3 inline-block rounded-full bg-gold-sand px-3 py-1 text-xs font-semibold text-neutral-charcoal"
        >
          + {{ formatCurrency(city.feePerPax) }}/orang
        </span>
      </button>
    </div>
  </StepShell>
</template>
