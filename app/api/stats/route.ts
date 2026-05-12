import { NextResponse } from "next/server";
import { TOKEN } from "@/lib/constants";

type DexPair = {
  priceUsd?: string;
  priceChange?: { h24?: number };
  marketCap?: number;
  fdv?: number;
  volume?: { h24?: number };
  txns?: { h24?: { buys?: number; sells?: number } };
  liquidity?: { usd?: number };
};

export async function GET() {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/${TOKEN.chain}/${TOKEN.pairAddress}`,
      { next: { revalidate: 20 } },
    );
    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    const json: { pairs?: DexPair[] } = await res.json();
    const p = json.pairs?.[0];
    if (!p) return NextResponse.json({ ok: false }, { status: 404 });
    const txns = p.txns?.h24;
    return NextResponse.json({
      ok: true,
      priceUsd: p.priceUsd ? Number(p.priceUsd) : null,
      change24h: p.priceChange?.h24 ?? null,
      marketCap: p.marketCap ?? p.fdv ?? null,
      volume24h: p.volume?.h24 ?? null,
      liquidity: p.liquidity?.usd ?? null,
      buys24h: txns?.buys ?? null,
      sells24h: txns?.sells ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
