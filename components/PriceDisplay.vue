<script setup lang="ts">
import type { Currency } from '~/types'

withDefaults(
  defineProps<{
    amount: number
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
      {{ formatCurrency(amount, currency) }}
      <span v-if="suffix" class="font-sans text-xs font-normal" :class="dark ? 'text-white/60' : 'text-neutral-charcoal/60'">
        {{ suffix }}
      </span>
    </p>
  </div>
</template>
