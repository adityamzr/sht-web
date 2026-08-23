<script setup lang="ts">
import type { Service, ServiceInquiryResult } from '~/types'
import { buildServiceInquiryMessage } from '~/utils/waMessage'

useSeoMeta({
  title: 'Layanan Umroh Mandiri — Sudut Haramain',
  description: 'Pilih layanan Umroh sesuai kebutuhan Anda, mulai dari visa, pendampingan, hingga kebutuhan perjalanan lainnya bersama Sudut Haramain.',
  ogTitle: 'Layanan Umroh Mandiri — Sudut Haramain',
  ogDescription: 'Pilih bantuan Umroh sesuai rencana dan kebutuhan perjalanan Anda.',
})

const { services, pending, error, refresh } = useServices()
const route = useRoute()
const config = useRuntimeConfig()
const { whatsappNumber } = useSiteConfig()
const waUrl = whatsappLink()

type DirectoryItem = {
  id: string
  name: string
  description: string
  icon: 'visa' | 'badal' | 'hotel' | 'flight' | 'transport' | 'guide' | 'handling' | 'kit'
  to?: string
  service?: Service
}

const directoryItems = computed<DirectoryItem[]>(() => {
  const byCode = (code: string) => services.value.find((service) => service.code?.toLowerCase() === code)
  const visa = byCode('visa') ?? services.value.find((service) => service.name.toLowerCase().includes('visa'))
  const muthawwif = services.value.find((service) => `${service.code ?? ''} ${service.name}`.toLowerCase().includes('muth'))
  const handling = services.value.find((service) => `${service.code ?? ''} ${service.name}`.toLowerCase().includes('handling'))
  const known = new Set([visa?.id, muthawwif?.id, handling?.id])
  const otherServices = services.value.filter((service) => !known.has(service.id))

  return [
    visa && { id: visa.id, name: visa.name, description: visa.description, icon: 'visa' as const, to: '/services/visa', service: visa },
    { id: 'badal-umroh', name: 'Badal Umroh', description: 'Bantuan pengurusan Badal Umroh sesuai kebutuhan keluarga Anda.', icon: 'badal' as const },
    { id: 'hotel', name: 'Hotel', description: 'Cari akomodasi di Makkah dan Madinah.', icon: 'hotel' as const, to: '/hotels' },
    { id: 'flight', name: 'Penerbangan', description: 'Lihat pilihan perjalanan udara yang tersedia.', icon: 'flight' as const, to: '/flights' },
    { id: 'transport', name: 'Transportasi', description: 'Atur transfer dan perjalanan selama di Saudi.', icon: 'transport' as const, to: '/transportation' },
    muthawwif && { id: muthawwif.id, name: muthawwif.name, description: muthawwif.description, icon: 'guide' as const, service: muthawwif },
    handling && { id: handling.id, name: handling.name, description: handling.description, icon: 'handling' as const, service: handling },
    ...otherServices.map((service) => ({ id: service.id, name: service.name, description: service.description, icon: 'kit' as const, service })),
  ].filter(Boolean) as DirectoryItem[]
})

function pricingUnitLabel(service: Service) {
  if (service.pricingUnit === 'group_session') return 'per sesi'
  if (service.pricingUnit === 'package') return 'per paket'
  return 'per jamaah'
}

const inquiryService = ref<Service | null>(null)
const inquiryTitle = ref('')
const iForm = reactive({ name: '', whatsapp: '', email: '', notes: '' })
const iError = ref<string | null>(null)
const iPending = ref(false)
const iDone = ref<ServiceInquiryResult | null>(null)

function openInquiry(service: Service, title = service.name) {
  inquiryService.value = service
  inquiryTitle.value = title
  iDone.value = null
  iError.value = null
  Object.assign(iForm, { name: '', whatsapp: '', email: '', notes: '' })
}

function openBadalInquiry() {
  openInquiry({ id: 'badal-umroh', code: 'badal', name: 'Badal Umroh', description: '', price: null, pricingUnit: 'pax', image: '', status: 'active' }, 'Badal Umroh')
}

function closeInquiry() {
  inquiryService.value = null
  inquiryTitle.value = ''
  iDone.value = null
}

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
    const serviceId = inquiryService.value && /^\d+$/.test(inquiryService.value.id) ? Number(inquiryService.value.id) : null
    const res = await $fetch<{ data: ServiceInquiryResult }>(`${config.public.apiBaseUrl}/api/v1/leads`, {
      method: 'POST',
      body: { serviceId, name, whatsapp, email: iForm.email.trim() || null, notes: iForm.notes.trim() || null },
    })
    iDone.value = res.data
  } catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string } }
    iError.value = e.data?.statusMessage ?? 'Terjadi kendala saat mengirim. Silakan coba lagi.'
  } finally {
    iPending.value = false
  }
}

