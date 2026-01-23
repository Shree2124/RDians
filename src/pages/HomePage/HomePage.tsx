"use client";

import GovernmentHeader from "@/components/sections/header/GovernmentHeader";
import GovernmentHero from "@/components/sections/hero/GovernmentHero";
import GovernmentFeatures from "@/components/sections/features/GovernmentFeatures";
import GovernmentFooter from "@/components/sections/footer/GovernmentFooter";

const HomePage = () => {
  return (
    <>
      <GovernmentHeader />
      <main>
        <GovernmentHero />

        <GovernmentFeatures />

      </main>
      <GovernmentFooter />
    </>
  );
};

export default HomePage;
