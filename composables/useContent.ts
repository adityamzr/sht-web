import { mockTestimonials } from '~/data/mock/testimonials'
import { mockFaqs } from '~/data/mock/faqs'
import type { Faq, Testimonial } from '~/types'

/** TEMPORARY local fallback — editorial content is future admin-managed data. */
export function useContent() {
  const fetchTestimonials = async (): Promise<Testimonial[]> => mockTestimonials
  const fetchFaqs = async (): Promise<Faq[]> => mockFaqs

  return { fetchTestimonials, fetchFaqs }
}
