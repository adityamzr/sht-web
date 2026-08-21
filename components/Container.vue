<script setup lang="ts">
defineProps<{ as?: string }>()
</script>

<template>
  <component :is="as ?? 'div'" class="mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8">
    <slot />
  </component>
</template>
