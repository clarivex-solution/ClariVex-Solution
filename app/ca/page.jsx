import HomeContent from '@/components/HomeContent'
import { TestimonialsSchema } from '@/components/JsonLd'
import SetCountryOnMount from '@/components/SetCountryOnMount'
import { siteUrl } from '@/lib/constants'
import { generateCountryMetadata } from '@/lib/countryContent'
import { testimonials } from '@/lib/siteData'

export function generateMetadata() {
  const metadata = generateCountryMetadata('ca')
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/ca`,
    },
  }
}

export default function CAPage() {
  return (
    <>
      <TestimonialsSchema testimonials={testimonials} serviceUrl={`${siteUrl}/ca`} />
      <SetCountryOnMount code="ca">
        <HomeContent />
      </SetCountryOnMount>
    </>
  )
}
