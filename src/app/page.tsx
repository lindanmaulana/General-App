
import { Features } from "./(home)/_components/sections/features";
import { HeroBanner } from "./(home)/_components/sections/hero-banner";
import { KeyMetrics } from "./(home)/_components/sections/key-metrics";
import { MainFeatures } from "./(home)/_components/sections/main-features";
import { CallToAction } from "./(home)/_components/sections/call-to-action";

export default async function Home() {
  return (
    <>
      <HeroBanner />
      <KeyMetrics />
      <Features />
      <MainFeatures />
      <CallToAction />
    </>
  );
}
