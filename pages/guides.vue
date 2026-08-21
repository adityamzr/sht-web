<script setup lang="ts">
useSeoMeta({
  title: 'Panduan Umroh — Sudut Haramain Tour',
  description:
    'Panduan persiapan Umroh private: dokumen, visa, manasik, dan tips perjalanan bersama keluarga.',
  ogTitle: 'Panduan Umroh — Sudut Haramain Tour',
  ogDescription: 'Panduan lengkap mempersiapkan perjalanan Umroh Anda.',
})

const waUrl = whatsappLink()

const guideTopics = [
  {
    title: 'Persiapan Dokumen',
    text: 'Paspor berlaku minimal 8 bulan, vaksin meningitis, dan dokumen pendukung lainnya.',
    soon: true,
  },
  {
    title: 'Tata Cara Umroh (Manasik)',
    text: 'Urutan ibadah dari niat dan ihram, tawaf, sa’i, hingga tahallul — lengkap dengan doa.',
    soon: true,
  },
  {
    title: 'Umroh Bersama Lansia & Anak',
    text: 'Tips kenyamanan, kursi roda, ritme ibadah, dan pemilihan hotel yang tepat.',
    soon: true,
  },
  {
    title: 'Musim & Waktu Terbaik',
    text: 'Memahami perbedaan musim normal, high season, dan Ramadhan beserta dampaknya pada biaya.',
    soon: true,
  },
]
</script>

<template>
  <div>
    <section class="bg-sky-gradient py-12 sm:py-16">
      <Container>
        <SectionHeader
          eyebrow="Panduan"
          title="Belajar dulu, berangkat kemudian"
          subtitle="Materi panduan sedang kami susun dengan teliti bersama pembimbing. Sementara itu, konsultan kami siap menjawab pertanyaan Anda langsung."
        />
      </Container>
    </section>

    <section class="py-12 sm:py-16">
      <Container>
        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="topic in guideTopics"
            :key="topic.title"
            class="relative rounded-card border border-neutral-line bg-white p-6 shadow-card"
          >
            <span class="absolute right-5 top-5 rounded-full bg-gold-sand px-3 py-1 text-xs font-semibold text-neutral-charcoal">
              Segera hadir
            </span>
            <span class="block h-1 w-10 rounded-full bg-brand-teal" aria-hidden="true" />
            <h3 class="mt-4 max-w-[80%] font-heading text-lg font-semibold">{{ topic.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ topic.text }}</p>
          </article>
        </div>

        <div class="mt-12 text-center">
          <p class="text-sm text-neutral-charcoal/70">Ada pertanyaan spesifik tentang persiapan Umroh Anda?</p>
          <AppButton :href="waUrl" variant="whatsapp" size="lg" external class="mt-4">
            Tanya Konsultan
          </AppButton>
        </div>
      </Container>
    </section>
  </div>
</template>
