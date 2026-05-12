"use client";

import { motion } from "framer-motion";

const PHASES = [
  {
    n: "PH.01",
    status: "LIVE",
    title: "Ape In.",
    body: "Fair launch on Ethereum. LP burned, contract renounced, telegram open. The chant goes on-chain.",
  },
  {
    n: "PH.02",
    status: "NOW",
    title: "Hold Hard.",
    body: "PFP bot live. Stickers, memes, raid threads. Every CT timeline learns the words by heart.",
  },
  {
    n: "PH.03",
    status: "SOON",
    title: "Conquer CT.",
    body: "Tier-1 influencer rotation. CEX whispers. Merch drop. The ticker every group chat is screaming.",
  },
  {
    n: "PH.04",
    status: "ETA: VALHALLA",
    title: "Never Lose.",
    body: "$WINNING is a lifestyle. We're going to win so much, you'll get tired of winning. Then we win more.",
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative bg-charcoal text-bone grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
            § Roadmap
          </span>
          <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9] glyph-shadow-tight">
            The path to <span className="text-blood">Valhalla.</span>
          </h2>
          <p className="max-w-2xl text-bone/75">
            Four phases. One direction. If you&apos;re reading this, you&apos;re
            still early.
          </p>
        </div>

        <ol className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHASES.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="relative border-4 border-bone bg-ink p-5 shadow-[8px_8px_0_0_#d92121] plate flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-bone/50">
                  {p.n}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 border ${
                    i === 0
                      ? "border-blood text-blood"
                      : i === 1
                      ? "border-bone text-bone bg-blood/20"
                      : "border-bone/40 text-bone/60"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="font-display uppercase text-3xl leading-none mt-2">
                {p.title}
              </div>
              <p className="text-sm text-bone/70 leading-relaxed">{p.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
