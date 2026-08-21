<script setup lang="ts">
import type { Flight } from '~/types'

defineProps<{ flight: Flight }>()
</script>

<template>
  <article class="rounded-card border border-neutral-line bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-gold">{{ flight.airline }}</p>
        <p class="mt-1.5 font-heading text-lg font-semibold text-neutral-charcoal">{{ flight.route }}</p>
      </div>
      <span
        class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
        :class="flight.type === 'Direct' ? 'bg-brand-green/10 text-brand-green' : 'bg-gold-sand text-neutral-charcoal'"
      >
        {{ flight.type === 'Direct' ? 'Direct' : 'Transit' }}
      </span>
    </div>

    <div class="mt-4 flex items-center gap-3 text-sm text-neutral-charcoal/70">
      <span>{{ flight.departure }}</span>
      <svg class="h-4 w-4 shrink-0 text-brand-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12h19m0 0-5-5m5 5-5 5" />
      </svg>
      <span>{{ flight.arrival }}</span>
    </div>

    <p class="mt-2 text-xs text-neutral-charcoal/60">{{ flight.baggage }}</p>

    <div class="mt-4 border-t border-neutral-line pt-4">
      <PriceDisplay :amount="flight.sellingPrice" prefix="Harga" suffix="/orang" />
    </div>
  </article>
</template>
