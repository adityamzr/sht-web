<script setup lang="ts">
interface CostComponent {
  number: string
  name: string
  description: string
  tag: string
  icon: 'flight' | 'hotel' | 'transport' | 'visa' | 'support'
}

const components: CostComponent[] = [
  {
    number: '01',
    name: 'Penerbangan',
    description: 'Biaya penerbangan dapat berbeda berdasarkan jadwal keberangkatan, maskapai, rute, dan waktu pemesanan.',
    tag: 'Variabel',
    icon: 'flight',
  },
  {
    number: '02',
    name: 'Hotel',
    description: 'Biaya hotel menyesuaikan lokasi, jumlah malam, tipe kamar, serta periode perjalanan.',
    tag: 'Variabel',
    icon: 'hotel',
  },
  {
    number: '03',
    name: 'Transportasi',
    description: 'Biaya transportasi bergantung pada rute, kapasitas kendaraan, jumlah perjalanan, dan kebutuhan transfer selama perjalanan.',
    tag: 'Variabel',
    icon: 'transport',
  },
  {
    number: '04',
    name: 'Visa',
    description: 'Biaya visa mengikuti jenis layanan pengurusan dan kebutuhan dokumen perjalanan yang dipilih.',
    tag: 'Variabel',
    icon: 'visa',
  },
  {
    number: '05',
    name: 'Layanan Pendukung',
    description: 'Muthawwif, handling, perlengkapan, ziarah, dan layanan tambahan lainnya dapat disesuaikan dengan kebutuhan perjalanan.',
    tag: 'Sesuai kebutuhan',
    icon: 'support',
  },
]
</script>

<template>
  <section class="bg-sht-stone/35 py-16 sm:py-20 lg:py-24" aria-labelledby="cost-heading">
    <Container>
      <div class="grid items-start gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
        <div class="lg:sticky lg:top-28">
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
            GAMBARAN BIAYA
          </p>
          <h2 id="cost-heading" class="mt-4 max-w-xl font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-4xl">
            Kenali Komponen Biaya Umroh Mandiri.
          </h2>
          <p class="mt-5 max-w-xl text-base leading-relaxed text-sht-charcoal/75">
            Biaya perjalanan dapat berbeda sesuai waktu keberangkatan, penerbangan, hotel, transportasi, visa, dan layanan tambahan yang dipilih.
          </p>

          <div class="mt-8 border-l-2 border-sht-gold/60 pl-4">
            <p class="text-sm leading-relaxed text-sht-charcoal/75">
              Tidak ada satu biaya yang sama untuk setiap perjalanan. Estimasi mengikuti pilihan dan kebutuhan Anda.
            </p>
          </div>

          <div class="mt-10">
            <h3 class="font-heading text-xl font-semibold text-sht-olive-dark">Ingin tahu estimasi berdasarkan rencana Anda?</h3>
            <p class="mt-3 max-w-lg text-sm leading-relaxed text-sht-charcoal/70">
              Susun waktu perjalanan, jumlah jamaah, hotel, penerbangan, dan kebutuhan lainnya untuk melihat perkiraan biaya yang lebih sesuai.
            </p>
            <NuxtLink
              to="/estimator"
              class="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sht-olive px-7 py-3.5 text-base font-semibold text-sht-off-white shadow-card transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
            >
              Hitung Estimasi Perjalanan
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6" /></svg>
            </NuxtLink>
          </div>
        </div>

        <div class="relative">
          <div class="absolute bottom-20 left-6 top-6 w-px bg-sht-sage/30" aria-hidden="true" />
          <ol class="relative space-y-3" aria-label="Komponen biaya Umroh Mandiri">
            <li v-for="item in components" :key="item.number" class="relative flex gap-4 rounded-2xl border border-sht-stone/80 bg-sht-off-white/80 p-4 transition-colors hover:border-sht-gold/60 sm:gap-5 sm:p-5">
              <div class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-sht-gold/40 bg-sht-off-white text-sht-olive" aria-hidden="true">
                <svg v-if="item.icon === 'flight'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 13.5-7.5-2.5 1.5-1.5L11 10l4.5-4.5a2.1 2.1 0 0 1 3 3L14 13l.5 6.5L13 21l-2.5-7.5Z" /></svg>
                <svg v-else-if="item.icon === 'hotel'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m-12 0h16m-16 0v-4h4m8 0v-6h4a2 2 0 0 1 2 2v8M8.5 7h1m3 0h1m-5 4h1m3 0h1" /></svg>
                <svg v-else-if="item.icon === 'transport'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14M6.5 17l1.3-5.2A2 2 0 0 1 9.74 10.3h4.52a2 2 0 0 1 1.94 1.5L17.5 17m-10 0a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0M7 13.5h10" /></svg>
                <svg v-else-if="item.icon === 'visa'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" /><path stroke-linecap="round" d="M14 3.5V7h3M8.5 12h5M8.5 15h3" /></svg>
                <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="m7 7 5-3 5 3v7l-5 3-5-3V7Z" /><path stroke-linecap="round" d="m7 7 5 3 5-3M12 10v7M5 18.5l7 3 7-3" /></svg>
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div class="flex items-baseline gap-2.5">
                    <span class="font-heading text-xs font-semibold tracking-[0.15em] text-sht-sage">{{ item.number }}</span>
                    <h3 class="font-heading text-lg font-semibold text-sht-olive-dark sm:text-xl">{{ item.name }}</h3>
                  </div>
                  <span class="shrink-0 rounded-full bg-sht-gold/15 px-2.5 py-1 text-[11px] font-semibold text-sht-olive-dark">{{ item.tag }}</span>
                </div>
                <p class="mt-2 text-sm leading-relaxed text-sht-charcoal/70">{{ item.description }}</p>
              </div>
            </li>
          </ol>

          <div class="relative mt-5 flex items-center gap-4 rounded-2xl bg-sht-olive px-5 py-5 text-sht-off-white sm:px-6">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sht-gold text-sht-olive-dark" aria-hidden="true">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-gold">Hasil akhirnya</p>
              <p class="mt-1 font-heading text-lg font-semibold">Estimasi sesuai rencana Anda</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
