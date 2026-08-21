<script setup lang="ts">
import type { Faq } from '~/types'

defineProps<{ faq: Faq }>()

const isOpen = ref(false)
</script>

<template>
  <div class="rounded-card border border-neutral-line bg-white">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="text-sm font-semibold text-neutral-charcoal sm:text-base">{{ faq.question }}</span>
      <svg
        class="h-5 w-5 shrink-0 text-brand-green transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <div v-show="isOpen" class="px-5 pb-5 sm:px-6">
      <p class="text-sm leading-relaxed text-neutral-charcoal/70">{{ faq.answer }}</p>
    </div>
  </div>
</template>
