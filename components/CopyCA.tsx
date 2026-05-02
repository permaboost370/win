"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { TOKEN } from "@/lib/constants";

export default function CopyCA({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  };

  const isDark = variant === "dark";

  return (
    <button
      onClick={onCopy}
      className={`group inline-flex items-center gap-3 border-2 border-ink px-3 py-2 font-mono text-xs sm:text-sm transition-all hover:-translate-y-[2px] active:translate-y-0 ${
        isDark
          ? "bg-ink text-cream hover:shadow-[6px_6px_0_0_#f4c430]"
          : "bg-cream text-ink hover:shadow-[6px_6px_0_0_#0a0a0a]"
      }`}
      aria-label="Copy contract address"
    >
      <span className="hidden sm:inline opacity-70">CA</span>
      <span className="truncate max-w-[60vw] sm:max-w-none">{TOKEN.contract}</span>
      {copied ? (
        <Check className="size-4 shrink-0 text-gold" />
      ) : (
        <Copy className="size-4 shrink-0 opacity-70 group-hover:opacity-100" />
      )}
    </button>
  );
}
