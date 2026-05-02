"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CopyCA from "./CopyCA";
import SocialRow from "./SocialRow";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-smoke-sky text-bone grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-14 flex flex-col gap-6 sm:gap-10">
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

        {/* Full-width banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full border-4 border-bone shadow-[12px_12px_0_0_#d92121] overflow-hidden"
        >
          <Image
            src="/bannerhigh.jpg"
            alt="Cant Stop, Wont Stop! #WINNING"
            width={2400}
            height={806}
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
          <p className="lg:col-span-7 max-w-2xl font-sans text-base sm:text-lg text-bone/85">
            The ticker for relentless determination. Built on the only mantra
            that matters:{" "}
            <span className="font-bold text-blood">
              can&apos;t stop, won&apos;t stop.
            </span>{" "}
            Hustle hard. Win harder. Hold forever.
          </p>

          <div className="lg:col-span-5 flex flex-col gap-3 items-start lg:items-end">
            <SocialRow variant="dark" />
            <CopyCA variant="dark" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
