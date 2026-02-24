import { BreadcrumbSchema } from "@/components/JsonLd";
import Link from "next/link";

/**
 * Visible breadcrumbs + BreadcrumbList JSON-LD schema.
 * @param {Array} items - [{name, href}] breadcrumb trail. Last item has no href.
 */
export default function Breadcrumbs({ items }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="text-sm text-[#5a6478]">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={item.name} className="flex items-center gap-1">
              {i > 0 && <span className="mx-1 text-[#e2e4e9]">/</span>}
              {item.href && i < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#1a1a2e]"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-[#1a1a2e] font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
