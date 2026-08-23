<script setup lang="ts">
const waUrl = whatsappLink()
</script>

<template>
  <section class="bg-sht-off-white">
    <Container>
      <div class="relative overflow-hidden rounded-3xl shadow-[0_16px_40px_-24px_rgba(45,53,31,0.55)]">
        <img
          src="/images/cta-masjid.jpg"
          alt="Arsitektur Ka'bah dan Masjidil Haram saat senja"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-sht-olive-dark/95 via-sht-olive-dark/88 to-sht-olive/72" aria-hidden="true" />
        <div class="relative px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          <h2 class="max-w-2xl font-heading text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
            Masih bingung mulai dari mana?
          </h2>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-sht-off-white/85">
            Ceritakan rencana Anda — kami bantu susun sampai siap berangkat. Konsultasi gratis,
            dijawab konsultan manusia, bukan bot.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppButton to="/estimator" variant="gold" size="lg"> Hitung Estimasi Dulu </AppButton>
            <AppButton
              :href="waUrl"
              variant="ghost"
              size="lg"
              external
              class="border border-sht-off-white/45 text-sht-off-white hover:bg-sht-off-white/10 hover:text-sht-off-white"
            >
              Konsultasi via WhatsApp
            </AppButton>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
