"use client";

import GovernmentHeader from "@/components/sections/header/GovernmentHeader";
import GovernmentHero from "@/components/sections/hero/GovernmentHero";
import GovernmentFooter from "@/components/sections/footer/GovernmentFooter";

const HomePage = () => {
  return (
    <>
      <GovernmentHeader />
      <main>
        <GovernmentHero />
      </main>
      <GovernmentFooter />
    </>
  );
};

export default HomePage;
