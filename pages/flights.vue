<script setup lang="ts">
useSeoMeta({
  title: 'Penerbangan Jakarta → Jeddah — Sudut Haramain Tour',
  description:
    'Pilihan maskapai terpercaya CGK → JED untuk Umroh private Anda — Saudia, Garuda Indonesia, Qatar Airways. Direct maupun transit.',
  ogTitle: 'Penerbangan — Sudut Haramain Tour',
  ogDescription: 'Pilihan penerbangan Jakarta → Jeddah untuk perjalanan Umroh Anda.',
})

const { flights, pending, error, refresh } = useFlights()
</script>

<template>
  <div>
    <section class="bg-sky-gradient py-12 sm:py-16">
      <Container>
        <div class="grid items-center gap-8 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Penerbangan"
            title="Terbang nyaman menuju Tanah Suci"
            subtitle="Rute utama Jakarta (CGK) → Jeddah (JED) dengan maskapai terpercaya. Harga per orang, termasuk bagasi."
          />
          <img
            src="/images/flight-cgk-jed.jpg"
            alt="Pemandangan sayap pesawat di atas awan"
            class="hidden aspect-[16/9] w-full rounded-[1.5rem] object-cover shadow-card-hover lg:block"
            loading="lazy"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
        </div>
      </Container>
    </section>

    <section class="py-12 sm:py-16">
      <Container>
        <!-- Loading -->
        <div v-if="pending" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="h-44 animate-pulse rounded-card bg-neutral-warm" aria-hidden="true" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="rounded-card border border-gold-soft bg-gold-sand/50 p-8 text-center">
          <p class="font-heading text-lg font-semibold">Koneksi terganggu</p>
          <p class="mt-2 text-sm text-neutral-charcoal/70">Kami kesulitan memuat daftar penerbangan. Silakan coba lagi.</p>
          <AppButton variant="primary" class="mt-4" @click="refresh"> Coba Lagi </AppButton>
        </div>

        <template v-else>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <FlightCard v-for="flight in flights" :key="flight.id" :flight="flight" />
          </div>
          <p class="mt-8 text-xs leading-relaxed text-neutral-charcoal/60">
            * Harga adalah estimasi per orang dan dapat berubah sesuai musim serta ketersediaan.
            Keberangkatan juga tersedia dari Bandung — konsultasikan dengan tim kami.
          </p>
        </template>
      </Container>
    </section>

    <CtaSection class="pb-14 sm:pb-20" />
  </div>
</template>
