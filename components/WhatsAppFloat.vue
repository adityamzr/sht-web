<script setup lang="ts">
const waUrl = whatsappLink()
</script>

<template>
  <a
    :href="waUrl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat WhatsApp Sudut Haramain Tour"
    class="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7" aria-hidden="true">
      <path
        d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.39a9.87 9.87 0 0 0 4.69 1.2c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2Zm0 18.03a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.8.82-3-.2-.3a8.07 8.07 0 0 1-1.24-4.32c0-4.47 3.64-8.11 8.12-8.11a8.1 8.1 0 0 1 8.11 8.1c0 4.48-3.64 8.12-8.11 8.12Zm4.45-6.07c-.24-.12-1.44-.71-1.66-.8-.22-.08-.39-.12-.55.13-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.2-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.01-.38.11-.5.11-.11.24-.28.37-.42.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.56.2-1.05.14-1.16-.06-.1-.22-.16-.47-.28Z"
      />
    </svg>
  </a>
</template>
