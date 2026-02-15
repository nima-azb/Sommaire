import BgGradient from "@/components/common/bg-gradient";
import CTASection from "@/components/Home/CTA-section";
import DemoSection from "@/components/Home/demo-section";
import HeroSection from "@/components/Home/hero-section";
import HowItWorksSection from "@/components/Home/how-it-works-section";
import PricingSection from "@/components/Home/pricing-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
