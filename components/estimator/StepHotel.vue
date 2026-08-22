<script setup lang="ts">
import type { Hotel } from '~/types'

const props = defineProps<{
  hotels: Hotel[]
  city: 'Makkah' | 'Madinah'
  cityKey: 'makkah' | 'madinah'
  nights: number
}>()

const store = useEstimatorStore()
const selectedId = computed(() =>
  props.cityKey === 'makkah' ? store.makkahHotelId : store.madinahHotelId,
)
const fallback = '/images/hotel-swissotel.jpg'
</script>

<template>
  <StepShell
    :question="`Pilih hotel Anda di ${city}`"
    :hint="`${nights} malam di ${city}. Semua pilihan dekat dengan masjid dan nyaman untuk keluarga.`"
  >
    <div class="grid gap-4 sm:grid-cols-2" role="radiogroup" :aria-label="`Pilihan hotel ${city}`">
      <button
        v-for="hotel in hotels"
        :key="hotel.id"
        type="button"
        role="radio"
        :aria-checked="selectedId === hotel.id"
        class="group relative overflow-hidden rounded-card border bg-white text-left transition-all"
        :class="
          selectedId === hotel.id
            ? 'border-brand-green shadow-card-hover ring-2 ring-brand-green/40'
            : 'border-neutral-line hover:border-brand-teal hover:shadow-card'
        "
        @click="store.selectHotel(cityKey, hotel.id)"
      >
        <span
          v-if="selectedId === hotel.id"
          class="absolute right-3 top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white shadow-card"
          aria-hidden="true"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
        </span>
        <span class="block aspect-[16/9] overflow-hidden bg-neutral-warm">
          <img
            :src="hotel.coverImage"
            :alt="hotel.name"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            @error="($event.target as HTMLImageElement).src = fallback"
          />
        </span>
        <span class="block p-4">
          <span class="flex items-center gap-1" :aria-label="`Bintang ${hotel.starRating}`">
            <svg v-for="n in hotel.starRating" :key="n" class="h-3.5 w-3.5 text-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 1.5 12.6 7l6 .6-4.5 4 1.3 5.9L10 14.4l-5.4 3.1L5.9 11.6l-4.5-4 6-.6L10 1.5Z" />
            </svg>
          </span>
          <span class="mt-1.5 block font-heading text-base font-semibold text-neutral-charcoal">{{ hotel.name }}</span>
          <span class="mt-1 block text-xs text-brand-teal">{{ hotel.distance }}</span>
          <span class="mt-2 line-clamp-2 block text-xs leading-relaxed text-neutral-charcoal/70">{{ hotel.description }}</span>
          <span class="mt-3 block font-heading text-base font-semibold text-brand-green">
            {{ formatPrice(hotel.startingPrice) }}
            <span class="font-sans text-xs font-normal text-neutral-charcoal/60">/kamar/malam</span>
          </span>
        </span>
      </button>
    </div>
  </StepShell>
</template>
