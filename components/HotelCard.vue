<script setup lang="ts">
import type { Hotel } from '~/types'

defineProps<{ hotel: Hotel }>()

const fallback = '/images/hotel-swissotel.jpg'
</script>

<template>
  <article class="group overflow-hidden rounded-card border border-neutral-line bg-white shadow-card transition-all duration-300 hover:shadow-card-hover">
    <div class="relative aspect-[16/10] overflow-hidden bg-neutral-warm">
      <img
        :src="hotel.coverImage"
        :alt="`${hotel.name} — ${hotel.city}`"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        @error="($event.target as HTMLImageElement).src = fallback"
      />
      <span class="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-green shadow-card">
        {{ hotel.city }}
      </span>
    </div>
    <div class="p-5">
      <div class="flex items-center gap-1" :aria-label="`Bintang ${hotel.starRating}`">
        <svg v-for="n in hotel.starRating" :key="n" class="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5 12.6 7l6 .6-4.5 4 1.3 5.9L10 14.4l-5.4 3.1L5.9 11.6l-4.5-4 6-.6L10 1.5Z" />
        </svg>
      </div>
      <h3 class="mt-2.5 font-heading text-lg font-semibold text-neutral-charcoal">{{ hotel.name }}</h3>
      <p class="mt-1 flex items-center gap-1.5 text-xs text-brand-teal">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.1-7.5 11.25-7.5 11.25S4.5 17.6 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        {{ hotel.distance }}
      </p>
      <p class="mt-2.5 line-clamp-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ hotel.description }}</p>
      <div class="mt-4 flex items-center justify-between border-t border-neutral-line pt-4">
        <PriceDisplay :amount="hotel.startingPrice" prefix="Mulai" suffix="/kamar/malam" />
      </div>
    </div>
  </article>
</template>
