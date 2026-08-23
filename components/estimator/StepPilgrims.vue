<script setup lang="ts">
const store = useEstimatorStore()
</script>

<template>
  <StepShell
    question="Siapa yang akan berangkat?"
    hint="Berapa jamaah yang ingin berangkat bersama? Termasuk Anda, keluarga, atau sahabat terdekat."
  >
    <div class="flex flex-col items-center gap-4 rounded-card border border-neutral-line bg-white p-8 shadow-card">
      <CounterControl
        :model-value="store.pilgrims"
        :min="1"
        :max="30"
        suffix="jamaah"
        aria-label="jumlah jamaah"
        @update:model-value="store.setPilgrims($event)"
      />
      <p class="text-sm text-neutral-charcoal/60">
        {{ store.pilgrims >= 20 ? 'Rombongan besar? Konsultan kami siapkan penawaran khusus.' : 'Bisa diubah kapan saja nanti.' }}
      </p>
    </div>
  </StepShell>
</template>
