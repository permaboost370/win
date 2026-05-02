import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Quotes from "@/components/Quotes";
import HowToBuy from "@/components/HowToBuy";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <Marquee />
      <Manifesto />
      <Marquee
        invert
        fast
        text="WINNING • WINNING • WINNING • WINNING • WINNING • WINNING •"
      />
      <Quotes />
      <HowToBuy />
      <Footer />
      <BackToTop />
    </main>
  );
}
