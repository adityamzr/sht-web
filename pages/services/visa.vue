<script setup lang="ts">
import { serviceDirectory } from '~/data/services'

useSeoMeta({
  title: 'Layanan Visa Umroh — Sudut Haramain Tour',
  description: 'Siapkan kebutuhan visa Umroh dengan bantuan tim Sudut Haramain Tour.',
})

const visaService = serviceDirectory.find((service) => service.key === 'visa')!
</script>

<template>
  <div>
    <section class="bg-sht-olive py-16 text-sht-off-white sm:py-24">
      <Container>
        <div class="max-w-2xl">
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-gold">
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
            LAYANAN VISA UMROH
          </p>
          <h1 class="mt-5 font-heading text-3xl font-semibold leading-tight sm:text-5xl">Siapkan dokumen perjalanan dengan lebih tenang.</h1>
          <p class="mt-5 text-base leading-relaxed text-sht-off-white/85 sm:text-lg">
            Kami membantu menyiapkan kebutuhan visa Umroh sesuai rencana perjalanan Anda, dengan informasi dan pendampingan dari tim Sudut Haramain.
          </p>
        </div>
      </Container>
    </section>

    <section class="py-14 sm:py-20">
      <Container>
        <article class="max-w-2xl rounded-2xl border border-sht-stone bg-white p-6 sm:p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">Layanan tersedia</p>
          <h2 class="mt-3 font-heading text-2xl font-semibold text-sht-olive-dark">{{ visaService.name }}</h2>
          <p class="mt-3 text-base leading-relaxed text-sht-charcoal/70">{{ visaService.description }}</p>
          <NuxtLink to="/services?service=visa" class="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full bg-sht-olive px-6 py-3 text-sm font-semibold text-sht-off-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
            Konsultasikan layanan visa
          </NuxtLink>
        </article>
      </Container>
    </section>
  </div>
</template>
