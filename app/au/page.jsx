import HomeContent from '@/components/HomeContent'
import { TestimonialsSchema } from '@/components/JsonLd'
import SetCountryOnMount from '@/components/SetCountryOnMount'
import { siteUrl } from '@/lib/constants'
import { generateCountryMetadata } from '@/lib/countryContent'
import { testimonials } from '@/lib/siteData'

export function generateMetadata() {
  const metadata = generateCountryMetadata('au')
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/au`,
    },
  }
}

export default function AUPage() {
  return (
    <>
      <TestimonialsSchema testimonials={testimonials} serviceUrl={`${siteUrl}/au`} />
      <SetCountryOnMount code="au">
        <HomeContent />
      </SetCountryOnMount>
    </>
  )
}
