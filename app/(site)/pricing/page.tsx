import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Bubbles from "@/components/Bubbles";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Pricing — Scrub N Spray Car Wash",
  description:
    "Single-wash prices and Unlimited Club monthly plans at Scrub N Spray. Wash as often as you want for one flat monthly price.",
};

function Tick({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="tick">
        <CheckIcon />
      </span>
      {children}
    </li>
  );
}

export default function Pricing() {
  return (
    <>
      <PageHero
        pageKey="pricing"
        eyebrow="Pricing"
        screenLabel="Pricing hero"
        title={
          <>
            Simple, honest
            <br />
            wash prices.
          </>
        }
        subtitle="Pay per wash, or join the Unlimited Club and wash as often as you want. Sign up at any location."
      />

      {/* SINGLE WASH */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Single wash</span>
            <h2>One-time price per wash.</h2>
          </div>
          <div className="price-table" data-reveal>
            <div className="price-row">
              <span className="name">Express Wash</span>
              <span className="what">Exterior tunnel wash, spot-free rinse, powered dry.</span>
              <span className="amt">$8</span>
            </div>
            <div className="price-row">
              <span className="name">Deluxe Wash</span>
              <span className="what">Express plus wheel cleaner, tire shine, underbody rinse.</span>
              <span className="amt">$14</span>
            </div>
            <div className="price-row">
              <span className="name">Premium Wash</span>
              <span className="what">Deluxe plus ceramic sealant and rain-repellent top coat.</span>
              <span className="amt">$20</span>
            </div>
          </div>
        </div>
      </section>

      {/* UNLIMITED CLUB TIERS */}
      <section className="section foam">
        <div className="wrap">
          <div className="section-head" data-reveal style={{ maxWidth: 680 }}>
            <span className="eyebrow">Unlimited Club · monthly</span>
            <h2>Wash all you want.</h2>
            <p>One flat monthly price, used at all four Florence locations. Cancel anytime.</p>
          </div>
          <div className="tiers">
            <div className="tier" data-reveal>
              <h3>Express Unlimited</h3>
              <div className="amt">
                $20<small>/mo</small>
              </div>
              <p className="sub">Unlimited Express washes</p>
              <ul>
                <Tick>Unlimited Express washes</Tick>
                <Tick>Free vacuums every visit</Tick>
                <Tick>All four locations</Tick>
              </ul>
              <Link className="btn btn-ghost" href="/contact">
                Sign up
              </Link>
            </div>

            <div className="tier feat" data-reveal>
              <span className="badge" style={{ alignSelf: "flex-start", background: "var(--cyan)" }}>
                Most popular
              </span>
              <h3 style={{ marginTop: 14 }}>Deluxe Unlimited</h3>
              <div className="amt">
                $30<small>/mo</small>
              </div>
              <p className="sub">Unlimited Deluxe washes</p>
              <ul>
                <Tick>Everything in Express</Tick>
                <Tick>Wheel cleaner &amp; tire shine</Tick>
                <Tick>Underbody rinse</Tick>
              </ul>
              <Link className="btn btn-accent" href="/contact">
                Sign up
              </Link>
            </div>

            <div className="tier" data-reveal>
              <h3>Premium Unlimited</h3>
              <div className="amt">
                $40<small>/mo</small>
              </div>
              <p className="sub">Unlimited Premium washes</p>
              <ul>
                <Tick>Everything in Deluxe</Tick>
                <Tick>Ceramic sealant</Tick>
                <Tick>Rain-repellent top coat</Tick>
              </ul>
              <Link className="btn btn-ghost" href="/contact">
                Sign up
              </Link>
            </div>
          </div>
          <p data-reveal style={{ textAlign: "center", color: "var(--muted)", fontSize: 14, marginTop: 30 }}>
            Pricing may vary by location. Sign up at any location — online signup coming soon.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta" data-reveal>
            <Bubbles count={10} />
            <h2>Ready to join the club?</h2>
            <p>Sign up at any Scrub N Spray location, or reach out and we&rsquo;ll help you get started.</p>
            <div className="hero-cta">
              <Link className="btn btn-on-dark btn-lg" href="/contact">
                Contact us
              </Link>
              <Link className="btn btn-ghost-dark btn-lg" href="/services">
                See all services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
