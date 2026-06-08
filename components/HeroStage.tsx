"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Bubbles from "./Bubbles";

type Hero = "a" | "b" | "c";
const OPTIONS: { k: Hero; title: string }[] = [
  { k: "a", title: "Splash gradient" },
  { k: "b", title: "Emblem spotlight" },
  { k: "c", title: "Full-bleed photo" },
];

export default function HeroStage() {
  const [hero, setHero] = useState<Hero>("a");

  useEffect(() => {
    const saved = (localStorage.getItem("sns-hero") as Hero) || "a";
    setHero(saved);
  }, []);

  const choose = (h: Hero) => {
    setHero(h);
    localStorage.setItem("sns-hero", h);
  };

  return (
    <>
      <div className="hero-stage" data-hero={hero} data-screen-label="Home hero">
        {/* HERO A — Splash gradient */}
        <section className="hero hero-a">
          {hero === "a" && <Bubbles count={16} />}
          <div className="wrap hero-a-inner">
            <span className="badge">Est. 2018 · Florence</span>
            <h1>
              A faster,
              <br />
              cleaner wash.
            </h1>
            <p className="hero-sub">
              Four express car washes across Florence. Pull up, pick your wash, and you&rsquo;re back
              on the road in minutes — windows down, free vacuums included.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-accent btn-lg" href="/pricing">
                See wash plans
              </Link>
              <a className="btn btn-ghost-dark btn-lg" href="#locations">
                Find a location
              </a>
            </div>
            <div className="hero-chips">
              <span className="chip chip-on-dark">
                <span className="dot" />
                Free self-serve vacuums
              </span>
              <span className="chip chip-on-dark">
                <span className="dot" />
                Open 7 days
              </span>
              <span className="chip chip-on-dark">
                <span className="dot" />
                Unlimited plans
              </span>
            </div>
          </div>
        </section>

        {/* HERO B — Emblem spotlight */}
        <section className="hero hero-b">
          <div className="wrap hero-b-inner">
            <div>
              <span className="eyebrow">Florence&rsquo;s express car wash</span>
              <h1>
                A faster,
                <br />
                cleaner wash.
              </h1>
              <p className="hero-sub">
                Pull up, pick your wash, and let the tunnel do the work. Free self-serve vacuums with
                every wash, at all four locations.
              </p>
              <div className="hero-cta">
                <Link className="btn btn-primary btn-lg" href="/pricing">
                  See wash plans
                </Link>
                <a className="btn btn-ghost btn-lg" href="#locations">
                  Find a location
                </a>
              </div>
              <div className="hero-b-stats">
                <div>
                  <div className="num">4</div>
                  <div className="lbl">Locations</div>
                </div>
                <div>
                  <div className="num">5 min</div>
                  <div className="lbl">In &amp; out</div>
                </div>
                <div>
                  <div className="num">7 days</div>
                  <div className="lbl">Open weekly</div>
                </div>
              </div>
            </div>
            <figure className="hero-b-figure" style={{ margin: 0 }}>
              <Image
                src="/assets/emblem-banner.png"
                alt="Scrub N Spray car wash emblem"
                width={900}
                height={600}
                style={{ width: "100%", height: "auto" }}
              />
            </figure>
          </div>
        </section>

        {/* HERO C — Full-bleed photo */}
        <section className="hero hero-c">
          <div className="ph" data-label="car wash tunnel — drop photo" />
          <div className="wrap hero-c-inner">
            <div className="hero-c-top">
              <Image src="/assets/wordmark.png" alt="Scrub N Spray" width={230} height={64} style={{ height: 64, width: "auto" }} />
              <span className="chip chip-on-dark">
                <span className="dot" />
                Open now · 8am–8pm
              </span>
            </div>
            <div>
              <h1>
                A faster,
                <br />
                cleaner wash.
              </h1>
              <p className="hero-sub">Four express car washes across Florence. In and out in minutes.</p>
              <div className="hero-cta">
                <Link className="btn btn-accent btn-lg" href="/pricing">
                  See wash plans
                </Link>
                <a className="btn btn-ghost-dark btn-lg" href="#locations">
                  Find a location
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* HERO SWITCHER */}
      <div className="hero-switch">
        <span className="lbl">Hero style</span>
        {OPTIONS.map((o) => (
          <button
            key={o.k}
            title={o.title}
            className={hero === o.k ? "on" : ""}
            onClick={() => choose(o.k)}
          >
            {o.k.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
