<script setup lang="ts">
import type { Testimonial } from '~/types'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <figure class="flex h-full flex-col rounded-card border border-neutral-line bg-white p-6 shadow-card">
    <svg class="h-7 w-7 text-gold-soft" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 8c0 4.4-2.2 7.3-6 9l-1-1.6c2-1 3.2-2.5 3.5-4.4H3V8h7Zm11 0c0 4.4-2.2 7.3-6 9l-1-1.6c2-1 3.2-2.5 3.5-4.4H14V8h7Z" />
    </svg>
    <blockquote class="mt-4 flex-1 text-sm leading-relaxed text-neutral-charcoal/80">
      “{{ testimonial.quote }}”
    </blockquote>
    <figcaption class="mt-5 border-t border-neutral-line pt-4">
      <p class="text-sm font-semibold text-neutral-charcoal">{{ testimonial.name }}</p>
      <p class="mt-0.5 text-xs text-neutral-charcoal/60">{{ testimonial.origin }} · {{ testimonial.tripType }}</p>
    </figcaption>
  </figure>
</template>
