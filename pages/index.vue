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
        <div class="mx-auto max-w-3xl text-center">
          <p class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
            CERITA JAMAAH
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
          </p>
          <h2 class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-4xl">
            Mereka sudah berangkat dengan cara mereka
          </h2>
        </div>
        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <TestimonialCard v-for="t in testimonials" :key="t.id" :testimonial="t" />
        </div>
      </Container>
    </section>

    <!-- 6. FINAL CTA (preserved existing section) -->
    <CtaSection class="py-14 sm:py-20" />
  </div>
</template>
