<script setup lang="ts">
import type { EstimatorBreakdown } from '~/types'

defineProps<{
  breakdown: EstimatorBreakdown
  pilgrims: number
  durationDays: number
  departureCityName: string | null
}>()
</script>

<template>
  <aside class="sticky top-24 rounded-card border border-neutral-line bg-white p-6 shadow-card" aria-label="Ringkasan estimasi">
    <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Estimasi Anda</p>
    <div class="mt-3 flex flex-wrap gap-1.5">
      <span class="rounded-full bg-brand-sky/50 px-3 py-1 text-xs font-semibold text-brand-green">{{ pilgrims }} Jamaah</span>
      <span class="rounded-full bg-brand-sky/50 px-3 py-1 text-xs font-semibold text-brand-green">{{ durationDays }} Hari</span>
      <span v-if="departureCityName" class="rounded-full bg-brand-sky/50 px-3 py-1 text-xs font-semibold text-brand-green">{{ departureCityName }}</span>
    </div>

    <dl class="mt-5 space-y-3 border-t border-neutral-line pt-5">
      <template v-if="breakdown.categories.length">
        <div v-for="cat in breakdown.categories" :key="cat.id" class="flex items-start justify-between gap-3 text-sm">
          <dt class="text-neutral-charcoal/70">{{ cat.label }}</dt>
          <dd class="shrink-0 font-semibold text-neutral-charcoal">
            {{ cat.lines.some((l) => l.unavailable) ? 'Harga dikonfirmasi' : cat.amount > 0 ? formatCurrency(cat.amount) : 'Termasuk' }}
          </dd>
        </div>
      </template>
      <p v-else class="text-sm leading-relaxed text-neutral-charcoal/50">
        Rincian biaya akan muncul di sini saat Anda menyusun perjalanan.
      </p>
    </dl>

    <div class="mt-5 border-t border-neutral-line pt-5">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold text-neutral-charcoal">Total Estimasi</p>
        <p class="font-heading text-xl font-semibold" :class="breakdown.hasUnavailable ? 'text-gold' : 'text-2xl text-brand-green'" aria-live="polite">
          <template v-if="breakdown.hasUnavailable">Perlu konfirmasi</template>
          <template v-else-if="breakdown.total > 0">{{ formatCurrency(breakdown.total) }}</template>
          <template v-else>—</template>
        </p>
      </div>
      <p v-if="!breakdown.hasUnavailable && breakdown.total > 0" class="mt-1 text-right text-xs text-neutral-charcoal/60">
        ± {{ formatCurrency(breakdown.perPerson) }} /orang
      </p>
      <p v-if="breakdown.hasUnavailable" class="mt-1 text-right text-xs leading-relaxed text-neutral-charcoal/60">
        Ada komponen yang harganya perlu konfirmasi tim kami.
      </p>
    </div>
  </aside>
</template>
