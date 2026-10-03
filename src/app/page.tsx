import { Cta } from "@/components/cta";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowToStart } from "@/components/how-to-start";
import { ModelsBento } from "@/components/models-bento";
import { Pricing } from "@/components/pricing";
import { PromptGallery } from "@/components/prompt-gallery";
import { RaffleCard } from "@/components/raffle-card";
import { SavingsCalculator } from "@/components/savings-calculator";
import { WhyGulayn } from "@/components/why-gulayn";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ModelsBento />
        <PromptGallery />
        <HowToStart />
        <WhyGulayn />
        <SavingsCalculator />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <RaffleCard />
    </>
  );
}
