# SHT Brand Colors — Official Guideline (M4A.1.1)

Sumber kebenaran palet: **logo resmi Sudut Haramain Tour** (`public/images/logo-sudut-haramain.png`, versi ikon: `public/favicon.png`).
Implementasi token: `tailwind.config.ts` → namespace **`sht.*`**.

## Official Core Palette

| Token | Hex | Peran |
|---|---|---|
| `sht.olive` | `#3A4428` | **brand-primary** — identitas brand, dark surface, overlay hero |
| `sht.olive-dark` | `#2D351F` | **brand-primary-dark** — deep surface, hover gelap, teks di area terang |
| `sht.gold` | `#D3C168` | **brand-accent** — highlight kecil, eyebrow, divider, ikon, CTA di dark surface |
| `sht.sage` | `#7F8968` | **brand-soft** — ikon subtle, border/aksen sekunder |
| `sht.off-white` | `#F6F4ED` | **surface-warm** — kanvas terang utama (bukan putih steril) |
| `sht.stone` | `#E4E3DE` | **surface-muted** — border, divider, separasi halus |
| `sht.charcoal` | `#242822` | **text-primary** — teks utama di area terang |

## Usage Principles

- Proporsi visual ±: **60% warm neutral/off-white · 25% olive · 10% charcoal/text · 5% gold**.
- **Gold = aksen**, bukan warna dominan — jangan membanjiri halaman dengan gold.
- **Olive = identitas brand** — jangan membuat setiap section olive; kanvas harus tetap terang & lega.
- Hindari teal/cyan/neon sebagai warna brand dominan.
- Kontras & aksesibilitas selalu diutamakan; penyesuaian tonal kecil dalam keluarga warna yang sama diperbolehkan.

## Legacy Tokens (DEPRECATED untuk pekerjaan baru)

Token lama (`brand.sky/sky-deep/teal/green`, `gold`, `neutral.*`, gradient `bg-sky-gradient`/`bg-kabah-gradient`) adalah asumsi desain sebelum logo resmi. **Dipertahankan** agar halaman yang belum dimigrasi (hotels, flights, services, estimator, admin, dsb.) tidak rusak — masing-masing akan dimigrasi ke `sht.*` di task M4A-nya sendiri. Jangan pakai token legacy untuk UI baru.

## Asset Brand

| File | Kegunaan |
|---|---|
| `public/favicon.png` | Favicon situs (logo ikon resmi) |
| `public/images/logo-sudut-haramain.png` | Logo utama — penempatan di navbar dikerjakan di task Navigation (M4A) tersendiri; jangan dipasang di header sebelum task itu |

Aturan aset: pertahankan proporsi asli, jangan gambar ulang/ubah warna/crop elemen penting logo.
