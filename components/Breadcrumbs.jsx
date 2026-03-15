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
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="text-sm text-[#8892a4] flex items-center gap-1.5 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.name} className={`flex items-center gap-1 ${isLast ? "min-w-0 flex-1 sm:flex-none" : ""}`}>
                {index > 0 && <span className="text-[#e2e4e9]">/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#1a1a2e]"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="truncate max-w-[200px] sm:max-w-none text-[#5a6478]">{item.name}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
