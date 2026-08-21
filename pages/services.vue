<script setup lang="ts">
useSeoMeta({
  title: 'Layanan — Sudut Haramain Tour',
  description:
    'Visa umroh, penerbangan, hotel, transportasi, muthowwif, dan layanan tambahan — satu pintu untuk perjalanan Umroh private Anda.',
  ogTitle: 'Layanan — Sudut Haramain Tour',
  ogDescription: 'Semua kebutuhan Umroh private dalam satu tempat.',
})

const { fetchServices } = useServices()
const services = await fetchServices()

const waUrl = whatsappLink()
</script>

<template>
  <div>
    <section class="bg-sky-gradient py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="Layanan"
          title="Semua kebutuhan Umroh Anda, dalam satu tempat"
          subtitle="Dari visa hingga pendamping ibadah — pilih yang Anda butuhkan, kami rangkai menjadi satu perjalanan yang tenang."
        />
      </Container>
    </section>

    <section class="py-12 sm:py-16">
      <Container>
        <div class="grid gap-5 sm:grid-cols-2">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>

        <div class="mt-12 rounded-card border border-gold-soft bg-gold-sand/50 p-6 sm:p-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="font-heading text-xl font-semibold">Butuh layanan yang tidak ada di daftar?</h3>
              <p class="mt-1.5 text-sm text-neutral-charcoal/70">
                Ceritakan kebutuhan Anda — hampir semua kebutuhan perjalanan Umroh bisa kami bantu.
              </p>
            </div>
            <AppButton :href="waUrl" variant="primary" external class="shrink-0"> Tanya via WhatsApp </AppButton>
          </div>
        </div>
      </Container>
    </section>

    <CtaSection class="pb-14 sm:pb-20" />
  </div>
</template>
