<script setup lang="ts">
const waUrl = whatsappLink()
</script>

<template>
  <section class="relative overflow-hidden bg-sky-gradient">
    <Container>
      <div class="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <!-- Copy -->
        <div class="order-2 lg:order-1">
          <p class="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-green">
            <span class="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            Umroh Private &amp; Custom Journey
          </p>
          <h1 class="mt-5 font-heading text-4xl font-semibold leading-[1.15] text-neutral-charcoal text-balance sm:text-5xl lg:text-[3.4rem]">
            Umroh Private,<br />Sesuai Cara Anda.
          </h1>
          <p class="mt-5 max-w-lg text-base leading-relaxed text-neutral-charcoal/70 sm:text-lg">
            Susun perjalanan Umroh bersama keluarga atau orang-orang terdekat Anda. Kami bantu
            siapkan kebutuhan perjalanan dari visa, penerbangan, hotel hingga transportasi.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AppButton to="/estimator" variant="primary" size="lg" block class="sm:w-auto">
              Hitung Estimasi Umroh
            </AppButton>
            <AppButton :href="waUrl" variant="whatsapp" size="lg" external block class="sm:w-auto">
              Konsultasi via WhatsApp
            </AppButton>
          </div>
          <p class="mt-5 text-xs text-neutral-charcoal/50">
            Estimasi gratis · Dijawab konsultan manusia, bukan bot · Tanpa komitmen
          </p>
        </div>

        <!-- Visual -->
        <div class="order-1 lg:order-2">
          <div class="relative">
            <div class="absolute -inset-3 rounded-[2rem] bg-gold-sand/60 blur-xl" aria-hidden="true" />
            <img
              src="/images/hero-makkah.jpg"
              alt="Ka'bah di Masjidil Haram, Makkah, dengan Menara Jam di latar belakang"
              class="relative aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-card-hover sm:aspect-[5/4]"
              loading="eager"
              fetchpriority="high"
              @error="($event.target as HTMLImageElement).src = '/images/kaaba-tawaf.jpg'"
            />
            <!-- Floating card -->
            <div class="absolute -bottom-5 left-4 right-4 rounded-card bg-white p-4 shadow-card-hover sm:left-6 sm:right-auto sm:w-72">
              <p class="text-xs font-semibold uppercase tracking-wider text-gold">Mulai dari</p>
              <p class="mt-1 font-heading text-xl font-semibold text-brand-green">Rp 26 jt-an <span class="font-sans text-xs font-normal text-neutral-charcoal/60">/orang</span></p>
              <p class="mt-1 text-xs text-neutral-charcoal/60">Umroh private 9 hari, hotel bintang 5 dekat Haram</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
