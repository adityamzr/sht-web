import type { Testimonial } from '~/types'

/** MOCK DATA — cerita jamaah. */
export const mockTestimonials: Testimonial[] = [
  {
    id: 'TST-001',
    name: 'Keluarga H. Rahmat',
    origin: 'Bandung',
    quote:
      'Baru kali ini umroh bareng keluarga besar tanpa ribet. Jadwal kami sendiri yang atur, tim Sudut Haramain yang siapkan semuanya. Anak-anak nyaman, orang tua tenang.',
    tripType: 'Umroh Keluarga · 12 hari',
  },
  {
    id: 'TST-002',
    name: 'Ibu Siti Maryam',
    origin: 'Jakarta',
    quote:
      'Awalnya ragu umroh tanpa rombongan besar. Ternyata dengan pendamping yang sabar, ibadah jadi jauh lebih khusyuk. Hotelnya dekat sekali dengan Masjidil Haram.',
    tripType: 'Umroh Private · 9 hari',
  },
  {
    id: 'TST-003',
    name: 'Bapak Fajar & Istri',
    origin: 'Depok',
    quote:
      'Estimasi biayanya jelas sejak awal, tidak ada biaya siluman. Dari visa sampai mobil jemputan di Jeddah, semua sesuai rencana. Insya Allah berangkat lagi.',
    tripType: 'Umroh Bulan Madu · 10 hari',
  },
]
