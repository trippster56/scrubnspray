import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { PhoneIcon, MailIcon, ClockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact — Scrub N Spray Car Wash",
  description:
    "Get in touch with Scrub N Spray. Questions about washes, the Unlimited Club, or our four Florence locations? Send us a message.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        pageKey="contact"
        eyebrow="Contact"
        screenLabel="Contact hero"
        title="Get in touch."
        subtitle="Questions about a wash, the Unlimited Club, or one of our four Florence locations? Send a message — we'll get right back to you."
      />

      <section className="section">
        <div className="wrap">
          <div className="contact-wrap">
            {/* FORM */}
            <ContactForm />

            {/* INFO */}
            <div data-reveal>
              <div className="info-card">
                <h3>Reach us directly</h3>
                <ul className="info-list">
                  <li>
                    <span className="ic">
                      <PhoneIcon />
                    </span>
                    <div>
                      <strong>Phone</strong>
                      <a href="tel:+18430000000">(843) 000-0000</a>
                    </div>
                  </li>
                  <li>
                    <span className="ic">
                      <MailIcon />
                    </span>
                    <div>
                      <strong>Email</strong>
                      <a href="mailto:info@scrubnspray.com">info@scrubnspray.com</a>
                    </div>
                  </li>
                  <li>
                    <span className="ic">
                      <ClockIcon />
                    </span>
                    <div>
                      <strong>Hours</strong>
                      <span className="v">Mon–Sun · 8am–8pm</span>
                    </div>
                  </li>
                </ul>
                <p style={{ color: "#bcd6f2", fontSize: 14, marginTop: 24 }}>
                  Lost money at a machine?{" "}
                  <Link href="/refund" style={{ color: "var(--cyan)", fontWeight: 800 }}>
                    File a claim →
                  </Link>
                </p>
              </div>

              <div className="loc-mini">
                {["Location One", "Location Two", "Location Three", "Location Four"].map((name) => (
                  <a key={name} href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                    <strong>{name}</strong>
                    <span>Florence · open daily</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP STRIP */}
      <section className="section foam" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ph" data-label="google map embed — 4 Florence locations" style={{ height: 340 }} data-reveal />
        </div>
      </section>
    </>
  );
}
