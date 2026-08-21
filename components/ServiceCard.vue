<script setup lang="ts">
import type { Service } from '~/types'

defineProps<{ service: Service }>()

const unitLabel: Record<Service['pricingUnit'], string> = {
  pax: '/orang',
  group_session: '/sesi',
  package: '/paket',
}
</script>

<template>
  <article class="group rounded-card border border-neutral-line bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
    <div class="flex h-12 w-12 items-center justify-center rounded-card bg-brand-sky/50 text-brand-green">
      <slot name="icon" />
    </div>
    <h3 class="mt-5 font-heading text-xl font-semibold text-neutral-charcoal">{{ service.name }}</h3>
    <p class="mt-2.5 text-sm leading-relaxed text-neutral-charcoal/70">{{ service.description }}</p>
    <p class="mt-4 text-sm">
      <span class="font-heading text-lg font-semibold text-brand-green">{{ formatCurrency(service.price, 'IDR') }}</span>
      <span class="text-xs text-neutral-charcoal/60"> {{ unitLabel[service.pricingUnit] }}</span>
    </p>
  </article>
</template>
