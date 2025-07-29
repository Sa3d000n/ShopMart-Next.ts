import BrowseCategorySection from "@/components/BrowseCategorySection/BrowseCategorySection";
import TopPicksSection from "@/components/TopPicksSection/TopPicksSection";
import IntroSection from "@/components/IntroSection/IntroSection";
import InfoSection from "@/components/InfoSection/InfoSection";
import { Suspense } from "react";
import DefaultSkeleton from "@/components/DefaultSkeleton/DefaultSkeleton";
function HomePage() {
  return (
    <div>
      <IntroSection />
      <InfoSection />
      <Suspense fallback={<DefaultSkeleton />}>
        <BrowseCategorySection />

        <TopPicksSection />
      </Suspense>
    </div>
  );
}

export default HomePage;
