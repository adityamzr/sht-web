<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    suffix?: string
    disabled?: boolean
    ariaLabel?: string
  }>(),
  { min: 0, max: 99, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

function set(v: number) {
  const next = Math.min(props.max, Math.max(props.min, v))
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="flex items-center gap-4" :aria-label="ariaLabel">
    <button
      type="button"
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-line bg-white text-brand-green transition-colors hover:border-brand-green disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="disabled || modelValue <= min"
      :aria-label="`Kurangi ${ariaLabel ?? ''}`"
      @click="set(modelValue - 1)"
    >
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" d="M5 12h14"/></svg>
    </button>
    <div class="min-w-[4.5rem] text-center">
      <span class="font-heading text-3xl font-semibold text-brand-green">{{ modelValue }}</span>
      <span v-if="suffix" class="ml-1.5 text-sm text-neutral-charcoal/60">{{ suffix }}</span>
    </div>
    <button
      type="button"
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-line bg-white text-brand-green transition-colors hover:border-brand-green disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="disabled || modelValue >= max"
      :aria-label="`Tambah ${ariaLabel ?? ''}`"
      @click="set(modelValue + 1)"
    >
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
    </button>
  </div>
</template>
