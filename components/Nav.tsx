"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV } from "./nav-data";
import { BurgerIcon } from "./icons";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-logo" href="/" aria-label="Scrub N Spray home">
          <Image src="/brand/scrubnspraytext.png" alt="Scrub N Spray Car Wash" width={180} height={50} priority style={{ height: 50, width: "auto" }} />
        </Link>
        <div className="nav-links">
          {NAV.map((n) => (
            <Link key={n.href} className={`nav-link${isActive(n.href) ? " active" : ""}`} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="nav-cta">
          <Link className="btn btn-accent" href="/refund">
            Lost money? File a claim
          </Link>
          <button
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <BurgerIcon />
          </button>
        </div>
      </div>
      <div className={`nav-mobile${open ? " open" : ""}`}>
        {NAV.map((n) => (
          <Link
            key={n.href}
            className={`nav-link${isActive(n.href) ? " active" : ""}`}
            href={n.href}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </Link>
        ))}
        <Link className="btn btn-accent" href="/refund" onClick={() => setOpen(false)}>
          Lost money? File a claim
        </Link>
      </div>
    </nav>
  );
}
