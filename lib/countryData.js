export const countries = [
  {
    code: 'us',
    flag: '🇺🇸',
    name: 'United States',
    label: 'US',
    href: '/us',
    geo: ['US'],
  },
  {
    code: 'uk',
    flag: '🇬🇧',
    name: 'United Kingdom',
    label: 'UK',
    href: '/uk',
    geo: ['GB', 'IE'],
  },
  {
    code: 'au',
    flag: '🇦🇺',
    name: 'Australia',
    label: 'AU',
    href: '/au',
    geo: ['AU', 'NZ'],
  },
  {
    code: 'ca',
    flag: '🇨🇦',
    name: 'Canada',
    label: 'CA',
    href: '/ca',
    geo: ['CA'],
  },
]

export const geoToCountry = {
  US: 'us', CA: 'ca',
  GB: 'uk', IE: 'uk',
  AU: 'au', NZ: 'au',
}
