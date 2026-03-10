import HomeContent from '@/components/HomeContent'
import { TestimonialsSchema } from '@/components/JsonLd'
import SetCountryOnMount from '@/components/SetCountryOnMount'
import { siteUrl } from '@/lib/constants'
import { generateCountryMetadata } from '@/lib/countryContent'
import { testimonials } from '@/lib/siteData'

export function generateMetadata() {
  const metadata = generateCountryMetadata('uk')
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `${siteUrl}/uk`,
    },
  }
}

export default function UKPage() {
  return (
    <>
      <TestimonialsSchema testimonials={testimonials} serviceUrl={`${siteUrl}/uk`} />
      <SetCountryOnMount code="uk">
        <HomeContent />
      </SetCountryOnMount>
    </>
  )
}
