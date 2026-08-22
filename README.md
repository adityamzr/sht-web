# sht-web

Website publik **Sudut Haramain Tour (SHT)** — Umroh Private, Sesuai Cara Anda.

## Branch Baseline

- **`dev`** = baseline pengembangan aktif (mode interim pre-production, lihat [DEVFLOW.md](./DEVFLOW.md)).
- **`main`** = production, protected — jangan push/merge langsung.

## Tech Stack

- **Nuxt 3** + **TypeScript**
- **Tailwind CSS** (design tokens mengikuti SHT UI Guidance)
- **Pinia** (state bila dibutuhkan, ex: draft estimator)
- Mock data lokal — siap diganti SHT REST API (dari `sht-admin`, Nuxt/Nitro) tanpa mengubah UI

## Struktur Penting

```
components/     UI components (SiteHeader, HotelCard, dsb.)
composables/    Data-access layer (useHotels, useFlights, ...)
data/mock/      Mock data (satu-satunya yang diganti saat API siap)
stores/         Pinia stores
types/          Domain types (Hotel, Flight, Service, ...)
pages/          Route publik (/, /services, /hotels, /flights,
                /transportation, /guides, /estimator)
public/images/  Aset visual lokal
```

## Menjalankan

```bash
npm install
npm run dev    # dev server
npm run build  # validasi build (wajib sebelum commit)
```

## Aturan

- Development flow: baca [DEVFLOW.md](./DEVFLOW.md) (locked).
- Jangan menaruh supplier cost/markup di repo ini — customer hanya melihat selling price.
- Nomor WhatsApp & konfigurasi publik: `runtimeConfig.public` di `nuxt.config.ts`.
