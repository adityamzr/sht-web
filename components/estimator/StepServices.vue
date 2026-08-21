<script setup lang="ts">
import type { Service } from '~/types'

defineProps<{
  services: Service[]
  pilgrims: number
}>()

const store = useEstimatorStore()

const unitText: Record<Service['pricingUnit'], string> = {
  pax: '/orang',
  group_session: '/sesi',
  package: '/paket',
}

function selectionOf(serviceId: string) {
  return store.services.find((s) => s.serviceId === serviceId)
}

function hintOf(service: Service): string {
  return service.pricingUnit === 'pax'
    ? `${formatCurrency(service.price)} × ${store.pilgrims} jamaah`
    : `${formatCurrency(service.price)} ${unitText[service.pricingUnit]}`
}
</script>

<template>
  <StepShell
    question="Ada yang ingin ditambahkan?"
    hint="Semuanya opsional — pilih yang membuat perjalanan Anda semakin tenang."
  >
    <div class="space-y-4">
      <div
        v-for="service in services"
        :key="service.id"
        class="rounded-card border p-5 transition-colors sm:p-6"
        :class="selectionOf(service.id) ? 'border-brand-green bg-brand-green/5' : 'border-neutral-line bg-white'"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="font-heading text-base font-semibold text-neutral-charcoal">{{ service.name }}</p>
            <p class="mt-1 text-sm leading-relaxed text-neutral-charcoal/70">{{ service.description }}</p>
            <p class="mt-2 text-sm font-semibold text-brand-green">{{ hintOf(service) }}</p>
          </div>
          <AppButton
            :variant="selectionOf(service.id) ? 'outline' : 'primary'"
            size="sm"
            class="shrink-0"
            :aria-pressed="Boolean(selectionOf(service.id))"
            @click="store.toggleService(service.id)"
          >
            {{ selectionOf(service.id) ? 'Hapus' : 'Tambah' }}
          </AppButton>
        </div>

        <!-- Quantity untuk unit non-pax -->
        <div
          v-if="selectionOf(service.id) && service.pricingUnit !== 'pax'"
          class="mt-4 flex items-center justify-between border-t border-brand-green/15 pt-4"
        >
          <p class="text-sm text-neutral-charcoal/70">
            Jumlah {{ service.pricingUnit === 'group_session' ? 'sesi' : 'paket' }}
          </p>
          <CounterControl
            :model-value="selectionOf(service.id)!.quantity"
            :min="1"
            :max="10"
            :aria-label="`jumlah ${service.name}`"
            @update:model-value="store.setServiceQuantity(service.id, $event)"
          />
        </div>
      </div>

      <p class="text-sm text-neutral-charcoal/50">
        Tidak ada yang cocok? Lewati saja — selalu bisa ditambahkan nanti lewat konsultan.
      </p>
    </div>
  </StepShell>
</template>
