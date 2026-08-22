<script setup lang="ts">
// Hero — positioning publik saat ini: UMROH MANDIRI & LAND ARRANGEMENT (M4A.1).
// Copy terkunci; komposisi full-width Ka'bah + overlay kiri gelap.
</script>

<template>
  <section class="relative isolate overflow-hidden bg-brand-green">
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

    <!-- Overlay: kiri deep-green solid → kanan transparan (readability tanpa menghilangkan gambar) -->
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-gradient-to-r from-brand-green/95 via-brand-green/70 to-brand-green/15 sm:to-brand-green/5"
    />
    <!-- Sentuhan bawah agar transisi ke section berikutnya tenang -->
    <div aria-hidden="true" class="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-brand-green/60 to-transparent" />

    <Container>
      <div class="max-w-2xl py-16 sm:py-24 lg:py-32">
        <!-- Eyebrow -->
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
          <span class="h-px w-8 bg-gold" aria-hidden="true" />
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
        <p class="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          Atur perjalanan Umroh sesuai kebutuhan Anda. Sudut Haramain membantu menyiapkan hotel, transportasi, visa,
          muthawwif, handling, dan berbagai kebutuhan perjalanan lainnya.
        </p>

        <!-- CTA -->
        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <AppButton to="/estimator" variant="gold" size="lg" block class="sm:w-auto">
            Persiapkan Perjalanan Saya
          </AppButton>
          <NuxtLink
            to="/services"
            class="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft sm:w-auto"
          >
            Lihat Layanan
          </NuxtLink>
        </div>

        <!-- Reassurance (subtle) -->
        <ul class="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Keunggulan Sudut Haramain">
          <li v-for="point in ['Fleksibel sesuai kebutuhan', 'Estimasi transparan', 'Dibantu tim berpengalaman']" :key="point" class="flex items-center gap-2.5">
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-soft" aria-hidden="true">
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
            </span>
            <span class="text-sm font-medium text-white/80">{{ point }}</span>
          </li>
        </ul>
      </div>
    </Container>
  </section>
</template>
