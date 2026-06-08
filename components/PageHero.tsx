"use client";

import { useEffect, useState, type ReactNode } from "react";
import Bubbles from "./Bubbles";

type Phero = "a" | "b" | "c" | "d";
const OPTIONS: { k: Phero; title: string }[] = [
  { k: "a", title: "Clean gradient" },
  { k: "b", title: "Floating bubbles" },
  { k: "c", title: "Water waves" },
  { k: "d", title: "Bright foam" },
];

const DEFAULTS: Record<string, Phero> = {
  services: "b",
  pricing: "d",
  contact: "c",
  refund: "a",
};

export default function PageHero({
  pageKey,
  eyebrow,
  title,
  subtitle,
  screenLabel,
}: {
  pageKey: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  screenLabel?: string;
}) {
  const [phero, setPhero] = useState<Phero>(DEFAULTS[pageKey] || "a");

  useEffect(() => {
    const saved = (localStorage.getItem("sns-phero-" + pageKey) as Phero) || DEFAULTS[pageKey] || "a";
    setPhero(saved);
  }, [pageKey]);

  const choose = (k: Phero) => {
    setPhero(k);
    localStorage.setItem("sns-phero-" + pageKey, k);
  };

  return (
    <>
      <section className="page-hero" data-phero={phero} data-screen-label={screenLabel}>
        <div className="phero-deco">
          <div className="phero-glow" />
          <div className="phero-streaks" />
          <div className="phero-dots" />
          <div className="phero-bubbles">{phero === "b" && <Bubbles count={16} />}</div>
          <div className="phero-wave">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,72 C220,118 430,30 680,54 C930,78 1160,120 1440,66 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </div>
        <div className="page-hero-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </section>

      <div className="hero-switch phero-switch">
        <span className="lbl">Header style</span>
        {OPTIONS.map((o) => (
          <button
            key={o.k}
            title={o.title}
            className={phero === o.k ? "on" : ""}
            onClick={() => choose(o.k)}
          >
            {o.k.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
