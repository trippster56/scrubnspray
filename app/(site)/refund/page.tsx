import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RefundForm from "@/components/RefundForm";
import { PhoneIcon, MailIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Refund / Lost Money — Scrub N Spray Car Wash",
  description:
    "Lost money or had a problem at a Scrub N Spray machine? Fill out our quick form and our team will reach out.",
};

const NEEDS: [string, string][] = [
  ["Which location", "The Florence site where it happened."],
  ["Amount lost ($)", "How much the machine took."],
  ["What happened", "A quick description of the issue."],
  ["Your contact info", "Name, address, phone, and email so we can follow up."],
];

export default function Refund() {
  return (
    <>
      <PageHero
        pageKey="refund"
        eyebrow="Refund · Lost money"
        screenLabel="Refund hero"
        title={
          <>
            Lost money or had
            <br />a problem? Let us know.
          </>
        }
        subtitle="Sorry about that. Fill out the quick form and our team will reach out. It takes about two minutes."
      />

      <section className="section">
        <div className="wrap">
          <div className="refund-wrap">
            {/* WHAT YOU'LL NEED */}
            <div data-reveal>
              <div className="need-card">
                <span className="eyebrow">Before you start</span>
                <h2 style={{ marginTop: 14 }}>What you&rsquo;ll need.</h2>
                <p style={{ color: "var(--muted)", marginTop: 10 }}>
                  Have these handy so we can sort it out quickly:
                </p>
                <ul className="need-list">
                  {NEEDS.map(([title, sub], i) => (
                    <li key={title}>
                      <span className="n">{i + 1}</span>
                      <div>
                        <strong>{title}</strong>
                        <span className="sub">{sub}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="backup">
                <p style={{ color: "var(--muted)", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 800, margin: "6px 0 2px" }}>
                  Rather talk to someone?
                </p>
                <a href="tel:+18430000000">
                  <span className="ic">
                    <PhoneIcon />
                  </span>
                  <span>
                    Call us<span className="meta">(843) 000-0000</span>
                  </span>
                </a>
                <a href="mailto:info@scrubnspray.com">
                  <span className="ic">
                    <MailIcon />
                  </span>
                  <span>
                    Email us<span className="meta">info@scrubnspray.com</span>
                  </span>
                </a>
              </div>
            </div>

            {/* CLAIM FORM */}
            <div data-reveal>
              <RefundForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
