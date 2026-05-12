"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { TOKEN } from "@/lib/constants";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // hide near top of hero, hide once user reaches footer
      const doc = document.documentElement;
      const nearBottom =
        y + window.innerHeight >= doc.scrollHeight - 320;
      setVisible(y > 360 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-200 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Buy $WINNING"
    >
      <div className="flex gap-2 p-2 bg-ink border-t-4 border-bone shadow-[0_-6px_0_0_#d92121]">
        <button
          onClick={onCopy}
          aria-label="Copy contract address"
          className="shrink-0 inline-flex items-center justify-center gap-2 border-2 border-bone bg-charcoal text-bone px-3 py-3 font-mono text-xs"
        >
          {copied ? (
            <>
              <Check className="size-4 text-blood" strokeWidth={3} />
              <span>COPIED</span>
            </>
          ) : (
            <>
              <Copy className="size-4" strokeWidth={2.5} />
              <span>CA</span>
            </>
          )}
        </button>
        <a
          href={TOKEN.uniswap}
          target="_blank"
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center border-2 border-bone bg-blood text-bone px-4 py-3 font-display uppercase tracking-wide text-base"
        >
          Buy $WINNING →
        </a>
      </div>
    </div>
  );
}
