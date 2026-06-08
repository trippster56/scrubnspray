"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * Floating rising bubbles overlay. Bubble geometry is randomized on the client
 * after mount (inside useEffect) to avoid a hydration mismatch.
 */
export default function Bubbles({ count = 14 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<CSSProperties[]>([]);

  useEffect(() => {
    const next: CSSProperties[] = Array.from({ length: count }, () => {
      const size = 8 + Math.random() * 42;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${7 + Math.random() * 10}s`,
        animationDelay: `${-Math.random() * 12}s`,
      };
    });
    setBubbles(next);
  }, [count]);

  return (
    <div className="bubbles" aria-hidden="true">
      {bubbles.map((style, i) => (
        <span key={i} className="bubble" style={style} />
      ))}
    </div>
  );
}
