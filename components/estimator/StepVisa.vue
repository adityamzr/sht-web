<script setup lang="ts">
import type { VisaProduct } from '~/types'

defineProps<{
  visaProduct: VisaProduct
  pilgrims: number
}>()

const store = useEstimatorStore()

const options = [
  {
    id: 'owned' as const,
    title: 'Saya sudah punya visa',
    description: 'Visa tidak perlu diurus lagi — komponen biaya visa tidak masuk estimasi Anda.',
    priceLabel: 'Rp 0',
  },
  {
    id: 'needed' as const,
    title: 'Saya membutuhkan visa',
    description: 'Kami urus sampai terbit — termasuk asuransi perjalanan selama di Saudi.',
    priceLabel: null, // diisi dari visaProduct
  },
]
</script>

<template>
  <StepShell
    question="Apakah Anda sudah memiliki visa?"
    hint="Visa wajib untuk berangkat — tapi biayanya hanya dihitung jika Anda belum memilikinya."
  >
    <div class="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Status visa">
      <button
        v-for="option in options"
        :key="option.id"
        type="button"
        role="radio"
        :aria-checked="store.visa === option.id"
        class="relative rounded-card border bg-white p-6 text-left transition-all"
        :class="
          store.visa === option.id
            ? 'border-brand-green bg-brand-green/5 shadow-card'
            : 'border-neutral-line hover:border-brand-teal hover:shadow-card'
        "
        @click="store.setVisa(option.id)"
      >
        <span
          v-if="store.visa === option.id"
          class="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white"
          aria-hidden="true"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
        </span>
        <span class="block font-heading text-lg font-semibold text-neutral-charcoal">{{ option.title }}</span>
        <span class="mt-2 block text-sm leading-relaxed text-neutral-charcoal/70">{{ option.description }}</span>
        <span class="mt-3 block font-heading text-base font-semibold text-brand-green">
          {{ option.priceLabel ?? `${formatCurrency(visaProduct.pricePerPax)}/orang · ${pilgrims} jamaah` }}
        </span>
      </button>
    </div>
  </StepShell>
</template>
