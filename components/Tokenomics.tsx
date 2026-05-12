"use client";

import { Flame, Lock, Coins, Percent, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { TOKEN, TOKENOMICS } from "@/lib/constants";

const ITEMS = [
  {
    icon: Coins,
    label: "Total Supply",
    value: TOKENOMICS.totalSupply,
    note: "Fixed. No mint function. No surprises.",
  },
  {
    icon: Percent,
    label: "Tax (Buy / Sell)",
    value: TOKENOMICS.tax,
    note: "Zero friction. Every basis point belongs to holders.",
  },
  {
    icon: Flame,
    label: "Liquidity",
    value: TOKENOMICS.liquidity,
    note: "LP tokens sent to the burn address. Forever pool.",
  },
  {
    icon: Lock,
    label: "Contract Ownership",
    value: TOKENOMICS.ownership,
    note: "Owner renounced. Nobody can touch the contract.",
  },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
            § Tokenomics
          </span>
          <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9]">
            Built like a <span className="text-blood">brick.</span>
          </h2>
          <p className="max-w-2xl text-ink/75">
            No team allocations. No vesting cliffs. No surprises in the bytecode.
            Just a fair-launch ticker on Ethereum mainnet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="relative border-4 border-ink bg-bone p-5 shadow-[8px_8px_0_0_#d92121] plate"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">
                    {it.label}
                  </span>
                  <Icon className="size-5 text-blood" strokeWidth={2.5} />
                </div>
                <div className="font-display uppercase text-3xl mt-3 leading-none">
                  {it.value}
                </div>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                  {it.note}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink/60 break-all">
            CA: {TOKEN.contract}
          </p>
          <a
            href={TOKEN.etherscan}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 border-2 border-ink bg-bone text-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-ink hover:text-bone transition-all"
          >
            Verify on Etherscan
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
