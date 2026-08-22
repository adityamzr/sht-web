<script setup lang="ts">
import type { EstimatorBreakdown } from '~/types'

defineProps<{
  breakdown: EstimatorBreakdown
  pilgrims: number
  durationDays: number
  departureCityName: string | null
}>()

const isOpen = ref(false)
</script>

<template>
  <!-- Sticky bottom bar (mobile) -->
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-line bg-white/95 shadow-[0_-4px_24px_-8px_rgb(15_61_58/0.15)] backdrop-blur-md lg:hidden">
    <div class="flex items-center justify-between gap-3 px-5 py-3.5">
      <div>
        <p class="text-[10px] font-semibold uppercase tracking-wider text-neutral-charcoal/50">Estimasi sementara</p>
        <p class="font-heading text-xl font-semibold" :class="breakdown.hasUnavailable ? 'text-gold' : 'text-brand-green'" aria-live="polite">
          <template v-if="breakdown.hasUnavailable">Perlu konfirmasi</template>
          <template v-else-if="breakdown.total > 0">{{ formatCurrency(breakdown.total) }}</template>
          <template v-else>—</template>
        </p>
      </div>
      <AppButton variant="outline" size="sm" :aria-expanded="isOpen" @click="isOpen = true">
        Lihat Ringkasan
      </AppButton>
    </div>
  </div>

  <!-- Bottom sheet ringkasan -->
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-end bg-neutral-charcoal/50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Ringkasan estimasi"
      @click.self="isOpen = false"
    >
      <div class="max-h-[75vh] w-full overflow-y-auto rounded-t-[1.5rem] bg-white p-6 pb-8 shadow-card-hover">
        <div class="mx-auto mb-5 h-1 w-10 rounded-full bg-neutral-line" aria-hidden="true" />
        <SummaryPanel
          :breakdown="breakdown"
          :pilgrims="pilgrims"
          :duration-days="durationDays"
          :departure-city-name="departureCityName"
          class="static border-0 p-0 shadow-none"
        />
        <AppButton variant="outline" block class="mt-6" @click="isOpen = false"> Tutup </AppButton>
      </div>
    </div>
  </Teleport>
</template>
