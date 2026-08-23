<script setup lang="ts">
const store = useEstimatorStore()
const minDate = todayISO()
</script>

<template>
  <StepShell
    question="Kapan Anda ingin berangkat?"
    hint="Tentukan tanggal keberangkatan dan berapa lama perjalanan Anda — bebas, mengikuti rencana keluarga."
  >
    <div class="space-y-6 rounded-card border border-neutral-line bg-white p-6 shadow-card sm:p-8">
      <!-- Tanggal keberangkatan -->
      <div>
        <label for="departure-date" class="text-sm font-semibold text-neutral-charcoal">
          Tanggal keberangkatan
        </label>
        <input
          id="departure-date"
          :value="store.departureDate"
          type="date"
          :min="minDate"
          class="mt-2 min-h-[48px] w-full rounded-card border border-neutral-line bg-white px-4 py-3 text-base focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          @input="store.setDepartureDate(($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Durasi -->
      <div>
        <p class="text-sm font-semibold text-neutral-charcoal" id="duration-label">Durasi perjalanan</p>
        <div class="mt-3">
          <CounterControl
            :model-value="store.durationDays"
            :min="3"
            :max="45"
            suffix="hari"
            aria-label="durasi perjalanan hari"
            @update:model-value="store.setDurationDays($event)"
          />
        </div>
      </div>

      <!-- Auto return date -->
      <div class="rounded-card bg-brand-sky/40 p-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-brand-green">Rangkuman jadwal</p>
        <p class="mt-2 font-heading text-lg font-semibold text-neutral-charcoal">
          {{ formatDateID(store.departureDate) }} → {{ formatDateID(store.returnDate) }}
        </p>
        <p class="mt-1 text-sm text-neutral-charcoal/70">
          {{ store.durationDays }} hari perjalanan · {{ store.maxNights }} malam untuk dibagi di Makkah &amp; Madinah
        </p>
      </div>
    </div>
  </StepShell>
</template>
