<script setup lang="ts">
useSeoMeta({
  title: 'Estimator Biaya Umroh — Sudut Haramain Tour',
  description:
    'Hitung estimasi biaya Umroh private berdasarkan jumlah jamaah, durasi, hotel, penerbangan, dan kebutuhan lainnya — gratis, tanpa komitmen.',
  ogTitle: 'Estimator Biaya Umroh — Sudut Haramain Tour',
  ogDescription: 'Susun perjalanan Umroh private Anda langkah demi langkah, dan lihat estimasi biayanya.',
})

const store = useEstimatorStore()
store.reset() // mulai bersih setiap masuk halaman estimator

// Data-access layer — Phase 3: diganti panggilan API, komponen tidak berubah.
const { fetchFlights } = useFlights()
const { fetchHotels } = useHotels()
const { fetchServices } = useServices()
const { fetchTransportRouteOptions } = useTransportations()
const { fetchVisaProduct } = useVisa()
const { fetchDepartureCities } = useDepartures()

const [flights, hotels, services, routeOptions, visa, departureCities] = await Promise.all([
  fetchFlights(),
  fetchHotels(),
  fetchServices(),
  fetchTransportRouteOptions(),
  fetchVisaProduct(),
  fetchDepartureCities(),
])

const datasets = {
  flights,
  hotels,
  routeOptions,
  visa,
  services,
  departureCities,
}

const flow = useEstimatorFlow(datasets)
const {
  steps,
  breakdown,
  isStepValid,
  stepMessage,
  makkahHotels,
  madinahHotels,
  additionalServices,
  selectedFlight,
  makkahHotel,
  madinahHotel,
  departure,
  nightsRemaining,
  editStepFor,
} = flow

const currentMeta = computed(() => steps.find((s) => s.n === store.currentStep)!)
const isReview = computed(() => store.currentStep === steps.length)
const canProceed = computed(() => isStepValid(store.currentStep))
const currentMessage = computed(() => stepMessage(store.currentStep))
const departureCityName = computed(() => departure.value?.name ?? null)

function onNext() {
  if (!canProceed.value) return
  store.next()
  scrollToTop()
}
function onBack() {
  store.back()
  scrollToTop()
}
function onEdit(step: number) {
  store.goToStep(step)
  scrollToTop()
}
function scrollToTop() {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="bg-neutral-soft pb-28 lg:pb-0">
    <!-- Header section -->
    <section class="bg-sky-gradient py-10 sm:py-14">
      <Container>
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">Estimator Biaya</p>
          <h1 class="mt-3 font-heading text-3xl font-semibold text-neutral-charcoal sm:text-4xl">
            Susun perjalanan Umroh Anda
          </h1>
          <p class="mt-3 text-sm leading-relaxed text-neutral-charcoal/70 sm:text-base">
            Beberapa pertanyaan singkat, satu per satu — dan estimasi biaya Anda akan terbentuk.
            Gratis, tanpa komitmen.
          </p>
        </div>
      </Container>
    </section>

    <section class="py-10 sm:py-12">
      <Container>
        <ProgressBar
          :current="store.currentStep"
          :total="steps.length"
          :title="currentMeta.title"
        />

        <!-- Review = full width; steps lain = layout 2 kolom di desktop -->
        <StepReview
          v-if="isReview"
          :breakdown="breakdown"
          :flight="selectedFlight"
          :makkah-hotel="makkahHotel"
          :madinah-hotel="madinahHotel"
          :departure-city-name="departureCityName"
          :edit-step-for="editStepFor"
          @edit="onEdit"
          @reset="store.reset()"
        />

        <div v-else class="grid gap-8 lg:grid-cols-[1fr_360px]">
          <!-- Kolom kiri: step aktif -->
          <div>
            <StepPilgrims v-if="currentMeta.id === 'pilgrims'" />
            <StepDeparture v-else-if="currentMeta.id === 'departure'" :cities="datasets.departureCities" />
            <StepSchedule v-else-if="currentMeta.id === 'schedule'" />
            <StepNights
              v-else-if="currentMeta.id === 'nights'"
              :nights-remaining="nightsRemaining"
              :max-nights="store.maxNights"
            />
            <StepFlight v-else-if="currentMeta.id === 'flight'" :flights="flights" :pilgrims="store.pilgrims" />
            <StepHotel
              v-else-if="currentMeta.id === 'hotelMakkah'"
              :hotels="makkahHotels"
              city="Makkah"
              city-key="makkah"
              :nights="store.makkahNights"
            />
            <StepRooms
              v-else-if="currentMeta.id === 'roomsMakkah'"
              :hotel="makkahHotel"
              city="Makkah"
              city-key="makkah"
              :nights="store.makkahNights"
              :pilgrims="store.pilgrims"
            />
            <StepHotel
              v-else-if="currentMeta.id === 'hotelMadinah'"
              :hotels="madinahHotels"
              city="Madinah"
              city-key="madinah"
              :nights="store.madinahNights"
            />
            <StepRooms
              v-else-if="currentMeta.id === 'roomsMadinah'"
              :hotel="madinahHotel"
              city="Madinah"
              city-key="madinah"
              :nights="store.madinahNights"
              :pilgrims="store.pilgrims"
            />
            <StepTransport
              v-else-if="currentMeta.id === 'transport'"
              :route-options="datasets.routeOptions"
              :pilgrims="store.pilgrims"
            />
            <StepVisa v-else-if="currentMeta.id === 'visa'" :visa-product="datasets.visa" :pilgrims="store.pilgrims" />
            <StepServices v-else-if="currentMeta.id === 'services'" :services="additionalServices" :pilgrims="store.pilgrims" />

            <NavButtons
              :is-first="store.currentStep === 1"
              :can-proceed="canProceed"
              :message="currentMessage"
              @back="onBack"
              @next="onNext"
            />
          </div>

          <!-- Kolom kanan: summary persisten (desktop) -->
          <SummaryPanel
            class="hidden lg:block"
            :breakdown="breakdown"
            :pilgrims="store.pilgrims"
            :duration-days="store.durationDays"
            :departure-city-name="departureCityName"
          />
        </div>
      </Container>
    </section>

    <!-- Sticky summary (mobile) -->
    <MobileSummaryBar
      v-if="!isReview"
      :breakdown="breakdown"
      :pilgrims="store.pilgrims"
      :duration-days="store.durationDays"
      :departure-city-name="departureCityName"
    />
  </div>
</template>
