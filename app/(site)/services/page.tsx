import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CheckIcon, VacuumIcon, MatIcon, RinseIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services — Scrub N Spray Car Wash",
  description:
    "Pick a wash. Express, Deluxe, and Premium tunnel washes plus free self-serve vacuums with every wash at Scrub N Spray in Florence.",
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

export default function Services() {
  return (
    <>
      <PageHero
        pageKey="services"
        eyebrow="Wash menu"
        screenLabel="Services hero"
        title={
          <>
            Pick a wash.
            <br />
            We&rsquo;ll handle the rest.
          </>
        }
        subtitle="Three tunnel washes built for speed and shine — plus free self-serve vacuums with every single one."
      />

      {/* WASH PACKAGES */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Wash packages</span>
            <h2>Three ways to shine.</h2>
          </div>
          <div className="pkg-grid">
            <div className="card pkg" data-reveal>
              <div className="pkg-top">
                <h3>Express Wash</h3>
                <span className="price">$8</span>
              </div>
              <p className="desc">
                A fast exterior tunnel wash. The everyday clean for when you just need to knock off the
                dust.
              </p>
              <ul>
                <Tick>Soft-touch foam &amp; presoak</Tick>
                <Tick>Spot-free rinse</Tick>
                <Tick>Powered dry</Tick>
              </ul>
              <Link className="btn btn-ghost" href="/pricing">
                See pricing
              </Link>
            </div>

            <div className="card pkg" data-reveal>
              <span className="badge tag" style={{ position: "absolute", top: 24, right: 24 }}>
                Most popular
              </span>
              <div className="pkg-top">
                <h3>Deluxe Wash</h3>
                <span className="price">$14</span>
              </div>
              <p className="desc">
                Everything in Express, plus the extras that fight road grime and bring out the shine.
              </p>
              <ul>
                <Tick>Everything in Express</Tick>
                <Tick>Wheel cleaner &amp; tire shine</Tick>
                <Tick>Underbody rinse</Tick>
              </ul>
              <Link className="btn btn-primary" href="/pricing">
                See pricing
              </Link>
            </div>

            <div className="card pkg" data-reveal>
              <span className="badge tag" style={{ position: "absolute", top: 24, right: 24, background: "var(--blue-deep)", color: "#fff" }}>
                Best shine
              </span>
              <div className="pkg-top">
                <h3>Premium Wash</h3>
                <span className="price">$20</span>
              </div>
              <p className="desc">
                Our best clean. Deluxe plus protection that beads water and keeps your car cleaner,
                longer.
              </p>
              <ul>
                <Tick>Everything in Deluxe</Tick>
                <Tick>Ceramic sealant</Tick>
                <Tick>Rain-repellent top coat</Tick>
              </ul>
              <Link className="btn btn-ghost" href="/pricing">
                See pricing
              </Link>
            </div>

            <div className="card pkg" data-reveal>
              <span className="badge tag" style={{ position: "absolute", top: 24, right: 24 }}>
                Best value
              </span>
              <div className="pkg-top">
                <h3>Unlimited Club</h3>
                <span className="price">
                  $30<small>/mo</small>
                </span>
              </div>
              <p className="desc">
                Wash as often as you want for one flat monthly price. Pays for itself in about two
                washes.
              </p>
              <ul>
                <Tick>Unlimited washes, every day</Tick>
                <Tick>Use it at all four locations</Tick>
                <Tick>Cancel anytime, no contract</Tick>
              </ul>
              <Link className="btn btn-accent" href="/pricing">
                Join the club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FREE WITH EVERY WASH */}
      <section className="section foam">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Always included</span>
            <h2>Free with every wash.</h2>
            <p>No upsell, no surprises — these come with any wash you choose.</p>
          </div>
          <div className="incl-grid">
            <div className="card incl" data-reveal>
              <span className="icon-badge">
                <VacuumIcon />
              </span>
              <h3>Self-serve vacuums</h3>
              <p>Pull into a stall and vacuum the inside free of charge — take all the time you need.</p>
            </div>
            <div className="card incl" data-reveal>
              <span className="icon-badge">
                <MatIcon />
              </span>
              <h3>Mat cleaning</h3>
              <p>Floor mat stations to knock out the dirt before you put them back.</p>
            </div>
            <div className="card incl" data-reveal>
              <span className="icon-badge">
                <RinseIcon />
              </span>
              <h3>Spot-free rinse</h3>
              <p>A final purified-water rinse on every wash so your car dries without water spots.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Add-ons</span>
            <h2>A little extra.</h2>
            <p>Add any of these to a single wash at the pay station.</p>
          </div>
          <div className="addon-row" data-reveal>
            {[
              ["Bug prep", "+$2"],
              ["Hot wax", "+$3"],
              ["Tire shine", "+$2"],
              ["Triple foam", "+$2"],
              ["Wheel bright", "+$3"],
              ["Undercarriage flush", "+$3"],
            ].map(([name, price]) => (
              <span className="addon" key={name}>
                {name} <span className="price">{price}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section deep" style={{ textAlign: "center" }}>
        <div className="wrap" data-reveal>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Best value
          </span>
          <h2 style={{ fontSize: "clamp(34px,5vw,58px)", marginTop: 16 }}>
            Wash all you want. One monthly price.
          </h2>
          <p style={{ color: "#bcd6f2", fontSize: 19, maxWidth: 560, margin: "16px auto 0" }}>
            Join the Unlimited Club and never think about your car wash again.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <Link className="btn btn-accent btn-lg" href="/pricing">
              See pricing
            </Link>
            <Link className="btn btn-ghost-dark btn-lg" href="/contact">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