const iWaUrl = computed(() => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildServiceInquiryMessage(iForm.name.trim(), inquiryService.value))}`)
</script>

<template>
  <div class="bg-sht-off-white">
    <section class="border-b border-sht-stone/70 py-14 sm:py-20">
      <Container>
        <div class="max-w-3xl">
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />LAYANAN SUDUT HARAMAIN</p>
          <h1 class="mt-4 max-w-2xl font-heading text-3xl font-semibold leading-tight text-sht-olive-dark text-balance sm:text-5xl">Pilih Bantuan yang Anda Perlukan.</h1>
          <p class="mt-5 max-w-2xl text-base leading-relaxed text-sht-charcoal/75 sm:text-lg">Temukan kebutuhan perjalanan dan pendampingan Umroh dalam satu tempat, lalu pilih layanan yang sesuai dengan rencana Anda.</p>
          <p class="mt-4 text-sm font-medium text-sht-olive">Anda tidak harus menggunakan semuanya sekaligus.</p>
        </div>
        <div v-if="pending" class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><div v-for="n in 6" :key="n" class="h-56 animate-pulse rounded-2xl bg-sht-stone/60" aria-hidden="true" /></div>
        <div v-else-if="error" class="mt-10 rounded-2xl border border-sht-stone bg-white p-8 text-center"><p class="text-sm text-sht-charcoal/70">Kami kesulitan memuat layanan. Silakan coba lagi.</p><AppButton variant="gold" class="mt-4" @click="refresh">Coba Lagi</AppButton></div>
        <div v-else class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="item in directoryItems" :key="item.id" class="flex flex-col rounded-2xl border border-sht-stone bg-white p-6 shadow-[0_8px_24px_-20px_rgba(45,53,31,0.45)]">
            <div class="flex items-start justify-between gap-4"><div class="flex h-12 w-12 items-center justify-center rounded-xl bg-sht-gold/15 text-sht-olive" aria-hidden="true">
              <svg v-if="item.icon === 'visa'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M7 3.5h7l3 3V20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z"/><path stroke-linecap="round" d="M14 3.5V7h3M8.5 12h5M8.5 15h3"/></svg>
              <svg v-else-if="item.icon === 'badal'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M20 8.5c0 5-8 10-8 10s-8-5-8-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z"/><path stroke-linecap="round" d="M12 9v4M10 11h4"/></svg>
              <svg v-else-if="item.icon === 'hotel'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m-12 0h16m-16 0v-4h4m8 0v-6h4a2 2 0 0 1 2 2v8M8.5 7h1m3 0h1m-5 4h1m3 0h1"/></svg>
              <svg v-else-if="item.icon === 'flight'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="m10.5 13.5-7.5-2.5 1.5-1.5L11 10l4.5-4.5a2.1 2.1 0 0 1 3 3L14 13l.5 6.5L13 21l-2.5-7.5Z"/></svg>
              <svg v-else-if="item.icon === 'transport'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M5 17h14M6.5 17l1.3-5.2A2 2 0 0 1 9.74 10.3h4.52a2 2 0 0 1 1.94 1.5L17.5 17m-10 0a2 2 0 1 0 4 0m2 0a2 2 0 1 0 4 0M7 13.5h10"/></svg>
              <svg v-else-if="item.icon === 'guide'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8.5"/><path stroke-linecap="round" d="M12 7v5l3.5 2M4.5 12H2.8M21.2 12h-1.7"/></svg>
              <svg v-else-if="item.icon === 'handling'" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linecap="round" stroke-linejoin="round" d="M6 8h12l1 12H5L6 8Z"/><path stroke-linecap="round" d="M9 8V6a3 3 0 0 1 6 0v2M8 13h8M12 10v6"/></svg>
              <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path stroke-linejoin="round" d="m7 7 5-3 5 3v7l-5 3-5-3V7Z"/><path stroke-linecap="round" d="m7 7 5 3 5-3M12 10v7M5 18.5l7 3 7-3"/></svg>
            </div><span v-if="item.service?.price !== undefined" class="text-xs font-semibold uppercase tracking-[0.12em] text-sht-sage">{{ item.service.price === null ? 'Harga dikonfirmasi' : 'Tersedia' }}</span></div>
            <h3 class="mt-5 font-heading text-xl font-semibold text-sht-olive-dark">{{ item.name }}</h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-sht-charcoal/70">{{ item.description }}</p>
            <div v-if="item.service?.price !== null && item.service" class="mt-4 flex items-baseline gap-1.5"><span class="font-heading text-lg font-semibold text-sht-olive-dark">{{ formatPrice(item.service.price) }}</span><span class="text-xs text-sht-charcoal/55">{{ pricingUnitLabel(item.service) }}</span></div>
            <div class="mt-5"><NuxtLink v-if="item.to" :to="item.to" class="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-sht-olive px-5 py-3 text-sm font-semibold text-sht-off-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Lihat Detail <span aria-hidden="true">→</span></NuxtLink><button v-else type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-5 py-3 text-sm font-semibold text-sht-olive transition-colors hover:bg-sht-olive/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="item.id === 'badal-umroh' ? openBadalInquiry() : item.service && openInquiry(item.service)">Konsultasikan <span aria-hidden="true">→</span></button></div>
          </article>
        </div>
      </Container>
    </section>

    <section class="bg-sht-stone/25 py-14 sm:py-16"><Container><div class="rounded-3xl bg-sht-olive px-6 py-10 text-center sm:px-10 sm:py-12"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">BUTUH BANTUAN LAIN?</p><h2 class="mx-auto mt-3 max-w-2xl font-heading text-2xl font-semibold text-sht-off-white sm:text-3xl">Belum Menemukan yang Anda Butuhkan?</h2><p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sht-off-white/75">Ceritakan kebutuhan perjalanan Anda, tim kami akan membantu mengecek opsi yang tersedia.</p><AppButton :href="waUrl" variant="gold" size="lg" external class="mt-7">Konsultasikan Kebutuhan</AppButton></div></Container></section>

    <div v-if="inquiryService" class="fixed inset-0 z-50 flex items-end justify-center bg-sht-olive-dark/55 p-4 sm:items-center" role="dialog" aria-modal="true" :aria-label="`Konsultasi ${inquiryTitle}`"><div class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-sht-stone bg-sht-off-white p-6 shadow-2xl sm:p-8"><div class="flex items-start justify-between gap-3"><div><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">KONSULTASI LAYANAN</p><h3 class="mt-2 font-heading text-xl font-semibold text-sht-olive-dark">{{ inquiryTitle }}</h3><p class="mt-1 text-sm text-sht-charcoal/60">Tim kami akan menghubungi Anda — gratis, tanpa komitmen.</p></div><button type="button" class="rounded-full p-2 text-sht-charcoal/50 hover:bg-sht-stone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Tutup" @click="closeInquiry"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg></button></div>
      <div v-if="iDone" class="mt-6 text-center"><span class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sht-gold/20 text-sht-olive"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m5 13 4 4L19 7"/></svg></span><p class="mt-3 font-heading text-lg font-semibold text-sht-olive-dark">Permintaan terkirim!</p><p class="mt-2 text-sm text-sht-charcoal/70">Konsultan kami akan menghubungi Anda. Untuk lebih cepat, lanjutkan via WhatsApp.</p><AppButton :href="iWaUrl" variant="gold" block external class="mt-5">Lanjut via WhatsApp</AppButton><button type="button" class="mt-3 min-h-[40px] w-full rounded-full px-4 text-sm font-semibold text-sht-charcoal/60 hover:text-sht-olive" @click="closeInquiry">Tutup</button></div>
      <form v-else class="mt-5 space-y-4" @submit.prevent="submitInquiry"><label class="block text-sm font-semibold text-sht-charcoal">Nama Anda *<input v-model="iForm.name" type="text" autocomplete="name" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: Siti Maryam" /></label><label class="block text-sm font-semibold text-sht-charcoal">Nomor WhatsApp *<input v-model="iForm.whatsapp" type="tel" inputmode="numeric" autocomplete="tel" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: 6281234567890" /></label><label class="block text-sm font-semibold text-sht-charcoal">Email (opsional)<input v-model="iForm.email" type="email" autocomplete="email" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: nama@email.com" /></label><label class="block text-sm font-semibold text-sht-charcoal">Catatan (opsional)<input v-model="iForm.notes" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-4 py-2.5 text-sm font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" placeholder="cth: keluarga 4 orang, akhir Oktober" /></label><p v-if="iError" class="rounded-xl border border-sht-gold/60 bg-sht-gold/10 px-4 py-2.5 text-sm" role="alert">{{ iError }}</p><AppButton variant="gold" block type="submit" :disabled="iPending">{{ iPending ? 'Mengirim…' : 'Kirim Permintaan' }}</AppButton></form>
    </div></div>
  </div>
</template>
