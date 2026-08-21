<script setup lang="ts">
useSeoMeta({
  title: 'Sudut Haramain Tour — Umroh Private, Sesuai Cara Anda',
  description:
    'Rencanakan Umroh private Anda sendiri: pilih jadwal, hotel, penerbangan, dan layanan. Sudut Haramain Tour menyiapkan semuanya — tenang, jelas, dan terpercaya.',
  ogTitle: 'Sudut Haramain Tour — Umroh Private, Sesuai Cara Anda',
  ogDescription: 'Susun perjalanan Umroh sesuai cara Anda. Kami siapkan visa, penerbangan, hotel, hingga transportasi.',
  ogImage: '/images/hero-makkah.jpg',
})

const { fetchFeaturedHotels } = useHotels()
const { fetchTestimonials, fetchFaqs } = useContent()

const [hotels, testimonials, faqs] = await Promise.all([
  fetchFeaturedHotels(3),
  fetchTestimonials(),
  fetchFaqs(),
])

const whyPoints = [
  {
    title: 'Anda yang menentukan',
    text: 'Tanggal, durasi, hotel, dan ritme perjalanan mengikuti kebutuhan keluarga Anda — bukan jadwal rombongan.',
  },
  {
    title: 'Privasi & kenyamanan',
    text: 'Beribadah hanya dengan orang-orang terdekat. Lebih dekat dengan anak dan orang tua di tanah suci.',
  },
  {
    title: 'Semuanya kami siapkan',
    text: 'Visa, tiket, hotel, transportasi, hingga pendamping ibadah — satu pintu, satu rencana yang jelas.',
  },
  {
    title: 'Biaya jelas sejak awal',
    text: 'Hitung estimasi sendiri dalam hitungan menit. Tidak ada biaya tersembunyi, tidak ada kejutan.',
  },
]

const howSteps = [
  { num: '01', title: 'Susun rencana', text: 'Tentukan jumlah jamaah, durasi, hotel, dan kebutuhan perjalanan Anda.' },
  { num: '02', title: 'Hitung estimasi', text: 'Lihat gambaran biaya per komponen secara transparan dan mudah dipahami.' },
  { num: '03', title: 'Konsultasi gratis', text: 'Kirim rencana ke konsultan kami untuk penyesuaian dan konfirmasi ketersediaan.' },
  { num: '04', title: 'Berangkat tenang', text: 'Semua kebutuhan disiapkan — Anda fokus pada kekhusyukan ibadah.' },
]

const serviceCards = [
  {
    name: 'Visa Umroh',
    text: 'Pengurusan visa resmi sampai terbit, termasuk asuransi perjalanan.',
    to: '/services',
    icon: 'doc',
  },
  {
    name: 'Penerbangan',
    text: 'Pilihan maskapai terpercaya Jakarta → Jeddah, direct maupun transit.',
    to: '/flights',
    icon: 'plane',
  },
  {
    name: 'Hotel',
    text: 'Hotel Makkah & Madinah dekat masjid, dari hemat hingga premium.',
    to: '/hotels',
    icon: 'hotel',
  },
  {
    name: 'Transportasi',
    text: 'Armada nyaman untuk antar-jemput bandara dan antar-kota.',
    to: '/transportation',
    icon: 'car',
  },
  {
    name: 'Muthowwif',
    text: 'Pendamping ibadah berbahasa Indonesia yang sabar dan berpengalaman.',
    to: '/services',
    icon: 'guide',
  },
  {
    name: 'Layanan Tambahan',
    text: 'Perlengkapan, handling bandara, dan kebutuhan perjalanan lainnya.',
    to: '/services',
    icon: 'plus',
  },
]
</script>

