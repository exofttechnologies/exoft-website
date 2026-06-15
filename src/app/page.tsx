"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative">
      <Preloader onComplete={() => setIsLoaded(true)} />
      <div style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.6s ease-in-out" }}>
        <Navbar />
        <Hero />
        <AboutUs />
        <Services />
        <Partners />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
