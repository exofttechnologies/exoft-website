"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import loaderImg from "@/assets/exoft_loading.gif";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Remove the inline HTML preloader from layout.tsx now that React has loaded
    const htmlPreloader = document.getElementById('html-preloader');
    if (htmlPreloader) {
      htmlPreloader.remove();
    }

    // Disable scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
        // Simple fade out — no scale to avoid zoom flash
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setMounted(false);
          }
        });
      }
    });

    const loaderEl = loaderRef.current;

    // Keep GIF visible while loading, then fade out
    tl.to({}, { duration: 1.6 });

    // Fade out the loader image cleanly
    tl.to(loaderEl, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    return () => {
      // Re-enable overflow just in case the component unmounts early
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="preloader-container" 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div 
        className="loader-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        {/* Centered image loader */}
        <div 
          className="loader-image-wrapper" 
          ref={loaderRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            src={loaderImg}
            alt="Loading..."
            width={100}
            height={100}
            unoptimized
            priority
            style={{ width: "100px", height: "auto" }}
            className="loader-img-asset"
          />
        </div>
      </div>
    </div>
  );
}
