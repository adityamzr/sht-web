<script setup lang="ts">
useSeoMeta({
  title: 'Hotel Makkah & Madinah — Sudut Haramain Tour',
  description:
    'Katalog hotel Umroh private di Makkah dan Madinah — dekat masjid, nyaman untuk keluarga, dengan harga yang jelas.',
  ogTitle: 'Hotel Makkah & Madinah — Sudut Haramain Tour',
  ogDescription: 'Hotel dekat Masjidil Haram dan Masjid Nabawi untuk perjalanan Umroh private Anda.',
})

const { hotels, pending, error, refresh } = useHotels()

const activeCity = ref<'Semua' | 'Makkah' | 'Madinah'>('Semua')
const cities = ['Semua', 'Makkah', 'Madinah'] as const

const filteredHotels = computed(() =>
  activeCity.value === 'Semua' ? hotels.value : hotels.value.filter((h) => h.city === activeCity.value),
)
</script>

<template>
  <div>
    <section class="bg-sky-gradient py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="Hotel"
          title="Beristirahat dekat rumah Allah"
          subtitle="Hotel pilihan tim kami di Makkah dan Madinah. Harga yang tertera adalah estimasi — ketersediaan dan harga final dikonfirmasi tim kami."
        />
        <!-- Filter kota -->
        <div class="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter kota">
          <button
            v-for="city in cities"
            :key="city"
            type="button"
            role="tab"
            :aria-selected="activeCity === city"
            class="min-h-[44px] rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            :class="
              activeCity === city
                ? 'bg-brand-green text-white shadow-card'
                : 'border border-neutral-line bg-white text-neutral-charcoal/70 hover:border-brand-green/40 hover:text-brand-green'
            "
            @click="activeCity = city"
          >
            {{ city }}
          </button>
        </div>
      </Container>
    </section>

    <section class="py-12 sm:py-16">
      <Container>
        <!-- Loading -->
        <div v-if="pending" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="h-64 animate-pulse rounded-card bg-neutral-warm" aria-hidden="true" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="rounded-card border border-gold-soft bg-gold-sand/50 p-8 text-center">
          <p class="font-heading text-lg font-semibold">Koneksi terganggu</p>
          <p class="mt-2 text-sm text-neutral-charcoal/70">Kami kesulitan memuat katalog hotel. Silakan coba lagi.</p>
          <AppButton variant="primary" class="mt-4" @click="refresh"> Coba Lagi </AppButton>
        </div>

        <template v-else>
          <p class="text-sm text-neutral-charcoal/60">
            Menampilkan {{ filteredHotels.length }} hotel
            <template v-if="activeCity !== 'Semua'"> di {{ activeCity }}</template>
          </p>
          <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <HotelCard v-for="hotel in filteredHotels" :key="hotel.id" :hotel="hotel" />
          </div>

          <div v-if="filteredHotels.length === 0" class="mt-6 rounded-card border border-neutral-line bg-white p-10 text-center">
            <p class="text-neutral-charcoal/60">Belum ada hotel untuk filter ini.</p>
          </div>
        </template>
      </Container>
    </section>

    <CtaSection class="pb-14 sm:pb-20" />
  </div>
</template>
