<script setup lang="ts">
import type { Service, ServiceInquiryResult } from '~/types'
import { buildServiceInquiryMessage } from '~/utils/waMessage'

useSeoMeta({
  title: 'Layanan Umroh Mandiri — Sudut Haramain',
  description:
    'Pilih layanan Umroh sesuai kebutuhan Anda, mulai dari visa, pendampingan, hingga kebutuhan perjalanan lainnya bersama Sudut Haramain.',
  ogTitle: 'Layanan Umroh Mandiri — Sudut Haramain',
  ogDescription: 'Pilih bantuan Umroh sesuai rencana dan kebutuhan perjalanan Anda.',
})

const { services, pending, error, refresh } = useServices()
const route = useRoute()
const config = useRuntimeConfig()
const { whatsappNumber } = useSiteConfig()
const waUrl = whatsappLink()

const serviceGroups = computed(() => [
  {
    title: 'Dokumen & Administrasi',
    description: 'Kebutuhan administratif untuk membantu perjalanan Anda lebih siap.',
    services: services.value.filter((service) => service.code?.toLowerCase() === 'visa' || service.name.toLowerCase().includes('visa')),
  },
  {
    title: 'Pendampingan',
    description: 'Bantuan selama perjalanan dan ibadah di Tanah Suci.',
    services: services.value.filter((service) => {
      const value = `${service.code ?? ''} ${service.name}`.toLowerCase()
      return (value.includes('muth') || value.includes('mutt') || value.includes('handling')) && !value.includes('visa')
    }),
  },
  {
    title: 'Kebutuhan Tambahan',
    description: 'Layanan pelengkap yang dapat dipilih sesuai rencana perjalanan.',
    services: services.value.filter((service) => {
      const value = `${service.code ?? ''} ${service.name}`.toLowerCase()
      return !value.includes('visa') && !value.includes('muth') && !value.includes('mutt') && !value.includes('handling')
    }),
  },
].filter((group) => group.services.length))

function serviceIcon(service: Service) {
  const value = `${service.code ?? ''} ${service.name}`.toLowerCase()
  if (value.includes('visa')) return 'visa'
  if (value.includes('muth') || value.includes('mutt')) return 'guide'
  if (value.includes('handling')) return 'handling'
  return 'kit'
}

function pricingUnitLabel(service: Service) {
  if (service.pricingUnit === 'group_session') return 'per sesi'
  if (service.pricingUnit === 'package') return 'per paket'
  return 'per jamaah'
}

// ─── Service Inquiry (existing flow preserved) ──────────────────────────────
const inquiryService = ref<Service | null>(null)
const iForm = reactive({ name: '', whatsapp: '', email: '', notes: '' })
const iError = ref<string | null>(null)
const iPending = ref(false)
const iDone = ref<ServiceInquiryResult | null>(null)

function openInquiry(service: Service) {
  inquiryService.value = service
  iDone.value = null
  iError.value = null
  Object.assign(iForm, { name: '', whatsapp: '', email: '', notes: '' })
}

function closeInquiry() {
  inquiryService.value = null
  iDone.value = null
}

// Deep-link from /services/visa reuses the existing inquiry modal.
watch(
  [services, () => route.query.service],
  ([availableServices, serviceCode]) => {
    if (serviceCode !== 'visa' || inquiryService.value) return
    const service = availableServices.find((item) => item.code?.toLowerCase() === 'visa')
    if (service) openInquiry(service)
  },
  { immediate: true },
)

async function submitInquiry() {
  iError.value = null
  const name = iForm.name.trim()
  const whatsapp = iForm.whatsapp.trim()
  if (name.length < 2) {
    iError.value = 'Mohon isi nama Anda (minimal 2 karakter).'
    return
  }
  if (!/^[0-9]{8,18}$/.test(whatsapp)) {
    iError.value = 'Mohon isi nomor WhatsApp yang benar (angka saja).'
    return
  }
  iPending.value = true
  try {
    const res = await $fetch<{ data: ServiceInquiryResult }>(`${config.public.apiBaseUrl}/api/v1/leads`, {
      method: 'POST',
      body: {
        serviceId: inquiryService.value ? Number(inquiryService.value.id) : null,
        name,
        whatsapp,
        email: iForm.email.trim() || null,
        notes: iForm.notes.trim() || null,
      },
    })
    iDone.value = res.data
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    iError.value = e.data?.statusMessage ?? 'Terjadi kendala saat mengirim. Silakan coba lagi.'
  } finally {
    iPending.value = false
  }
}

