import Image from "next/image";

export default function Quotes() {
  return (
    <section id="quotes" className="relative bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-3 mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            § Words of the Don
          </span>
          <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9]">
            Inspirational <span className="text-gold">copium.</span>
          </h2>
          <p className="max-w-2xl text-cream/75">
            Wisdom from the only candidate ever to invent winning. Print it,
            tweet it, paste it in the group chat after a green daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <figure className="group border-4 border-cream bg-cream text-ink shadow-[10px_10px_0_0_#f4c430] transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img1.jpg"
                alt="Sorry losers and haters but my IQ is one of the highest"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <figcaption className="border-t-4 border-ink p-4 flex items-center justify-between">
              <span className="font-display uppercase text-xl">High IQ holder</span>
              <span className="font-mono text-xs">// VOL.01</span>
            </figcaption>
          </figure>

          <figure className="group border-4 border-cream bg-cream text-ink shadow-[10px_10px_0_0_#c81c1c] transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img2.jpg"
                alt="Tax these nuts — Donald Trump"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <figcaption className="border-t-4 border-ink p-4 flex items-center justify-between">
              <span className="font-display uppercase text-xl">Tax policy</span>
              <span className="font-mono text-xs">// VOL.02</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
