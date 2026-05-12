"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

type Stats = {
  ok: boolean;
  priceUsd: number | null;
  change24h: number | null;
  marketCap: number | null;
  volume24h: number | null;
  liquidity: number | null;
  buys24h: number | null;
  sells24h: number | null;
};

const REFRESH_MS = 30_000;

function compactUsd(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function priceStr(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  if (n >= 1) return `$${n.toFixed(4)}`;
  // small numbers — show 6 sig figs after leading zeroes
  const s = n.toExponential(3);
  return `$${Number(s).toFixed(8).replace(/0+$/, "")}`;
}

function compactInt(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(n);
}

export default function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch("/api/stats", { cache: "no-store" });
        if (!r.ok) return;
        const data = (await r.json()) as Stats;
        if (cancelled) return;
        setStats(data);
        setPulse((x) => x + 1);
      } catch {
        // ignore
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const change = stats?.change24h ?? null;
  const up = change != null && change >= 0;

  const items: { label: string; value: string; tone?: "blood" | "neutral" }[] = [
    { label: "Price", value: priceStr(stats?.priceUsd) },
    { label: "24h", value: change == null ? "—" : `${change.toFixed(2)}%`, tone: up ? "neutral" : "blood" },
    { label: "Market Cap", value: compactUsd(stats?.marketCap) },
    { label: "24h Volume", value: compactUsd(stats?.volume24h) },
    { label: "Liquidity", value: compactUsd(stats?.liquidity) },
    {
      label: "24h Buys / Sells",
      value:
        stats?.buys24h == null && stats?.sells24h == null
          ? "—"
          : `${compactInt(stats?.buys24h)} / ${compactInt(stats?.sells24h)}`,
    },
  ];

  return (
    <section
      aria-label="Live token stats"
      className="relative bg-ink text-bone border-y-4 border-bone"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-5 sm:py-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-blood inline-flex items-center gap-2">
            <span className="relative inline-flex size-2">
              <span className="absolute inset-0 rounded-full bg-blood animate-ping opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blood" />
            </span>
            Live · Dexscreener
          </span>
          <span className="font-mono text-[10px] text-bone/40 hidden sm:inline">
            refresh 30s
          </span>
        </div>

        <ul
          key={pulse}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3"
        >
          {items.map((it) => (
            <li
              key={it.label}
              className="border-2 border-bone/30 bg-charcoal px-3 py-2 sm:px-4 sm:py-3 flex flex-col gap-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone/50">
                {it.label}
              </span>
              <span
                className={`font-display tracking-wide text-lg sm:text-2xl inline-flex items-center gap-1.5 ${
                  it.tone === "blood" ? "text-blood" : "text-bone"
                }`}
              >
                {it.label === "24h" && change != null ? (
                  up ? (
                    <TrendingUp className="size-4 text-bone/80" strokeWidth={3} />
                  ) : (
                    <TrendingDown className="size-4 text-blood" strokeWidth={3} />
                  )
                ) : null}
                {it.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
