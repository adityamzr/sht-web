<script setup lang="ts">
import type { Testimonial } from '~/types'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <figure class="flex h-full flex-col rounded-2xl border border-sht-stone bg-sht-off-white p-7 shadow-[0_8px_24px_-20px_rgba(45,53,31,0.45)]">
    <svg class="h-7 w-7 text-sht-gold/80" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 8c0 4.4-2.2 7.3-6 9l-1-1.6c2-1 3.2-2.5 3.5-4.4H3V8h7Zm11 0c0 4.4-2.2 7.3-6 9l-1-1.6c2-1 3.2-2.5 3.5-4.4H14V8h7Z" />
    </svg>
    <blockquote class="mt-5 flex-1 text-sm leading-relaxed text-sht-charcoal/80">
      “{{ testimonial.quote }}”
    </blockquote>
    <figcaption class="mt-6 border-t border-sht-stone/80 pt-4">
      <p class="text-sm font-semibold text-sht-olive-dark">{{ testimonial.name }}</p>
      <p class="mt-1 text-xs text-sht-charcoal/55">{{ testimonial.origin }} · {{ testimonial.tripType }}</p>
    </figcaption>
  </figure>
</template>
