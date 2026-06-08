import Link from "next/link";
import Image from "next/image";
import { NAV } from "./nav-data";
import { FacebookIcon, InstagramIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Image src="/assets/wordmark.png" alt="Scrub N Spray" width={200} height={56} style={{ height: 56, width: "auto" }} />
          <p>
            Four express car washes across Florence. Pull up, pick your wash, and you&rsquo;re back on
            the road in minutes — windows down, free vacuums included.
          </p>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <p style={{ color: "#b9d3ee", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
            4 locations across Florence
            <br />
            Mon–Sun · 8am–8pm
            <br />
            (843) 000-0000
          </p>
        </div>
        <div className="footer-col">
          <h4>Pages</h4>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <Link href="/refund">Refund</Link>
          <a href="#" style={{ opacity: 0.6 }}>
            Careers — coming soon
          </a>
        </div>
        <div className="footer-col">
          <h4>Follow along</h4>
          <div className="social-row" style={{ marginBottom: 14 }}>
            <a href="#" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
          <a href="#">Newsletter ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} Scrub N Spray · Car Wash</span>
        <span>Florence &nbsp;·&nbsp; A faster, cleaner wash.</span>
      </div>
    </footer>
  );
}
