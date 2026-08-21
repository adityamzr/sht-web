<script setup lang="ts">
defineProps<{
  isFirst: boolean
  canProceed: boolean
  message: string | null
}>()

const emit = defineEmits<{ back: []; next: [] }>()
</script>

<template>
  <div class="mt-9">
    <p
      v-if="message && !canProceed"
      class="mb-4 flex items-start gap-2 rounded-card border border-gold-soft bg-gold-sand/50 px-4 py-3 text-sm text-neutral-charcoal/80"
      role="status"
      aria-live="polite"
    >
      <svg class="mt-0.5 h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
      {{ message }}
    </p>
    <div class="flex items-center justify-between gap-3">
      <button
        v-if="!isFirst"
        type="button"
        class="inline-flex min-h-[48px] items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-charcoal/70 transition-colors hover:bg-brand-green/5 hover:text-brand-green"
        @click="emit('back')"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0 6-6m-6 6 6 6"/></svg>
        Kembali
      </button>
      <span v-else aria-hidden="true" />
      <AppButton
        variant="primary"
        size="lg"
        :class="{ 'pointer-events-none opacity-50': !canProceed }"
        :aria-disabled="!canProceed"
        @click="canProceed && emit('next')"
      >
        Lanjut
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6"/></svg>
      </AppButton>
    </div>
  </div>
</template>