<template>
  <div>
    <!-- 1. HERO -->
    <HeroSection />

    <!-- 2. VALUE PROPOSITION -->
    <section class="py-14 sm:py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Kenapa Umroh Private"
          title="Umroh yang tenang, atas nama keluarga Anda"
          subtitle="Kami percaya ibadah terbaik lahir dari ketenangan. Karena itu Sudut Haramain membantu Anda berumroh dengan cara yang paling sesuai — bukan sebaliknya."
        />
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="point in whyPoints"
            :key="point.title"
            class="rounded-card border border-neutral-line bg-white p-6 shadow-card"
          >
            <span class="block h-1 w-10 rounded-full bg-gold" aria-hidden="true" />
            <h3 class="mt-4 font-heading text-lg font-semibold">{{ point.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ point.text }}</p>
          </div>
        </div>
      </Container>
    </section>

    <!-- 3. SERVICES OVERVIEW -->
    <section class="bg-neutral-warm py-14 sm:py-20">
      <Container>
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Layanan Kami"
            title="Satu pintu untuk semua kebutuhan Umroh"
            subtitle="Pilih sesuai kebutuhan — semuanya akan kami rangkai menjadi satu rencana perjalanan."
          />
          <AppButton to="/services" variant="outline" class="shrink-0"> Lihat Semua Layanan </AppButton>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="card in serviceCards"
            :key="card.name"
            :to="card.to"
            class="group rounded-card border border-neutral-line bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div class="flex items-center justify-between">
              <div class="flex h-12 w-12 items-center justify-center rounded-card bg-brand-sky/50 text-brand-green">
                <svg v-if="card.icon === 'doc'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6M9 8h6M6 3.5h12A1.5 1.5 0 0 1 19.5 5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z"/></svg>
                <svg v-else-if="card.icon === 'plane'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 13.5 3 11l1.5-1.5L11 10l4.5-4.5a2.1 2.1 0 0 1 3 3L14 13l.5 6.5L13 21l-2.5-7.5Z"/></svg>
                <svg v-else-if="card.icon === 'hotel'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m-12 0h16m-16 0v-4h4m8 0v-6h4a2 2 0 0 1 2 2v8M8.5 7h1m3 0h1m-5 4h1m3 0h1"/></svg>
                <svg v-else-if="card.icon === 'car'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14M6.5 17l1.3-5.2A2 2 0 0 1 9.74 10.3h4.52a2 2 0 0 1 1.94 1.5L17.5 17m-10 0a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0M7 13.5h10"/></svg>
                <svg v-else-if="card.icon === 'guide'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0-9-9m9-6.5a2.5 2.5 0 1 1-2.5 2.5M3 12h4l2 4.5L12 12h4"/></svg>
                <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-7-7h14"/></svg>
              </div>
              <svg class="h-5 w-5 text-brand-teal transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-6-6m6 6-6 6"/></svg>
            </div>
            <h3 class="mt-5 font-heading text-lg font-semibold">{{ card.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ card.text }}</p>
          </NuxtLink>
        </div>
      </Container>
    </section>

    <!-- 4. ESTIMATOR TEASER -->
    <EstimatorTeaser />

    <!-- 5. HOW IT WORKS -->
    <section class="py-14 sm:py-20">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Cara Kerjanya"
          title="Empat langkah menuju Baitullah"
        />
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="step in howSteps" :key="step.num" class="relative rounded-card border border-neutral-line bg-white p-6 shadow-card">
            <span class="font-heading text-3xl font-semibold text-brand-sky" aria-hidden="true">{{ step.num }}</span>
            <h3 class="mt-3 font-heading text-lg font-semibold">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ step.text }}</p>
          </div>
        </div>
      </Container>
    </section>

    <!-- 6. HOTEL / TRAVEL EXPERIENCE TEASER -->
    <section class="bg-neutral-warm py-14 sm:py-20">
      <Container>
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Hotel Pilihan"
            title="Beristirahat dekat rumah Allah"
            subtitle="Hotel-hotel pilihan tim kami — dekat dengan masjid, nyaman untuk keluarga, dan terpercaya."
          />
          <AppButton to="/hotels" variant="outline" class="shrink-0"> Lihat Katalog Hotel </AppButton>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
        </div>
      </Container>
    </section>

    <!-- 7. TESTIMONIALS -->
    <section class="py-14 sm:py-20">
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

    <!-- 8. FAQ -->
    <section class="bg-neutral-warm py-14 sm:py-20">
      <Container>
        <div class="grid gap-10 lg:grid-cols-5">
          <div class="lg:col-span-2">
            <SectionHeader
              eyebrow="FAQ"
              title="Pertanyaan yang sering diajukan"
              subtitle="Belum menemukan jawaban? Konsultan kami siap membantu lewat WhatsApp."
            />
          </div>
          <div class="space-y-3 lg:col-span-3">
            <FaqItem v-for="faq in faqs" :key="faq.id" :faq="faq" />
          </div>
        </div>
      </Container>
    </section>

    <!-- 9. FINAL CTA -->
    <CtaSection class="py-14 sm:py-20" />
  </div>
</template>