const iWaUrl = computed(() => {
  const message = buildServiceInquiryMessage(iForm.name.trim(), inquiryService.value)
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <div class="bg-sht-off-white">
    <!-- Compact services hero -->
    <section class="border-b border-sht-stone/70 bg-sht-off-white py-14 sm:py-20">
      <Container>
        <div class="max-w-3xl">
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark">
            <span class="h-px w-8 bg-sht-gold" aria-hidden="true" />
            LAYANAN SUDUT HARAMAIN
          </p>
          <h1 class="mt-4 max-w-2xl font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-5xl">
            Pilih Bantuan yang Anda Perlukan.
          </h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-sht-charcoal/75 sm:text-lg">
            Dari kebutuhan perjalanan hingga pendampingan selama Umroh, gunakan hanya layanan yang sesuai dengan rencana Anda.
          </p>
          <p class="mt-4 text-sm font-medium text-sht-olive">Tidak harus mengambil semuanya.</p>
        </div>
      </Container>
    </section>

    <!-- Core services -->
    <section class="py-14 sm:py-20">
      <Container>
        <div class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">LAYANAN INTI</p>
          <h2 class="mt-3 font-heading text-2xl font-semibold text-sht-olive-dark sm:text-3xl">Bantuan yang bisa dipilih sesuai kebutuhan.</h2>
        </div>

        <div v-if="pending" class="mt-10 grid gap-6 sm:grid-cols-2">
          <div v-for="n in 3" :key="n" class="h-56 animate-pulse rounded-2xl bg-sht-stone/60" aria-hidden="true" />
        </div>
        <div v-else-if="error" class="mt-10 rounded-2xl border border-sht-stone bg-white p-8 text-center">
          <p class="text-sm text-sht-charcoal/70">Kami kesulitan memuat layanan. Silakan coba lagi.</p>
          <AppButton variant="gold" class="mt-4" @click="refresh">Coba Lagi</AppButton>
        </div>
        <div v-else-if="!serviceGroups.length" class="mt-10 rounded-2xl border border-sht-stone bg-white p-8 text-center">
          <p class="text-sm text-sht-charcoal/70">Belum ada layanan yang tersedia saat ini.</p>
        </div>
        <div v-else class="mt-10 space-y-12">
          <section v-for="group in serviceGroups" :key="group.title" :aria-labelledby="`group-${group.title}`">
            <div class="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 :id="`group-${group.title}`" class="font-heading text-xl font-semibold text-sht-olive-dark">{{ group.title }}</h3>
                <p class="mt-1 text-sm text-sht-charcoal/65">{{ group.description }}</p>
              </div>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <article v-for="service in group.services" :key="service.id" class="flex flex-col rounded-2xl border border-sht-stone bg-white p-6 shadow-[0_8px_24px_-20px_rgba(45,53,31,0.45)]">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sht-gold/15 text-sht-olive" aria-hidden="true">
                    <svg v-if="serviceIcon(service) === 'visa'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path stroke-linecap="round" d="M14 3.5V7h3M8.5 12h5M8.5 15h3"/></svg>
                    <svg v-else-if="serviceIcon(service) === 'guide'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path stroke-linecap="round" d="M12 7v5l3.5 2M4.5 12H2.8M21.2 12h-1.7"/></svg>
                    <svg v-else-if="serviceIcon(service) === 'handling'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M6 8h12l1 12H5L6 8Z"/><path stroke-linecap="round" d="M9 8V6a3 3 0 0 1 6 0v2M8 13h8M12 10v6"/></svg>
                    <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="m7 7 5-3 5 3v7l-5 3-5-3V7Z"/><path stroke-linecap="round" d="m7 7 5 3 5-3M12 10v7M5 18.5l7 3 7-3"/></svg>
                  </div>
                  <span class="text-xs font-semibold uppercase tracking-[0.12em] text-sht-sage">{{ service.price === null ? 'Harga dikonfirmasi' : 'Tersedia' }}</span>
                </div>
                <h4 class="mt-5 font-heading text-xl font-semibold text-sht-olive-dark">{{ service.name }}</h4>
                <p class="mt-2 flex-1 text-sm leading-relaxed text-sht-charcoal/70">{{ service.description }}</p>
                <div v-if="service.price !== null" class="mt-4 flex items-baseline gap-1.5">
                  <span class="font-heading text-lg font-semibold text-sht-olive-dark">{{ formatPrice(service.price) }}</span>
                  <span class="text-xs text-sht-charcoal/55">{{ pricingUnitLabel(service) }}</span>
                </div>
                <div class="mt-5">
                  <NuxtLink v-if="service.code?.toLowerCase() === 'visa'" to="/services/visa" class="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-sht-olive px-5 py-3 text-sm font-semibold text-sht-off-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
                    Lihat Detail
                    <span aria-hidden="true">→</span>
                  </NuxtLink>
                  <button v-else type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-5 py-3 text-sm font-semibold text-sht-olive transition-colors hover:bg-sht-olive/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="openInquiry(service)">
                    Konsultasikan
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            </div>
          </section>
        </div>
      </Container>
    </section>

    <!-- Travel needs shortcuts -->
    <section class="border-y border-sht-stone/70 bg-sht-stone/25 py-14 sm:py-16">
      <Container>
        <div class="max-w-2xl">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">KEBUTUHAN PERJALANAN</p>
          <h2 class="mt-3 font-heading text-2xl font-semibold text-sht-olive-dark sm:text-3xl">Temukan bagian perjalanan lainnya.</h2>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <NuxtLink to="/hotels" class="group rounded-2xl border border-sht-stone bg-white p-5 transition-colors hover:border-sht-gold/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
            <span class="text-sm font-semibold text-sht-olive-dark">Hotel</span>
            <p class="mt-2 text-sm text-sht-charcoal/65">Cari akomodasi di Makkah dan Madinah.</p>
            <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive group-hover:text-sht-olive-dark">Lihat Hotel <span class="ml-1" aria-hidden="true">→</span></span>
          </NuxtLink>
          <NuxtLink to="/flights" class="group rounded-2xl border border-sht-stone bg-white p-5 transition-colors hover:border-sht-gold/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
            <span class="text-sm font-semibold text-sht-olive-dark">Penerbangan</span>
            <p class="mt-2 text-sm text-sht-charcoal/65">Lihat pilihan perjalanan udara yang tersedia.</p>
            <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive group-hover:text-sht-olive-dark">Lihat Penerbangan <span class="ml-1" aria-hidden="true">→</span></span>
          </NuxtLink>
          <NuxtLink to="/transportation" class="group rounded-2xl border border-sht-stone bg-white p-5 transition-colors hover:border-sht-gold/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
            <span class="text-sm font-semibold text-sht-olive-dark">Transportasi</span>
            <p class="mt-2 text-sm text-sht-charcoal/65">Atur transfer dan perjalanan selama di Saudi.</p>
            <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive group-hover:text-sht-olive-dark">Lihat Transportasi <span class="ml-1" aria-hidden="true">→</span></span>
          </NuxtLink>
        </div>
      </Container>
    </section>

    <!-- Consultation CTA -->
    <section class="bg-sht-off-white py-14 sm:py-20">
      <Container>
        <div class="rounded-3xl bg-sht-olive px-6 py-10 text-center sm:px-10 sm:py-12">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">BUTUH BANTUAN LAIN?</p>
          <h2 class="mx-auto mt-3 max-w-2xl font-heading text-2xl font-semibold text-sht-off-white sm:text-3xl">Belum Menemukan yang Anda Butuhkan?</h2>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sht-off-white/75">Ceritakan kebutuhan perjalanan Anda, tim kami akan membantu mengecek opsi yang tersedia.</p>
          <AppButton :href="waUrl" variant="gold" size="lg" external class="mt-7">Konsultasikan Kebutuhan</AppButton>
        </div>
      </Container>
    </section>

    <!-- Existing inquiry modal, visual styling harmonized only -->
    <div v-if="inquiryService" class="fixed inset-0 z-50 flex items-end justify-center bg-sht-olive-dark/55 p-4 sm:items-center" role="dialog" aria-modal="true" :aria-label="`Konsultasi ${inquiryService.name}`">
      <div class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-sht-stone bg-sht-off-white p-6 shadow-2xl sm:p-8">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">KONSULTASI LAYANAN</p>
            <h3 class="mt-2 font-heading text-xl font-semibold text-sht-olive-dark">{{ inquiryService.name }}</h3>
            <p class="mt-1 text-sm text-sht-charcoal/60">Tim kami akan menghubungi Anda — gratis, tanpa komitmen.</p>
          </div>
          <button type="button" class="rounded-full p-2 text-sht-charcoal/50 hover:bg-sht-stone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Tutup" @click="closeInquiry">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <div v-if="iDone" class="mt-6 text-center">
          <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sht-gold/20 text-sht-olive">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
          </span>
          <p class="mt-3 font-heading text-lg font-semibold text-sht-olive-dark">Permintaan terkirim!</p>
          <p class="mt-2 text-sm text-sht-charcoal/70">Konsultan kami akan menghubungi Anda. Untuk lebih cepat, lanjutkan via WhatsApp.</p>
          <AppButton :href="iWaUrl" variant="gold" block external class="mt-5">Lanjut via WhatsApp</AppButton>
          <button type="button" class="mt-3 min-h-[40px] w-full rounded-full px-4 text-sm font-semibold text-sht-charcoal/60 hover:text-sht-olive" @click="closeInquiry">Tutup</button>
        </div>

        <form v-else class="mt-5 space-y-4" @submit.prevent="submitInquiry">
          <label class="block text-sm font-semibold text-sht-charcoal">Nama Anda *<input v-model="iForm.name" type="text" autocomplete="name" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: Siti Maryam" /></label>
          <label class="block text-sm font-semibold text-sht-charcoal">Nomor WhatsApp *<input v-model="iForm.whatsapp" type="tel" inputmode="numeric" autocomplete="tel" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: 6281234567890" /></label>
          <label class="block text-sm font-semibold text-sht-charcoal">Email (opsional)<input v-model="iForm.email" type="email" autocomplete="email" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: nama@email.com" /></label>
          <label class="block text-sm font-semibold text-sht-charcoal">Catatan (opsional)<input v-model="iForm.notes" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: keluarga 4 orang, akhir Oktober" /></label>
          <p v-if="iError" class="rounded-xl border border-sht-gold/60 bg-sht-gold/10 px-4 py-2.5 text-sm" role="alert">{{ iError }}</p>
          <AppButton variant="gold" block type="submit" :disabled="iPending">{{ iPending ? 'Mengirim…' : 'Kirim Permintaan' }}</AppButton>
        </form>
      </div>
    </div>
  </div>
</template>
