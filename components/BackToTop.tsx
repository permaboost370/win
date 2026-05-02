"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 grid place-items-center size-12 sm:size-14 border-4 border-bone bg-blood text-bone shadow-[6px_6px_0_0_#050505] hover:-translate-y-[2px] active:translate-y-0 transition-all ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none translate-y-2"
      }`}
    >
      <ArrowUp className="size-5 sm:size-6" strokeWidth={3} />
    </button>
  );
}
