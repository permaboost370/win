import { Send, ExternalLink } from "lucide-react";
import { TOKEN } from "@/lib/constants";

const X_ICON = (
  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
    <path d="M18.244 2H21l-6.49 7.41L22 22h-6.875l-4.79-6.262L4.8 22H2.04l6.94-7.93L2 2h7.05l4.34 5.74L18.245 2Zm-1.205 18.4h1.713L7.05 3.486H5.214L17.04 20.4Z" />
  </svg>
);

const DEX_ICON = (
  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
    <path d="M3 3h4v18H3V3Zm7 6h4v12h-4V9Zm7-4h4v16h-4V5Z" />
  </svg>
);

type Variant = "light" | "dark";

export default function SocialRow({ variant = "light" }: { variant?: Variant }) {
  const dark = variant === "dark";
  const base =
    "inline-flex items-center gap-2 border-2 px-4 py-3 font-display tracking-wide uppercase text-sm sm:text-base transition-all hover:-translate-y-[2px] active:translate-y-0";
  const lightStyles = "border-ink bg-cream text-ink hover:shadow-[6px_6px_0_0_#0a0a0a]";
  const darkStyles =
    "border-cream bg-ink text-cream hover:shadow-[6px_6px_0_0_#f4c430]";
  const cls = `${base} ${dark ? darkStyles : lightStyles}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={TOKEN.dexscreener} target="_blank" rel="noreferrer" className={`${cls} bg-blood text-cream border-ink hover:bg-blood/90`}>
        {DEX_ICON}
        <span>Buy on Dex</span>
        <ExternalLink className="size-4 opacity-80" />
      </a>
      <a href={TOKEN.telegram} target="_blank" rel="noreferrer" className={cls}>
        <Send className="size-5" />
        <span>Telegram</span>
      </a>
      <a href={TOKEN.twitter} target="_blank" rel="noreferrer" className={cls}>
        {X_ICON}
        <span>X / Twitter</span>
      </a>
    </div>
  );
}
