"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CopyCA from "./CopyCA";
import SocialRow from "./SocialRow";

export default function Hero() {
  return (
    <section className="relative isolate bg-bone text-ink">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-14 flex flex-col gap-6 sm:gap-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative size-11 sm:size-12 border-2 border-ink overflow-hidden shadow-[3px_3px_0_0_#e81d1d]">
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
            className="hidden md:inline-flex items-center gap-2 border-2 border-ink px-3 py-2 text-xs font-mono uppercase tracking-widest hover:bg-ink hover:text-bone transition"
          >
            How to win →
          </a>
        </div>

        {/* Banner card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full border-4 border-ink shadow-[12px_12px_0_0_#e81d1d] overflow-hidden"
        >
          <Image
            src="/bannerwin.jpg"
            alt="Cant Stop, Wont Stop! #WINNING"
            width={1280}
            height={400}
            priority
            className="w-full h-auto block"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </motion.div>

        {/* Meta + CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
        >
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 bg-blood text-bone border-2 border-ink px-3 py-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0_0_#050505]">
              <span className="size-2 rounded-full bg-bone animate-pulse" />
              Live · Memecoin · ERC-20
            </span>
            <p className="max-w-2xl font-sans text-base sm:text-lg text-ink/80">
              The ticker for relentless determination. Built on the only mantra
              that matters:{" "}
              <span className="font-bold text-blood">
                can&apos;t stop, won&apos;t stop.
              </span>{" "}
              Hustle hard. Win harder. Hold forever.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4 items-start lg:items-end">
            <SocialRow />
            <CopyCA />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
