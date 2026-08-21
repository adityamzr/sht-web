<script setup lang="ts">
useSeoMeta({
  title: 'Penerbangan Jakarta → Jeddah — Sudut Haramain Tour',
  description:
    'Pilihan maskapai terpercaya CGK → JED untuk Umroh private Anda — Saudia, Garuda Indonesia, Qatar Airways. Direct maupun transit.',
  ogTitle: 'Penerbangan — Sudut Haramain Tour',
  ogDescription: 'Pilihan penerbangan Jakarta → Jeddah untuk perjalanan Umroh Anda.',
})

const { fetchFlights } = useFlights()
const flights = await fetchFlights()
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
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FlightCard v-for="flight in flights" :key="flight.id" :flight="flight" />
        </div>
        <p class="mt-8 text-xs leading-relaxed text-neutral-charcoal/60">
          * Harga adalah estimasi per orang dan dapat berubah sesuai musim serta ketersediaan.
          Keberangkatan juga tersedia dari Bandung — konsultasikan dengan tim kami.
        </p>
      </Container>
    </section>

    <CtaSection class="pb-14 sm:pb-20" />
  </div>
</template>
