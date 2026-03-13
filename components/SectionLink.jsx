"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PENDING_SECTION_KEY = "pendingSection";

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  return true;
}

export default function SectionLink({ href, sectionId, onClick, children, ...props }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented || !sectionId) return;

    event.preventDefault();

    const [targetPathRaw] = href.split("#");
    const targetPath = targetPathRaw || pathname;
    const targetUrl = `${targetPath}#${sectionId}`;

    if (pathname === targetPath && scrollToSection(sectionId)) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${sectionId}`);
      return;
    }

    window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
    router.push(targetUrl);
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
