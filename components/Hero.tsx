"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CopyCA from "./CopyCA";
import SocialRow from "./SocialRow";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-smoke-sky text-bone grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-10 flex flex-col gap-10 lg:gap-14 min-h-[92vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative size-11 sm:size-12 border-2 border-bone overflow-hidden shadow-[3px_3px_0_0_#d92121]">
              <Image
                src="/logowin.jpg"
                alt="$WINNING logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <span className="font-display text-2xl sm:text-3xl tracking-wider">
              $WINNING
            </span>
          </div>
          <a
            href="#how"
            className="hidden md:inline-flex items-center gap-2 border-2 border-bone/60 px-3 py-2 text-xs font-mono uppercase tracking-widest hover:bg-bone hover:text-ink transition"
          >
            How to win →
          </a>
        </div>

        {/* Main hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center flex-1">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <span className="inline-flex w-fit items-center gap-2 bg-blood text-bone border-2 border-bone px-3 py-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_0_#050505]">
              <span className="size-2 rounded-full bg-bone animate-pulse" />
              Live · Memecoin
            </span>
            <h1 className="font-display tracking-tight text-[18vw] leading-[0.85] sm:text-[10rem] lg:text-[9rem] uppercase">
              <span className="block text-bone glyph-shadow">$Winning</span>
            </h1>
            <p className="max-w-xl font-sans text-base sm:text-lg text-bone/80">
              The ticker for relentless determination. Built on the only mantra
              that matters:{" "}
              <span className="font-bold text-blood">
                can&apos;t stop, won&apos;t stop.
              </span>{" "}
              Hustle hard. Win harder. Hold forever.
            </p>

            <div className="flex flex-col gap-4">
              <SocialRow variant="dark" />
              <CopyCA variant="dark" />
            </div>
          </motion.div>

          {/* Right: poster image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[16/10] w-full border-4 border-bone shadow-[12px_12px_0_0_#d92121] overflow-hidden">
              <Image
                src="/demo2.jpg"
                alt="Can't Stop. Won't Stop."
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute top-3 left-3 bg-ink border-2 border-bone px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-bone">
                The Doctrine
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
