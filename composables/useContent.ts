import { mockTestimonials } from '~/data/mock/testimonials'
import { mockFaqs } from '~/data/mock/faqs'
import type { Faq, Testimonial } from '~/types'

/** Data-access layer — konten editorial (testimoni & FAQ). */
export function useContent() {
  const fetchTestimonials = async (): Promise<Testimonial[]> => mockTestimonials
  const fetchFaqs = async (): Promise<Faq[]> => mockFaqs

  return { fetchTestimonials, fetchFaqs }
}
