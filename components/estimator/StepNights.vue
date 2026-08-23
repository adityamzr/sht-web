<script setup lang="ts">
defineProps<{
  nightsRemaining: number
  maxNights: number
}>()

const store = useEstimatorStore()
</script>

<template>
  <StepShell
    question="Bagaimana Anda ingin membagi waktu di Tanah Suci?"
    :hint="`Perjalanan ${store.durationDays} hari memiliki ${maxNights} malam untuk dibagi antara Makkah dan Madinah.`"
  >
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-4 rounded-card border border-neutral-line bg-white p-5 shadow-card sm:p-6">
        <div>
          <p class="font-heading text-lg font-semibold text-neutral-charcoal">Makkah</p>
          <p class="text-xs text-neutral-charcoal/60">Baitullah &amp; Masjidil Haram</p>
        </div>
        <CounterControl
          :model-value="store.makkahNights"
          :min="1"
          :max="Math.max(1, maxNights - 1)"
          suffix="malam"
          aria-label="malam di Makkah"
          @update:model-value="store.setMakkahNights($event)"
        />
      </div>

      <div class="flex items-center justify-between gap-4 rounded-card border border-neutral-line bg-white p-5 shadow-card sm:p-6">
        <div>
          <p class="font-heading text-lg font-semibold text-neutral-charcoal">Madinah</p>
          <p class="text-xs text-neutral-charcoal/60">Masjid Nabawi &amp; Raudhah</p>
        </div>
        <CounterControl
          :model-value="store.madinahNights"
          :min="1"
          :max="Math.max(1, maxNights - 1)"
          suffix="malam"
          aria-label="malam di Madinah"
          @update:model-value="store.setMadinahNights($event)"
        />
      </div>
    </div>

    <p
      class="mt-5 rounded-card px-4 py-3 text-sm font-medium"
      :class="
        nightsRemaining === 0
          ? 'bg-brand-green/10 text-brand-green'
          : 'border border-gold-soft bg-gold-sand/50 text-neutral-charcoal/80'
      "
      role="status"
      aria-live="polite"
    >
      <template v-if="nightsRemaining === 0">
        Pas — seluruh {{ maxNights }} malam sudah terbagi: {{ store.makkahNights }} malam di Makkah, {{ store.madinahNights }} malam di Madinah.
      </template>
      <template v-else-if="nightsRemaining > 0">
        Masih ada {{ nightsRemaining }} malam yang perlu dibagi.
      </template>
      <template v-else>
        Pilihan melebihi {{ Math.abs(nightsRemaining) }} malam dari durasi perjalanan — silakan kurangi.
      </template>
    </p>
  </StepShell>
</template>
