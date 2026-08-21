import { mockHotels } from '~/data/mock/hotels'
import type { Hotel } from '~/types'

/**
 * Data-access layer — HOTEL.
 * UI TIDAK mengimpor mock langsung; cukup memanggil composable ini.
 * Phase berikutnya: ganti isi fungsi dengan `await $fetch('/api/hotels')`
 * tanpa menyentuh satu pun komponen UI.
 */
export function useHotels() {
  // Simulasi async boundary seperti pemanggilan API sungguhan.
  const fetchHotels = async (): Promise<Hotel[]> => mockHotels.filter((h) => h.status === 'active')

  const fetchFeaturedHotels = async (limit = 3): Promise<Hotel[]> =>
    (await fetchHotels()).slice(0, limit)

  return { fetchHotels, fetchFeaturedHotels }
}
