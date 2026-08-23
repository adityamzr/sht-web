<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}>()
</script>

<template>
  <div :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p
      v-if="eyebrow"
      class="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
      :class="dark ? 'text-gold-soft' : 'text-sht-gold'"
    >
      <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
        {{ eyebrow }}
      <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
    </p>
    <h2
      class="font-heading text-3xl sm:text-4xl font-semibold text-balance"
      :class="dark ? 'text-white' : 'text-neutral-charcoal'"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base leading-relaxed" :class="dark ? 'text-white/70' : 'text-neutral-charcoal/70'">
      {{ subtitle }}
    </p>
  </div>
</template>
