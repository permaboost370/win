import { Plus } from "lucide-react";

const QA = [
  {
    q: "Is this affiliated with Trump or GameStop?",
    a: "No. $WINNING is an unaffiliated parody memecoin. The chant is folklore. The imagery is satire. No endorsement is claimed or implied.",
  },
  {
    q: "Is the contract safe?",
    a: "Contract is renounced and LP is burned — meaning nobody (including us) can mint new tokens, change taxes, or pull liquidity. Verify on Etherscan. Always DYOR.",
  },
  {
    q: "What slippage should I use?",
    a: "5-10% is standard for memecoins on Uniswap. If a buy fails, bump slippage up to 12-15% and try again. Don't max it out — sandwich bots eat that for breakfast.",
  },
  {
    q: "Where do I get help?",
    a: "Telegram is the war room. Mods are active. Don't trust DMs — we will NEVER DM you first. Anyone DMing you claiming to be the team is a scammer.",
  },
  {
    q: "Is there a tax on buy or sell?",
    a: "0% / 0%. No buy tax. No sell tax. Every basis point belongs to you.",
  },
  {
    q: "When CEX listing?",
    a: "Soon™. We're memecoin people, not roadmap-promise people. Hold the line, win the season.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
            § FAQ
          </span>
          <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9]">
            Questions before you <span className="text-blood">win.</span>
          </h2>
        </div>

        <ul className="flex flex-col gap-3">
          {QA.map((item, i) => (
            <li key={i}>
              <details className="group border-4 border-ink bg-bone shadow-[6px_6px_0_0_#d92121] open:shadow-[10px_10px_0_0_#d92121] transition-shadow">
                <summary className="list-none cursor-pointer p-4 sm:p-5 flex items-center justify-between gap-4">
                  <span className="font-display uppercase text-xl sm:text-2xl leading-tight">
                    {item.q}
                  </span>
                  <Plus
                    className="size-6 shrink-0 text-blood transition-transform group-open:rotate-45"
                    strokeWidth={3}
                  />
                </summary>
                <div className="px-4 sm:px-5 pb-5 -mt-1">
                  <p className="text-sm sm:text-base text-ink/75 leading-relaxed border-t-2 border-ink pt-3">
                    {item.a}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
