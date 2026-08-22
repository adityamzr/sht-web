<script setup lang="ts">
import type { TransportRouteOption } from '~/types'

defineProps<{
  routeOptions: TransportRouteOption[]
  pilgrims: number
}>()

const store = useEstimatorStore()

function entry(routeId: string) {
  return store.transport.find((t) => t.routeId === routeId)
}
</script>

<template>
  <StepShell
    question="Bagaimana Anda ingin berpindah?"
    hint="Untuk setiap rute di bawah, beri tahu kami apakah Anda membutuhkan kendaraan — kami sesuaikan dengan jumlah jamaah Anda."
  >
    <div class="space-y-5">
      <div
        v-for="route in routeOptions"
        :key="route.id"
        class="rounded-card border bg-white p-5 transition-colors sm:p-6"
        :class="entry(route.id) ? 'border-brand-green/50' : 'border-neutral-line'"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <p class="font-heading text-base font-semibold text-neutral-charcoal">{{ route.name }}</p>
            <p class="mt-1 text-xs leading-relaxed text-neutral-charcoal/60">{{ route.description }}</p>
          </div>
          <!-- Toggle perlu / tidak -->
          <div class="flex shrink-0 rounded-full border border-neutral-line p-1" role="group" :aria-label="`Kebutuhan transportasi ${route.name}`">
            <button
              type="button"
              class="min-h-[36px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:px-4"
              :class="!entry(route.id) ? 'bg-neutral-warm text-neutral-charcoal' : 'text-neutral-charcoal/60 hover:text-brand-green'"
              :aria-pressed="!entry(route.id)"
              @click="store.setTransportNeeded(route.id, false)"
            >
              Tidak
            </button>
            <button
              type="button"
              class="min-h-[36px] rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:px-4"
              :class="entry(route.id) ? 'bg-brand-green text-white' : 'text-neutral-charcoal/60 hover:text-brand-green'"
              :aria-pressed="Boolean(entry(route.id))"
              @click="store.setTransportNeeded(route.id, true)"
            >
              Perlu
            </button>
          </div>
        </div>

        <!-- Opsi kendaraan -->
        <div v-if="entry(route.id)" class="mt-4 grid gap-2.5 sm:grid-cols-3">
          <button
            v-for="option in route.vehicles"
            :key="option.vehicle.id"
            type="button"
            role="radio"
            :aria-checked="entry(route.id)?.vehicleId === option.vehicle.id"
            class="relative rounded-card border p-4 text-left transition-all"
            :class="[
              entry(route.id)?.vehicleId === option.vehicle.id
                ? 'border-brand-green bg-brand-green/5 shadow-card'
                : 'border-neutral-line hover:border-brand-teal',
              option.vehicle.capacity < pilgrims ? 'cursor-not-allowed opacity-50' : '',
            ]"
            :disabled="option.vehicle.capacity < pilgrims"
            @click="store.selectTransportVehicle(route.id, option.vehicle.id)"
          >
            <span class="block text-sm font-semibold text-neutral-charcoal">{{ option.vehicle.name }}</span>
            <span class="mt-0.5 block text-xs text-neutral-charcoal/60">
              hingga {{ option.vehicle.capacity }} orang
            </span>
            <span v-if="option.vehicle.capacity < pilgrims" class="mt-1.5 block text-xs font-medium text-gold">
              Kurang untuk {{ pilgrims }} jamaah
            </span>
            <span class="mt-1.5 block text-sm font-semibold text-brand-green">{{ formatPrice(option.price) }}</span>
          </button>
        </div>
      </div>
    </div>
  </StepShell>
</template>
