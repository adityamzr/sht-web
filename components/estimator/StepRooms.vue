<script setup lang="ts">
import type { Hotel } from '~/types'
import { roomCapacity } from '~/utils/estimatorCalculator'

const props = defineProps<{
  hotel: Hotel | undefined
  city: 'Makkah' | 'Madinah'
  cityKey: 'makkah' | 'madinah'
  nights: number
  pilgrims: number
}>()

const store = useEstimatorStore()

const rooms = computed(() =>
  props.cityKey === 'makkah' ? store.makkahRooms : store.madinahRooms,
)

function qtyOf(roomTypeId: string): number {
  return rooms.value.find((r) => r.roomTypeId === roomTypeId)?.quantity ?? 0
}

const activeSelections = computed(() => rooms.value.filter((r) => r.quantity > 0))
const capacity = computed(() => roomCapacity(props.hotel, activeSelections.value))
const isEnough = computed(() => capacity.value >= props.pilgrims && activeSelections.value.length > 0)
</script>

<template>
  <StepShell
    :question="`Atur kamar Anda di ${city}`"
    :hint="hotel ? `${hotel.name} · ${nights} malam. Pilih tipe dan jumlah kamar — boleh campur, asal cukup untuk ${pilgrims} jamaah.` : ''"
  >
    <div v-if="hotel" class="space-y-4">
      <!-- Daftar tipe kamar -->
      <div
        v-for="rt in hotel.roomTypes"
        :key="rt.id"
        class="flex items-center justify-between gap-4 rounded-card border p-5 transition-colors sm:p-6"
        :class="qtyOf(rt.id) > 0 ? 'border-brand-green bg-brand-green/5' : 'border-neutral-line bg-white'"
      >
        <div class="min-w-0">
          <p class="font-heading text-base font-semibold text-neutral-charcoal">{{ rt.name }}</p>
          <p class="text-xs text-neutral-charcoal/60">{{ rt.capacity }} orang per kamar</p>
          <p class="mt-1 text-sm font-semibold text-brand-green">
            {{ formatPrice(rt.pricePerNight) }}
            <span v-if="rt.pricePerNight !== null" class="font-normal text-neutral-charcoal/60">/kamar/malam</span>
          </p>
        </div>
        <CounterControl
          :model-value="qtyOf(rt.id)"
          :min="0"
          :max="20"
          :aria-label="`jumlah kamar ${rt.name}`"
          @update:model-value="store.setRoomQuantity(cityKey, rt.id, $event)"
        />
      </div>

      <!-- Indikator kapasitas -->
      <div
        class="rounded-card px-4 py-3 text-sm font-medium"
        :class="
          isEnough
            ? 'bg-brand-green/10 text-brand-green'
            : 'border border-gold-soft bg-gold-sand/50 text-neutral-charcoal/80'
        "
        role="status"
        aria-live="polite"
      >
        <template v-if="isEnough">
          Kapasitas cukup — {{ capacity }} orang untuk {{ pilgrims }} jamaah.
        </template>
        <template v-else-if="activeSelections.length">
          Kapasitas baru {{ capacity }} orang untuk {{ pilgrims }} jamaah — tambahkan kamar lagi.
        </template>
        <template v-else>
          Contoh: {{ pilgrims }} jamaah bisa memakai {{ Math.ceil(pilgrims / 4) }} kamar Quad, atau kombinasi Double + Quad.
        </template>
      </div>
    </div>
  </StepShell>
</template>
