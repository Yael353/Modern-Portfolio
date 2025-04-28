"use client";

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import LatestProject from "@/components/LatestProject";
import RecentProjects from "@/components/RecentProjects";
import { navItems } from "@/data";

// Lazy load FloatingNav
const FloatingNav = nextDynamic(() => import("@/components/ui/FloatingNav"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center overflow-clip flex-col mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Intro />
        <Grid />
        <RecentProjects />
        <LatestProject />
        <Footer />
      </div>
    </main>
  );
}
