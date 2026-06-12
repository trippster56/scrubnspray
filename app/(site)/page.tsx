import Link from "next/link";
import HeroStage from "@/components/HeroStage";
import Ticker from "@/components/Ticker";
import Bubbles from "@/components/Bubbles";
import { ArrowRight, BoltIcon, InfinityIcon, PinIcon, CheckIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <HeroStage />
      <Ticker />

      {/* VALUE PROPS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Why Scrub N Spray</span>
            <h2>Clean car, zero hassle.</h2>
          </div>
          <div className="vp">
            <div className="card" data-reveal>
              <span className="icon-badge">
                <BoltIcon />
              </span>
              <h3>Fast express tunnel</h3>
              <p>
                Drive through in under five minutes. No appointment, no waiting room — just a quick,
                powerful clean.
              </p>
            </div>
            <div className="card" data-reveal>
              <span className="icon-badge">
                <InfinityIcon />
              </span>
              <h3>Unlimited plans</h3>
              <p>
                Wash as often as you want for one flat monthly price. Cancel anytime, use it at every
                location.
              </p>
            </div>
            <div className="card" data-reveal>
              <span className="icon-badge">
                <PinIcon />
              </span>
              <h3>4 convenient locations</h3>
              <p>
                Always one near you across Florence, open seven days a week so a wash always fits your
                schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section foam">
        <div className="wrap">
          <div
            className="section-head"
            data-reveal
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "100%", gap: 24, flexWrap: "wrap" }}
          >
            <div style={{ maxWidth: 560 }}>
              <span className="eyebrow">Wash menu</span>
              <h2>Pick a wash. We&rsquo;ll handle the rest.</h2>
            </div>
            <Link className="btn btn-ghost" href="/services">
              View all services <ArrowRight />
            </Link>
          </div>
          <div className="svc-grid">
            <div className="card svc" data-reveal>
              <span className="num">01</span>
              <h3>Express Wash</h3>
              <p>Fast exterior tunnel wash with spot-free rinse and power dry. In and out in minutes.</p>
              <span className="price">From $8</span>
            </div>
            <div className="card svc" data-reveal>
              <span className="badge tag">Most popular</span>
              <span className="num">02</span>
              <h3>Deluxe Wash</h3>
              <p>Everything in Express plus wheel cleaner, tire shine, and underbody rinse.</p>
              <span className="price">$14</span>
            </div>
            <div className="card svc" data-reveal>
              <span className="num">03</span>
              <h3>Premium Wash</h3>
              <p>Deluxe plus ceramic sealant and rain-repellent for a longer-lasting shine.</p>
              <span className="price">$20</span>
            </div>
            <div className="card svc" data-reveal>
              <span className="num">04</span>
              <h3>Free Vacuums</h3>
              <p>Every wash comes with free self-serve vacuums and mat cleaning at all four locations.</p>
              <span className="price">Always free</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section deep">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2>Four steps to a clean car.</h2>
          </div>
          <div className="proc">
            <div className="proc-step" data-reveal>
              <div className="proc-num">1</div>
              <h3>Pull up</h3>
              <p>Drive into any of our four Florence locations — no appointment, no waiting room.</p>
            </div>
            <div className="proc-step" data-reveal>
              <div className="proc-num">2</div>
              <h3>Pick a wash</h3>
              <p>Choose Express, Deluxe, or Premium right at the pay station.</p>
            </div>
            <div className="proc-step" data-reveal>
              <div className="proc-num">3</div>
              <h3>Drive through</h3>
              <p>Stay in your car and let the tunnel do the work — done in minutes.</p>
            </div>
            <div className="proc-step" data-reveal>
              <div className="proc-num">4</div>
              <h3>Free vacuums</h3>
              <p>Pull into a stall and finish the inside with free self-serve vacuums.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="section" id="locations">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Find us</span>
            <h2>Four locations across Florence.</h2>
            <p>Open seven days a week. Tap a location for directions.</p>
          </div>
          <div className="loc-grid">
            {["Location One", "Location Two", "Location Three", "Location Four"].map((name) => (
              <div className="card loc" data-reveal key={name}>
                <div className="ph" data-label="storefront photo" />
                <div className="loc-body">
                  <h3>{name}</h3>
                  <p className="meta">
                    Florence
                    <br />
                    Open daily 8am–8pm
                    <br />
                    Location coming soon
                  </p>
                  <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                    Get directions <ArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="section foam">
        <div className="wrap">
          <div className="club" data-reveal>
            <div>
              <span className="badge">Best value</span>
              <h2 style={{ marginTop: 16 }}>Join the Unlimited Club.</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Wash as often as you want for one flat monthly price. It pays for itself in about two
                washes.
              </p>
              <ul>
                <li>
                  <span className="drop">
                    <CheckIcon />
                  </span>
                  Unlimited washes, every day
                </li>
                <li>
                  <span className="drop">
                    <CheckIcon />
                  </span>
                  Use it at all four locations
                </li>
                <li>
                  <span className="drop">
                    <CheckIcon />
                  </span>
                  Cancel anytime, no contract
                </li>
              </ul>
              <Link className="btn btn-primary btn-lg" style={{ marginTop: 30 }} href="/pricing">
                See all pricing
              </Link>
            </div>
            <div className="club-card">
              <div className="badge" style={{ background: "var(--cyan)" }}>
                Unlimited Club
              </div>
              <div className="price" style={{ marginTop: 18 }}>
                $30<small>/mo</small>
              </div>
              <p style={{ color: "#bcd6f2", marginTop: 10 }}>Starting price · Deluxe plan</p>
              <Link className="btn btn-on-dark btn-lg" style={{ marginTop: 24, width: "100%", justifyContent: "center" }} href="/pricing">
                View plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <span className="eyebrow">From the neighborhood</span>
            <h2>Florence keeps it clean here.</h2>
          </div>
          <div className="quotes">
            <div className="card quote" data-reveal>
              <div className="stars">★★★★★</div>
              <p>&ldquo;Quick, cheap, and my car actually comes out clean. The free vacuums are a nice touch.&rdquo;</p>
              <div className="who">Local customer</div>
              <div className="role">Florence</div>
            </div>
            <div className="card quote" data-reveal>
              <div className="stars">★★★★★</div>
              <p>&ldquo;The unlimited plan pays for itself in two washes. I run my truck through every week.&rdquo;</p>
              <div className="who">Local customer</div>
              <div className="role">Florence</div>
            </div>
            <div className="card quote" data-reveal>
              <div className="stars">★★★★★</div>
              <p>&ldquo;Friendly staff and the line moves fast even on weekends. Highly recommend.&rdquo;</p>
              <div className="who">Local customer</div>
              <div className="role">Florence</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta" data-reveal>
            <Bubbles count={10} />
            <h2>Ready for a faster, cleaner wash?</h2>
            <p>Drive in today — or join the Unlimited Club and never think about it again.</p>
            <div className="hero-cta">
              <Link className="btn btn-on-dark btn-lg" href="/pricing">
                See wash plans
              </Link>
              <Link className="btn btn-ghost-dark btn-lg" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
