"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ProjectButton from "@/components/ProjectButton";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { LiquidLens } from "@/components/LiquidLens";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <ProjectButton />
      <CTA />
      <Footer />
      <LiquidLens />
    </main>
  );
}
