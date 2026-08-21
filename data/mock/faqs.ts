import type { Faq } from '~/types'

/** MOCK DATA — pertanyaan yang sering diajukan. */
export const mockFaqs: Faq[] = [
  {
    id: 'FAQ-001',
    question: 'Apa bedanya Umroh Private dengan paket umroh biasa?',
    answer:
      'Pada paket biasa, Anda mengikuti jadwal rombongan yang sudah ditetapkan. Dengan Umroh Private, Anda menentukan sendiri tanggal, durasi, hotel, dan ritme perjalanan — kami yang menyiapkan seluruh kebutuhannya: visa, tiket, hotel, transportasi, hingga pendamping.',
  },
  {
    id: 'FAQ-002',
    question: 'Berapa minimal jumlah jamaah untuk Umroh Private?',
    answer:
      'Tidak ada minimal. Anda bisa berangkat sendiri, berdua dengan pasangan, atau bersama keluarga besar. Semakin banyak jamaah dalam satu rencana, beberapa biaya seperti transportasi bisa lebih efisien.',
  },
  {
    id: 'FAQ-003',
    question: 'Apakah estimasi biaya di website adalah harga final?',
    answer:
      'Belum. Estimasi adalah gambaran biaya yang sangat mendekati berdasarkan data terkini. Harga final dan ketersediaan (availability) akan dikonfirmasi oleh tim konsultan kami setelah Anda mengirimkan rencana perjalanan.',
  },
  {
    id: 'FAQ-004',
    question: 'Saya sudah punya visa umroh, apakah biaya visa tetap dihitung?',
    answer:
      'Tidak. Jika Anda sudah memiliki visa, cukup beri tahu kami — komponen visa otomatis tidak masuk ke dalam estimasi Anda.',
  },
  {
    id: 'FAQ-005',
    question: 'Apakah bisa berangkat dari kota selain Jakarta?',
    answer:
      'Bisa. Saat ini keberangkatan utama tersedia dari Jakarta dan Bandung, dengan penerbangan internasional melalui CGK. Pilihan kota keberangkatan dapat memengaruhi estimasi biaya.',
  },
  {
    id: 'FAQ-006',
    question: 'Bagaimana kelanjutannya setelah saya menghitung estimasi?',
    answer:
      'Setelah estimasi selesai, Anda bisa mengirimkannya ke konsultan kami melalui WhatsApp lengkap dengan ringkasan konfigurasi perjalanan. Konsultan kami — manusia, bukan bot — akan membantu menyesuaikan hingga rencana Anda matang.',
  },
]
