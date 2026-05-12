import Hero from "@/components/Hero";
import LiveStats from "@/components/LiveStats";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Chart from "@/components/Chart";
import Tokenomics from "@/components/Tokenomics";
import Quotes from "@/components/Quotes";
import PfpBot from "@/components/PfpBot";
import Roadmap from "@/components/Roadmap";
import HowToBuy from "@/components/HowToBuy";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <LiveStats />
      <Marquee />
      <Manifesto />
      <Marquee
        invert
        fast
        text="WINNING • WINNING • WINNING • WINNING • WINNING • WINNING •"
      />
      <Chart />
      <Tokenomics />
      <Quotes />
      <PfpBot />
      <Roadmap />
      <HowToBuy />
      <FAQ />
      <Footer />
      <BackToTop />
      <StickyMobileCTA />
    </main>
  );
}
