"use client";

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import { navItems } from "@/data";
import { skillsData } from "@/data/icons";

// Dynamically import components that rely on browser-only APIs
const FloatingNav = nextDynamic(() => import("@/components/ui/FloatingNav"), {
  ssr: false,
});
const Hero = nextDynamic(() => import("@/components/Hero"), { ssr: false });
const Intro = nextDynamic(() => import("@/components/Intro"), { ssr: false });
const Skills = nextDynamic(() => import("@/components/Skills"), { ssr: false });
const RecentProjects = nextDynamic(
  () => import("@/components/RecentProjects"),
  {
    ssr: false,
  }
);
const LatestProject = nextDynamic(() => import("@/components/LatestProject"), {
  ssr: false,
});
const Footer = nextDynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center overflow-clip flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Intro />
        <Skills skillsData={skillsData}/>
        <RecentProjects />
        <LatestProject />
        <Footer />
      </div>
    </main>
  );
}
