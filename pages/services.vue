<script setup lang="ts">
import type { Service, ServiceInquiryResult } from '~/types'
import { buildServiceInquiryMessage } from '~/utils/waMessage'

useSeoMeta({
  title: 'Layanan — Sudut Haramain Tour',
  description:
    'Visa umroh, penerbangan, hotel, transportasi, muthowwif, dan layanan tambahan — satu pintu untuk perjalanan Umroh private Anda.',
  ogTitle: 'Layanan — Sudut Haramain Tour',
  ogDescription: 'Semua kebutuhan Umroh private dalam satu tempat.',
})

const { services, pending, error, refresh } = useServices()
const route = useRoute()
const config = useRuntimeConfig()
const { whatsappNumber } = useSiteConfig()
const waUrl = whatsappLink()

// ─── Service Inquiry (Service Buyer — tanpa Trip Builder) ──────────────────
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

// Deep-link dari halaman layanan khusus, tanpa membuat ulang alur inquiry.
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
        <!-- Loading -->
        <div v-if="pending" class="grid gap-5 sm:grid-cols-2">
          <div v-for="n in 4" :key="n" class="h-40 animate-pulse rounded-card bg-neutral-warm" aria-hidden="true" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="rounded-card border border-gold-soft bg-gold-sand/50 p-8 text-center">
          <p class="font-heading text-lg font-semibold">Koneksi terganggu</p>
          <p class="mt-2 text-sm text-neutral-charcoal/70">Kami kesulitan memuat daftar layanan. Silakan coba lagi.</p>
          <AppButton variant="primary" class="mt-4" @click="refresh"> Coba Lagi </AppButton>
        </div>

        <template v-else>
          <div class="grid gap-5 sm:grid-cols-2">
            <div v-for="service in services" :key="service.id" class="flex flex-col gap-3 rounded-card border border-neutral-line bg-white p-6 shadow-card">
              <div>
                <div class="flex h-12 w-12 items-center justify-center rounded-card bg-brand-sky/50 text-brand-green">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6M9 8h6M6 3.5h12A1.5 1.5 0 0 1 19.5 5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z" />
                  </svg>
                </div>
                <h3 class="mt-4 font-heading text-xl font-semibold text-neutral-charcoal">{{ service.name }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-neutral-charcoal/70">{{ service.description }}</p>
                <p class="mt-3 text-sm">
                  <span class="font-heading text-lg font-semibold text-brand-green">{{ formatPrice(service.price) }}</span>
                  <span v-if="service.price !== null" class="text-xs text-neutral-charcoal/60">
                    {{ service.pricingUnit === 'group_session' ? '/sesi' : service.pricingUnit === 'package' ? '/paket' : '/orang' }}
                  </span>
                </p>
              </div>
              <button
                type="button"
                class="mt-auto min-h-[40px] rounded-full border border-brand-green/30 px-4 py-2 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/5"
                @click="openInquiry(service)"
              >
                Konsultasikan Layanan Ini
              </button>
            </div>
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
        </template>
      </Container>
    </section>

    <!-- Modal inquiry layanan -->
    <div v-if="inquiryService" class="fixed inset-0 z-50 flex items-end justify-center bg-neutral-charcoal/50 p-4 sm:items-center" role="dialog" aria-modal="true" :aria-label="`Konsultasi ${inquiryService.name}`">
      <div class="w-full max-w-md rounded-card bg-white p-6 shadow-card-hover sm:p-8">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-heading text-lg font-semibold">Konsultasi {{ inquiryService.name }}</h3>
            <p class="mt-1 text-sm text-neutral-charcoal/60">Tim kami akan menghubungi Anda — gratis, tanpa komitmen.</p>
          </div>
          <button type="button" class="rounded-full p-2 text-neutral-charcoal/50 hover:bg-neutral-warm" aria-label="Tutup" @click="closeInquiry">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <div v-if="iDone" class="mt-6 text-center">
          <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg>
          </span>
          <p class="mt-3 font-heading text-lg font-semibold">Permintaan terkirim!</p>
          <p class="mt-2 text-sm text-neutral-charcoal/70">Konsultan kami akan menghubungi Anda. Untuk lebih cepat, lanjutkan via WhatsApp.</p>
          <AppButton :href="iWaUrl" variant="whatsapp" block external class="mt-5"> Lanjut via WhatsApp </AppButton>
          <button type="button" class="mt-3 min-h-[40px] w-full rounded-full px-4 text-sm font-semibold text-neutral-charcoal/60 hover:text-brand-green" @click="closeInquiry">Tutup</button>
        </div>

        <form v-else class="mt-5 space-y-4" @submit.prevent="submitInquiry">
          <label class="block text-sm font-semibold">Nama Anda *
            <input v-model="iForm.name" type="text" autocomplete="name" class="mt-1.5 min-h-[44px] w-full rounded-card border border-neutral-line px-4 py-2.5 text-sm font-normal focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="cth: Siti Maryam" />
          </label>
          <label class="block text-sm font-semibold">Nomor WhatsApp *
            <input v-model="iForm.whatsapp" type="tel" inputmode="numeric" autocomplete="tel" class="mt-1.5 min-h-[44px] w-full rounded-card border border-neutral-line px-4 py-2.5 text-sm font-normal focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="cth: 6281234567890" />
          </label>
          <label class="block text-sm font-semibold">Email (opsional)
            <input v-model="iForm.email" type="email" autocomplete="email" class="mt-1.5 min-h-[44px] w-full rounded-card border border-neutral-line px-4 py-2.5 text-sm font-normal focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="cth: nama@email.com" />
          </label>
          <label class="block text-sm font-semibold">Catatan (opsional)
            <input v-model="iForm.notes" type="text" class="mt-1.5 min-h-[44px] w-full rounded-card border border-neutral-line px-4 py-2.5 text-sm font-normal focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" placeholder="cth: keluarga 4 orang, akhir Oktober" />
          </label>
          <p v-if="iError" class="rounded-card border border-gold-soft bg-gold-sand/50 px-4 py-2.5 text-sm" role="alert">{{ iError }}</p>
          <AppButton variant="primary" block type="submit" :disabled="iPending">
            {{ iPending ? 'Mengirim…' : 'Kirim Permintaan' }}
          </AppButton>
        </form>
      </div>
    </div>

    <CtaSection class="pb-14 sm:pb-20" />
  </div>
</template>
