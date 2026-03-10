import HomeContent from '@/components/HomeContent'
import { TestimonialsSchema } from '@/components/JsonLd'
import { siteUrl } from '@/lib/constants'
import { generateCountryMetadata } from '@/lib/countryContent'
import { testimonials } from '@/lib/siteData'

export function generateMetadata() {
  return generateCountryMetadata('general')
}

export default function Home() {
  return (
    <>
      <TestimonialsSchema testimonials={testimonials} serviceUrl={siteUrl} />
      <HomeContent />
    </>
  )
}
