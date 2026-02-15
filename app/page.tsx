import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/Home/demo-section";
import HeroSection from "@/components/Home/hero-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
      </div>
    </div>
  );
}
