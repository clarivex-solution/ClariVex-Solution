const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "a",
  "ul",
  "ol",
  "li",
  "strong",
  "em",
  "b",
  "i",
  "br",
  "blockquote",
  "code",
  "pre",
  "img",
];
const ALLOWED_ATTR = ["href", "src", "alt", "title"];

const ALLOWED_TAGS_PATTERN = ALLOWED_TAGS.join("|");
const TAG_REGEX = new RegExp(
  `<(?!\/?(${ALLOWED_TAGS_PATTERN})(?:\\s|>|\\/))([^>]*)>`,
  "gi",
);
const ATTR_REGEX = /(\w[\w-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*))?/g;

function sanitizeAttrs(tag) {
  return tag.replace(/<(\w[\w-]*)([^>]*)>/gi, (match, tagName, attrs) => {
    if (!ALLOWED_TAGS.includes(tagName.toLowerCase())) return "";
    const safeAttrs = [];
    let m;
    while ((m = ATTR_REGEX.exec(attrs)) !== null) {
      const attrName = m[1].toLowerCase();
      if (ALLOWED_ATTR.includes(attrName)) {
        safeAttrs.push(m[0]);
      }
    }
    return `<${tagName}${safeAttrs.length ? " " + safeAttrs.join(" ") : ""}>`;
  });
}

export function sanitizeBlogHtml(html) {
  if (!html || typeof html !== "string") return "";
  // Strip disallowed tags
  let clean = html.replace(TAG_REGEX, "");
  // Sanitize attributes on allowed tags
  clean = sanitizeAttrs(clean);
  // Strip script/style content
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, "");
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, "");
  return clean.trim();
}
