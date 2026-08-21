import { defineStore } from 'pinia'
import type { EstimatorDraft } from '~/types'

/**
 * Draft konfigurasi perjalanan (Phase 1: shell estimator).
 * Phase 2: store ini menampung full trip configuration multi-step,
 * lalu dikirim ke backend untuk kalkulasi (backend = source of truth).
 */
export const useEstimatorStore = defineStore('estimator', {
  state: (): { draft: EstimatorDraft } => ({
    draft: {
      pilgrims: 4,
      departureCity: 'Jakarta',
      durationDays: 9,
      makkahNights: 5,
      madinahNights: 3,
    },
  }),
  actions: {
    setDraft(partial: Partial<EstimatorDraft>) {
      Object.assign(this.draft, partial)
    },
    reset() {
      this.draft = {
        pilgrims: 4,
        departureCity: 'Jakarta',
        durationDays: 9,
        makkahNights: 5,
        madinahNights: 3,
      }
    },
  },
})
