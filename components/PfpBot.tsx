import Image from "next/image";
import { Send } from "lucide-react";
import { TOKEN } from "@/lib/constants";

const EXAMPLES = [
  { src: "/demo.jpg", label: "VOL.01" },
  { src: "/demo2.jpg", label: "VOL.02" },
  { src: "/img1.jpg", label: "VOL.03" },
  { src: "/img2.jpg", label: "VOL.04" },
];

export default function PfpBot() {
  return (
    <section id="pfp" className="relative bg-ink text-bone bg-smoke-sky grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
              § Telegram /pfp bot
            </span>
            <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9] glyph-shadow-tight">
              Become a <span className="text-blood">winner.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-bone/85">
              Drop your selfie. Get a $WINNING PFP — blonde hair, black
              wayfarers, &quot;CAN&apos;T STOP WON&apos;T STOP&quot; banner. Use it on X
              and watch your replies hit different.
            </p>
          </div>

          <ol className="flex flex-col gap-2 font-mono text-sm text-bone/80">
            <li className="flex gap-3">
              <span className="text-blood">01</span>
              <span>Open <span className="text-bone">@win_pfp_bot</span> on Telegram</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blood">02</span>
              <span>Send <span className="text-bone">/pfp</span> and reply with a photo</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blood">03</span>
              <span>Wait ~30s. Get your new identity.</span>
            </li>
          </ol>

          <a
            href={TOKEN.pfpBot}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-3 border-4 border-bone bg-blood text-bone px-5 py-3 font-display uppercase tracking-wide text-lg shadow-[6px_6px_0_0_#ece6d6] hover:-translate-y-[2px] transition-all"
          >
            <Send className="size-5" />
            Open /pfp bot →
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {EXAMPLES.map((ex, i) => (
              <figure
                key={ex.src}
                className={`relative border-4 border-bone bg-bone shadow-[8px_8px_0_0_#d92121] plate ${
                  i % 2 === 1 ? "translate-y-2 sm:translate-y-6" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={ex.src}
                    alt={`PFP example ${ex.label}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/90 text-bone px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest flex justify-between border-t-2 border-bone">
                  <span>$WINNING</span>
                  <span className="text-blood">// {ex.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
