# sht-web

Website publik **Sudut Haramain Tour (SHT)** — Umroh Private, Sesuai Cara Anda.

## Branch Baseline

- **`dev`** = baseline pengembangan aktif (mode interim pre-production, lihat [DEVFLOW.md](./DEVFLOW.md)).
- **`main`** = production, protected — jangan push/merge langsung.

## Tech Stack

- **Nuxt 3** + **TypeScript**
- **Tailwind CSS** (design tokens mengikuti SHT UI Guidance)
- **Pinia** (draft estimator)
- **Data nyata dari backend SHT** (`sht-admin`, REST API `/api/v1`) — M3

## Menjalankan (development lokal)

Backend (`sht-admin`) dulu, dari repo terpisah:

```bash
# repo sht-admin
npm ci
cp .env.example .env        # isi NUXT_DATABASE_URL + NUXT_SESSION_SECRET
npm run db:migrate
npm run db:seed
npm run dev                 # admin UI + API di http://localhost:3001
```

Lalu website ini:

```bash
npm ci
cp .env.example .env        # NUXT_PUBLIC_API_BASE_URL default http://localhost:3001
npm run dev                 # http://localhost:3000
npm run build               # validasi build (wajib sebelum commit)
npm test                    # test estimator calculator + payload + WhatsApp message
```

**Environment (public only):**

| Variabel | Default | Keterangan |
|---|---|---|
| `NUXT_PUBLIC_API_BASE_URL` | `http://localhost:3001` | Base URL backend SHT (production: URL admin yang di-deploy, set di Vercel) |
| `NUXT_PUBLIC_WHATSAPP_NUMBER` | `6281234567890` (PLACEHOLDER) | Nomor WhatsApp resmi — WAJIB diganti sebelum deployment |
| `NUXT_PUBLIC_SITE_URL` | `https://sudutharamain.id` | Domain kanonik |

## Alur M3 (Core MVP end-to-end)

1. Katalog (hotel, penerbangan, transportasi, layanan, kota) dimuat dari backend via composable (seam data-access lama).
2. Trip Builder 13 langkah memakai data nyata; **preview client hanya indikatif**.
3. Submit konsultasi → `POST /api/v1/estimations` (payload = ID + konfigurasi + kontak, **tanpa harga**).
4. Backend memvalidasi ulang, menghitung harga otoritatif per **tanggal perjalanan**, menyimpan snapshot + lead + EST-ID (transaksi atomik).
5. Sukses → WhatsApp terbuka **setelah** persistensi, berisi ringkasan + EST-ID.
6. Service inquiry (tanpa Trip Builder) → `POST /api/v1/leads`.

## Struktur Penting

```
components/     UI components (SiteHeader, HotelCard, estimator/*)
composables/    Data-access layer (useHotels, useFlights, ... → API backend)
utils/          mappers.ts (API → tipe UI), submitPayload.ts, waMessage.ts,
                estimatorCalculator.ts (preview client)
stores/         Pinia stores
types/          Domain types (Hotel, Flight, EstimatorConfiguration, ...)
pages/          /, /services, /hotels, /flights, /transportation, /guides, /estimator
tests/          estimator-calculator, wa-message, submit-payload
```

## Aturan

- Development flow: baca [DEVFLOW.md](./DEVFLOW.md) (locked).
- Jangan menaruh supplier cost/markup di repo ini — customer hanya melihat selling price.
- Harga/total dari client TIDAK dipercaya — backend menghitung ulang saat submit.
- Estimasi bukan harga final — ketersediaan dikonfirmasi tim SHT.
