<script setup lang="ts">
useSeoMeta({
  title: 'Sudut Haramain Tour — Umroh Mandiri & Land Arrangement',
  description:
    'Jalani Umroh mandiri tanpa repot sendiri. Sudut Haramain membantu menyiapkan hotel, transportasi, visa, muthawwif, handling, dan berbagai kebutuhan perjalanan lainnya — sesuai rencana Anda.',
  ogTitle: 'Sudut Haramain Tour — Umroh Mandiri & Land Arrangement',
  ogDescription:
    'Jalani Umroh mandiri tanpa repot sendiri. Hotel, transportasi, visa, muthawwif, handling — kami bantu siapkan sesuai kebutuhan perjalanan Anda.',
  ogImage: '/images/hero-makkah.jpg',
})

const { fetchTestimonials } = useContent()
const testimonials = await fetchTestimonials()
</script>

<template>
  <div>
    <!-- 1. HERO -->
    <HeroSection />

    <!-- 2. PERSIAPAN UMROH MANDIRI (M4A.2 — education timeline) -->
    <PreparationTimeline />

    <!-- 3. GAMBARAN BIAYA (M4A.3 — cost composition education) -->
    <CostBreakdownSection />

    <!-- 4. BANTUAN SESUAI KEBUTUHAN (M4A.4 — assistance tabs) -->
    <AssistanceTabs />

    <!-- 5. TRUST / CERITA JAMAAH (preserved existing section) -->
    <section class="bg-sht-off-white py-14 sm:py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Cerita Jamaah"
          title="Mereka sudah berangkat dengan cara mereka"
        />
        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <TestimonialCard v-for="t in testimonials" :key="t.id" :testimonial="t" />
        </div>
      </Container>
    </section>

    <!-- 6. FINAL CTA (preserved existing section) -->
    <CtaSection class="py-14 sm:py-20" />
  </div>
</template>
