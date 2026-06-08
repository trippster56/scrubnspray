const ITEMS = [
  "Four Florence locations",
  "Free self-serve vacuums",
  "Unlimited monthly plans",
  "Open seven days a week",
];

export default function Ticker() {
  // Duplicate the list so the marquee loops seamlessly.
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span className="ticker-item" key={i}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
