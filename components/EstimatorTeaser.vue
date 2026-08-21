<template>
  <section class="bg-kabah-gradient">
    <Container>
      <div class="flex flex-col items-start gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">Estimator Biaya</p>
          <h2 class="mt-3 font-heading text-3xl font-semibold text-white text-balance sm:text-4xl">
            Penasaran berapa biaya Umroh Private Anda?
          </h2>
          <p class="mt-4 text-base leading-relaxed text-white/70">
            Hitung estimasi berdasarkan jumlah jamaah, lama perjalanan, hotel, penerbangan, dan
            kebutuhan lainnya — gratis, tanpa komitmen.
          </p>
        </div>
        <AppButton to="/estimator" variant="gold" size="lg" class="shrink-0">
          Mulai Hitung
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" />
          </svg>
        </AppButton>
      </div>
    </Container>
  </section>
</template>
