const HEADING_REGEX = /<(h2)([^>]*)>([\s\S]*?)<\/\1>/gi
const ID_ATTRIBUTE_REGEX = /\sid=(['"])(.*?)\1/i

function stripTags(value) {
  return value.replace(/<[^>]*>/g, ' ')
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
}

export function slugifyHeading(value) {
  const slug = decodeHtmlEntities(stripTags(String(value || '')))
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return slug || 'section'
}

function createUniqueId(baseId, seenIds) {
  const currentCount = seenIds.get(baseId) || 0
  const nextCount = currentCount + 1
  seenIds.set(baseId, nextCount)
  return nextCount === 1 ? baseId : `${baseId}-${nextCount}`
}

function getExistingId(attributes) {
  const match = attributes.match(ID_ATTRIBUTE_REGEX)
  return match?.[2] || ''
}

export function extractHeadings(html) {
  const headings = []
  const seenIds = new Map()
  let match

  while ((match = HEADING_REGEX.exec(String(html || '')))) {
    const [, level, attributes, headingHtml] = match
    const text = decodeHtmlEntities(stripTags(headingHtml)).replace(/\s+/g, ' ').trim()

    if (!text) {
      continue
    }

    const existingId = getExistingId(attributes)
    const id = existingId || createUniqueId(slugifyHeading(text), seenIds)

    if (existingId) {
      seenIds.set(existingId, (seenIds.get(existingId) || 0) + 1)
    }

    headings.push({
      level: level.toLowerCase(),
      text,
      id,
    })
  }

  return headings
}

export function injectHeadingIds(html) {
  const seenIds = new Map()

  return String(html || '').replace(HEADING_REGEX, (fullMatch, level, attributes, headingHtml) => {
    const text = decodeHtmlEntities(stripTags(headingHtml)).replace(/\s+/g, ' ').trim()

    if (!text) {
      return fullMatch
    }

    const existingId = getExistingId(attributes)

    if (existingId) {
      seenIds.set(existingId, (seenIds.get(existingId) || 0) + 1)
      return fullMatch
    }

    const id = createUniqueId(slugifyHeading(text), seenIds)

    return `<${level}${attributes} id="${id}">${headingHtml}</${level}>`
  })
}

