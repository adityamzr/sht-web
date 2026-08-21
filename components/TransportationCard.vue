<script setup lang="ts">
import type { Transportation } from '~/types'

defineProps<{ transport: Transportation }>()

const fallback = '/images/transport-van.jpg'
</script>

<template>
  <article class="group overflow-hidden rounded-card border border-neutral-line bg-white shadow-card transition-shadow hover:shadow-card-hover">
    <div class="relative aspect-[16/9] overflow-hidden bg-neutral-warm">
      <img
        :src="transport.image"
        :alt="`Armada ${transport.name}`"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="($event.target as HTMLImageElement).src = fallback"
      />
    </div>
    <div class="p-5">
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-heading text-lg font-semibold text-neutral-charcoal">{{ transport.name }}</h3>
        <span class="inline-flex items-center gap-1 rounded-full bg-brand-sky/50 px-2.5 py-1 text-xs font-semibold text-brand-green">
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.5c0 1.4-1.3 2.5-3 2.5s-3-1.1-3-2.5m6 0c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5m6 0H9m3-17a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
          </svg>
          {{ transport.capacity }} kursi
        </span>
      </div>
      <p class="mt-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ transport.description }}</p>
      <div class="mt-4 border-t border-neutral-line pt-4">
        <PriceDisplay :amount="transport.price" prefix="Mulai" suffix="/trip" />
      </div>
    </div>
  </article>
</template>
