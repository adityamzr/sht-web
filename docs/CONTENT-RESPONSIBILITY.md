# SHT Content Responsibility

Architecture guideline for public customer content.

| Area | Frontend Static | Backend/Admin |
|---|:---:|:---:|
| Services directory | YES | NO |
| Visa informational page | YES | NO |
| Badal public service entry | YES | NO |
| Guides / Panduan | YES | NO |
| Hotel catalog/pricing | NO | YES |
| Flight catalog/pricing | NO | YES |
| Transportation catalog/pricing | NO | YES |
| Estimator | NO | YES |
| Additional service pricing in Estimator | NO | YES |
| Articles | NO | YES |
| Cerita Jamaah | NO | YES |
| FAQ | NO | YES |
| Lead submission | NO | YES |

## Current status

- `data/services.ts` is the single frontend-owned source for stable public service metadata. It is consumed by `/services` and the customer navbar.
- `/services` and `/services/visa` do not fetch the service catalog; their inquiry forms still submit leads to the backend.
- `useServices()` remains required by `/estimator` for operational and pricing data.
- `/guides` remains frontend-owned static content.
- `sht-admin` currently has no Article, Stories/Testimonial, or FAQ schema/API/admin CRUD.
- `useContent()` and `data/mock/{testimonials,faqs}.ts` remain temporary local fallbacks for existing presentation content.
