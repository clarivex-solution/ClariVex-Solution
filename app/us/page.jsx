import HomeContent from '@/components/HomeContent'
import { TestimonialsSchema } from '@/components/JsonLd'
import SetCountryOnMount from '@/components/SetCountryOnMount'
import { siteUrl } from '@/lib/constants'
import { generateCountryMetadata } from '@/lib/countryContent'
import { testimonials } from '@/lib/siteData'

export function generateMetadata() {
  const metadata = generateCountryMetadata('us')
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/us`,
    },
  }
}

export default function USPage() {
  return (
    <>
      <TestimonialsSchema testimonials={testimonials} serviceUrl={`${siteUrl}/us`} />
      <SetCountryOnMount code="us">
        <HomeContent />
      </SetCountryOnMount>
    </>
  )
}
