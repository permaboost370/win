import { TOKEN } from "@/lib/constants";
import CopyCA from "./CopyCA";

const STEPS = [
  {
    n: "01",
    title: "Get a wallet",
    body: "Grab MetaMask, Rabby or your favorite EVM wallet. Fund it with ETH (or whichever native token your DEX uses).",
  },
  {
    n: "02",
    title: "Copy the contract",
    body: "Tap the contract address below to copy. Always verify the CA matches our official channels — meme coins attract clones.",
  },
  {
    n: "03",
    title: "Open Dexscreener",
    body: "Click 'Dexscreener'. Confirm the pair, set slippage, swap. Welcome to the winning team.",
  },
  {
    n: "04",
    title: "Hold. Win.",
    body: "Don't paper-hand the dip. Don't chase the candle. Diamond hands like a GME ape. Can't stop, won't stop, GameStop. That's the whole strategy.",
  },
];

export default function HowToBuy() {
  return (
    <section id="how" className="relative bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
            § Onboarding
          </span>
          <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9]">
            How to <span className="text-blood">win.</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="relative border-4 border-ink bg-bone p-5 shadow-[8px_8px_0_0_#d92121] plate"
            >
              <div className="font-display text-6xl leading-none text-blood">
                {s.n}
              </div>
              <div className="font-display uppercase text-2xl mt-2">
                {s.title}
              </div>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CopyCA />
          <a
            href={TOKEN.dexscreener}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 border-4 border-ink bg-blood text-bone px-5 py-3 font-display uppercase tracking-wide text-lg shadow-[6px_6px_0_0_#050505] hover:-translate-y-[2px] transition-all"
          >
            Buy $WINNING →
          </a>
        </div>
      </div>
    </section>
  );
}
