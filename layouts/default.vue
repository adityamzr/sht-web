<script setup lang="ts">
// Tombol WhatsApp mengambang disembunyikan di /estimator agar tidak menutupi
// sticky estimation summary bar (mobile).
const route = useRoute()
const showWhatsAppFloat = computed(() => !route.path.startsWith('/estimator'))
</script>

<template>
  <div class="flex min-h-screen flex-col bg-sht-off-white">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <WhatsAppFloat v-if="showWhatsAppFloat" />
  </div>
</template>
