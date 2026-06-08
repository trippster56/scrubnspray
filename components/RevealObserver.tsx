"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds the `.in` class to any `[data-reveal]` element as it scrolls into view,
 * mirroring the IntersectionObserver behavior of the original site.js.
 * Re-runs on each route change so freshly-rendered pages animate in too.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el, i) => {
      el.classList.remove("in");
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 0.08}s`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
