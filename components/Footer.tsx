import Image from "next/image";
import { TOKEN } from "@/lib/constants";
import SocialRow from "./SocialRow";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-bone border-t-4 border-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16 flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-10 justify-between">
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-3">
              <div className="relative size-12 border-2 border-bone overflow-hidden shadow-[3px_3px_0_0_#d92121]">
                <Image
                  src="/logowin.jpg"
                  alt="$WINNING logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="font-display text-3xl tracking-wider">
                $WINNING
              </span>
            </div>
            <p className="text-bone/70 text-sm leading-relaxed">
              The ticker for relentless determination. Built by degens, for
              degens.{" "}
              <span className="text-blood font-bold">
                Can&apos;t stop, won&apos;t stop, GameStop
              </span>{" "}
              — now tokenized.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
              Find us
            </span>
            <SocialRow variant="dark" />
          </div>
        </div>

        <div className="border-t border-bone/20 pt-6 flex flex-col gap-4 text-xs text-bone/60">
          <p className="font-mono break-all">
            CA: {TOKEN.contract}
          </p>
          <p className="leading-relaxed max-w-3xl">
            $WINNING is a memecoin with no intrinsic value, no roadmap and no
            promise of financial return. It exists for entertainment and
            community. This site is not affiliated with, endorsed by, or
            sponsored by Donald J. Trump, The White House, or any government
            entity. Imagery is parody. Do your own research. Never invest more
            than you can afford to lose.
          </p>
          <p>© {new Date().getFullYear()} $WINNING. All rights reserved by nobody.</p>
        </div>
      </div>
    </footer>
  );
}
