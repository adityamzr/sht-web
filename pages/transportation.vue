<script setup lang="ts">
useSeoMeta({
  title: 'Transportasi — Sudut Haramain Tour',
  description:
    'Armada nyaman untuk antar-jemput bandara, perjalanan Makkah–Madinah, dan city tour — sedan, Staria, hingga HiAce.',
  ogTitle: 'Transportasi — Sudut Haramain Tour',
  ogDescription: 'Transportasi nyaman selama perjalanan Umroh private Anda.',
})

const { vehicles, routes, pending, error, refresh } = useTransportations()
</script>

<template>
  <div>
    <section class="bg-sky-gradient py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="Transportasi"
          title="Bergerak tenang dari satu tempat suci ke tempat lainnya"
          subtitle="Armada pribadi dengan driver berpengalaman — menyesuaikan jumlah jamaah dan rute perjalanan Anda."
        />
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
          <p class="mt-2 text-sm text-neutral-charcoal/70">Kami kesulitan memuat data transportasi. Silakan coba lagi.</p>
          <AppButton variant="primary" class="mt-4" @click="refresh"> Coba Lagi </AppButton>
        </div>

        <template v-else>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <TransportationCard v-for="v in vehicles" :key="v.id" :transport="v" />
          </div>

          <div class="mt-12 rounded-card bg-kabah-gradient p-6 text-white sm:p-8">
            <h3 class="font-heading text-xl font-semibold">Rute populer jamaah kami</h3>
            <ul class="mt-4 grid gap-3 sm:grid-cols-2">
              <li v-for="route in routes" :key="route" class="flex items-center gap-3 text-sm text-white/80">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-neutral-charcoal" aria-hidden="true">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
                </span>
                {{ route }}
              </li>
            </ul>
            <p class="mt-6 text-xs text-white/60">
              Rute lengkap dan jumlah armada menyesuaikan rencana perjalanan Anda — diatur lewat
              estimator atau konsultasi dengan tim kami.
            </p>
          </div>
        </template>
      </Container>
    </section>

    <CtaSection class="pb-14 sm:pb-20" />
  </div>
</template>
