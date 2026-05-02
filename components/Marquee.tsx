export default function Marquee({
  text = "$WINNING • CAN'T STOP • WON'T STOP • $WINNING • HUSTLE HARD • WIN HARDER •",
  className = "",
  fast = false,
  invert = false,
}: {
  text?: string;
  className?: string;
  fast?: boolean;
  invert?: boolean;
}) {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div
      className={`relative overflow-hidden border-y-4 ${
        invert
          ? "border-bone bg-bone text-ink"
          : "border-bone bg-blood text-bone"
      } ${className}`}
    >
      <div
        className={`flex gap-8 whitespace-nowrap py-3 sm:py-4 will-change-transform ${
          fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {items.concat(items).map((i) => (
          <span
            key={i}
            className="font-display text-2xl sm:text-4xl tracking-wide uppercase"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
