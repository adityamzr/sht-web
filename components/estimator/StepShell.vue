<script setup lang="ts">
defineProps<{
  question: string
  hint?: string
}>()
</script>

<template>
  <section>
    <h2 class="font-heading text-2xl font-semibold text-neutral-charcoal text-balance sm:text-[1.7rem]">
      {{ question }}
    </h2>
    <p v-if="hint" class="mt-2.5 text-sm leading-relaxed text-neutral-charcoal/70 sm:text-base">
      {{ hint }}
    </p>
    <div class="mt-7">
      <slot />
    </div>
  </section>
</template>
