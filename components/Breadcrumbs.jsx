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
      <nav aria-label="Breadcrumb" className="min-w-0 text-sm text-[#8892a4]">
        <ol className="flex items-center gap-1 min-w-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.name} className={`flex items-center gap-1 ${isLast ? "min-w-0 flex-1 sm:flex-none" : ""}`}>
                {index > 0 && <span className="mx-1 text-[#e2e4e9]">/</span>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[#1a1a2e]"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="max-w-[12rem] truncate text-[#1a1a2e] font-medium sm:max-w-none">{item.name}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
