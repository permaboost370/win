"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CopyCA from "./CopyCA";
import SocialRow from "./SocialRow";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/banner.jpg"
          alt="Can't Stop. Won't Stop."
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/85" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-4 sm:px-8 py-6 sm:py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 sm:size-10 grid place-items-center bg-gold border-2 border-ink font-display text-xl text-ink rotate-[-6deg] shadow-[3px_3px_0_0_#0a0a0a]">
              W
            </div>
            <span className="font-display text-2xl sm:text-3xl tracking-wider">
              $WINNING
            </span>
          </div>
          <a
            href="#how"
            className="hidden md:inline-flex items-center gap-2 border-2 border-cream/60 px-3 py-2 text-xs font-mono uppercase tracking-widest hover:bg-cream hover:text-ink transition"
          >
            How to win →
          </a>
        </div>

        {/* Big stamp */}
        <div className="flex flex-col gap-6 sm:gap-8 pb-6 sm:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <span className="inline-flex w-fit items-center gap-2 bg-gold text-ink border-2 border-ink px-3 py-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_0_#0a0a0a]">
              <span className="size-2 rounded-full bg-blood animate-pulse" />
              Live · Memecoin
            </span>
            <h1 className="font-display tracking-tight text-[18vw] leading-[0.85] sm:text-[12rem] uppercase">
              <span className="block text-cream glyph-shadow">$Winning</span>
            </h1>
            <p className="max-w-2xl font-sans text-base sm:text-lg text-cream/85">
              The ticker for relentless determination. Built on the only mantra
              that matters:{" "}
              <span className="font-bold text-gold">
                can&apos;t stop, won&apos;t stop.
              </span>{" "}
              Hustle hard. Win harder. Hold forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <SocialRow variant="dark" />
            <CopyCA variant="dark" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
