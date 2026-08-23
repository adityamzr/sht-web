<script setup lang="ts">
// Hero — positioning publik saat ini: UMROH MANDIRI & LAND ARRANGEMENT (M4A.1).
// M4A.1.1: palet resmi SHT (sht.olive / sht.gold / warm neutral) menggantikan
// overlay teal/green lama. Struktur & copy terkunci TIDAK berubah.
</script>

<template>
  <section class="relative isolate flex min-h-screen min-h-[100svh] items-center overflow-hidden bg-sht-olive">
    <!-- Background: aset Ka'bah existing (dekoratif — informasi tidak bergantung padanya) -->
    <img
      src="/images/hero-makkah.jpg"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      loading="eager"
      fetchpriority="high"
      @error="($event.target as HTMLImageElement).src = '/images/kaaba-tawaf.jpg'"
    />

    <!-- Overlay resmi: Deep Olive → SHT Olive → transparan hangat di kanan -->
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-gradient-to-r from-sht-olive-dark/95 via-sht-olive/70 to-sht-olive/10 sm:to-sht-olive/5"
    />
    <!-- Tint hangat sangat tipis di sisi foto agar cahaya alami Ka'bah berhubungan dengan gold brand -->
    <div aria-hidden="true" class="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-sht-gold/5 to-sht-gold/10" />
    <!-- Sentuhan bawah agar transisi ke section berikutnya tenang -->
    <div aria-hidden="true" class="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-sht-olive/50 to-transparent" />

    <Container>
      <div class="max-w-2xl py-16 sm:py-24 lg:py-32">
        <!-- Eyebrow -->
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-gold">
          <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
          UMROH MANDIRI &amp; LAND ARRANGEMENT
        </p>

        <!-- Headline -->
        <h1
          class="mt-5 font-heading text-[1.9rem] font-semibold leading-[1.15] text-white text-balance sm:text-5xl sm:leading-[1.12] lg:text-[3.5rem]"
        >
          Jalani Umroh Mandiri,<br class="hidden sm:block" />
          Tanpa Harus Repot Sendiri.
        </h1>

        <!-- Subheadline -->
        <p class="mt-6 max-w-xl text-base leading-relaxed text-sht-off-white/90 sm:text-lg">
          Atur perjalanan Umroh sesuai kebutuhan Anda. Sudut Haramain membantu menyiapkan hotel, transportasi, visa,
          muthawwif, handling, dan berbagai kebutuhan perjalanan lainnya.
        </p>

        <!-- CTA -->
        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <!-- Primary: gold resmi + teks deep olive (kontras aman) -->
          <NuxtLink
            to="/estimator"
            class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-sht-gold px-7 py-3.5 text-base font-semibold text-sht-olive-dark shadow-card transition-colors hover:bg-[#c7b55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold sm:w-auto"
          >
            Persiapkan Perjalanan Saya
          </NuxtLink>
          <!-- Secondary: ghost warm off-white -->
          <NuxtLink
            to="/services"
            class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-sht-off-white/45 px-7 py-3.5 text-base font-semibold text-sht-off-white transition-colors hover:border-sht-off-white hover:bg-sht-off-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold sm:w-auto"
          >
            Lihat Layanan
          </NuxtLink>
        </div>

        <!-- Reassurance (subtle) -->
        <ul class="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Keunggulan Sudut Haramain">
          <li v-for="point in ['Fleksibel sesuai kebutuhan', 'Estimasi transparan', 'Dibantu tim berpengalaman']" :key="point" class="flex items-center gap-2.5">
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sht-gold/20 text-sht-gold" aria-hidden="true">
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
            </span>
            <span class="text-sm font-medium text-sht-off-white/85">{{ point }}</span>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
