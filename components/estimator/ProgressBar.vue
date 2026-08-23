<script setup lang="ts">
defineProps<{
  current: number
  total: number
  title: string
}>()
</script>

<template>
  <div class="mb-8">
    <div class="flex items-baseline justify-between gap-3">
      <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
        Langkah {{ current }} dari {{ total }}
      </p>
      <p class="text-xs font-medium text-neutral-charcoal/60">{{ title }}</p>
    </div>
    <div class="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-line" role="progressbar" :aria-valuenow="current" :aria-valuemin="1" :aria-valuemax="total">
      <div
        class="h-full rounded-full bg-brand-green transition-all duration-500 ease-out"
        :style="{ width: `${(current / total) * 100}%` }"
      />
    </div>
  </div>
</template>
