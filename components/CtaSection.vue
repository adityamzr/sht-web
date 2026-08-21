<script setup lang="ts">
const waUrl = whatsappLink()
</script>

<template>
  <section>
    <Container>
      <div class="relative overflow-hidden rounded-[1.5rem] shadow-card-hover">
        <img
          src="/images/kaaba-tawaf.jpg"
          alt="Jamaah bertawaf mengelilingi Ka'bah"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-brand-green/95 via-brand-green/85 to-brand-green/60" aria-hidden="true" />
        <div class="relative px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <h2 class="max-w-xl font-heading text-3xl font-semibold text-white text-balance sm:text-4xl">
            Masih bingung mulai dari mana?
          </h2>
          <p class="mt-4 max-w-lg text-base leading-relaxed text-white/80">
            Ceritakan rencana Anda — kami bantu susun sampai siap berangkat. Konsultasi gratis,
            dijawab konsultan manusia, bukan bot.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton :href="waUrl" variant="whatsapp" size="lg" external> Konsultasi via WhatsApp </AppButton>
            <AppButton to="/estimator" variant="gold" size="lg"> Hitung Estimasi Dulu </AppButton>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
