import { HomeMenuButtons } from "../../../components/layout/io-mobile-menu/mounteds/home-mobile-menu";
import { AboutSection } from "./sections/home-about";
import { BestsellersSection } from "./sections/home-bestsallers";
import { BrandSection } from "./sections/home-brand";
import { ColectionSection } from "./sections/home-colections";
import { HeroSection } from "./sections/home-hero";
import { CollectionHighlightsSection } from "./sections/home-highlights";
import { RecipesSection } from "./sections/home-recipes";
import { KitSubscriptionSection } from "./sections/home-subscription";

// ===== HOME PAGE PRINCIPAL =====
export default function HomePage() {
  return (
    <div className="">
      <HomeMenuButtons />
      <section className="h-full">
        <HeroSection />
      </section>

      <div className="flex flex-col gap-60 bg-[#f1f1f1] px-4 py-40 lg:px-0">
        <section className=" " id="bestsellers">
          <BestsellersSection />
        </section>

        <section className=" " id="collection ">
          <ColectionSection />
        </section>

        <section className=" ">
          <CollectionHighlightsSection />
        </section>

        <section className="px-0 md:px-2">
          <BrandSection />
        </section>

        <section className=" ">
          <KitSubscriptionSection />
        </section>

        <section className=" ">
          <RecipesSection />
        </section>
      </div>
      <section className=" ">
        <AboutSection />
      </section>
    </div>
  );
}
