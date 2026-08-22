<script setup lang="ts">
import type { Currency } from '~/types'

withDefaults(
  defineProps<{
    /** null = harga belum tersedia → tampilkan "Harga dikonfirmasi" (bukan Rp0/angka sumber). */
    amount: number | null
    currency?: Currency
    prefix?: string
    suffix?: string
    dark?: boolean
    size?: 'md' | 'lg'
  }>(),
  { currency: 'IDR', size: 'md' },
)
</script>

<template>
  <div>
    <p v-if="prefix" class="text-xs" :class="dark ? 'text-white/60' : 'text-neutral-charcoal/60'">
      {{ prefix }}
    </p>
    <p
      class="font-heading font-semibold"
      :class="[dark ? 'text-white' : 'text-brand-green', size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl']"
    >
      <template v-if="amount !== null">{{ formatCurrency(amount, currency) }}</template>
      <template v-else>Harga dikonfirmasi</template>
      <span v-if="suffix && amount !== null" class="font-sans text-xs font-normal" :class="dark ? 'text-white/60' : 'text-neutral-charcoal/60'">
        {{ suffix }}
      </span>
    </p>
  </div>
</template>
