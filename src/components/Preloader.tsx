"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import loaderImg from "@/assets/loader.png";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out and scale up the preloader container
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            setMounted(false);
          }
        });
      }
    });

    // 1. Initial State: Loader image hidden
    const loaderEl = loaderRef.current;
    if (loaderEl) {
      gsap.set(loaderEl, { scale: 0.8, opacity: 0 });
    }

    // 2. Loader Image Fade In & Scale Up
    tl.to(loaderEl, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // 3. Keep it visible for 1.6s (simulate loading)
    tl.to({}, { duration: 1.6 });

    // 4. Shrink loader image slightly before final panel fade
    tl.to(loaderEl, {
      scale: 0.9,
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
    <div className="preloader-container" ref={containerRef}>
      {/* Background Grid Lines (matches hero style) */}
      <div className="loader-grid">
        <div className="loader-grid-line" />
        <div className="loader-grid-line" />
        <div className="loader-grid-line" />
      </div>

      <div className="loader-content">
        {/* Centered spinning image loader */}
        <div className="loader-image-wrapper" ref={loaderRef}>
          <Image
            src={loaderImg}
            alt="Loading..."
            width={64}
            height={64}
            priority
            className="loader-img-asset"
          />
        </div>
      </div>

      <style jsx>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          background: #050505;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .loader-grid {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-around;
          pointer-events: none;
          opacity: 0.04;
        }

        .loader-grid-line {
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #ffffff, transparent);
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .loader-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spin-loader 1.6s linear infinite;
        }

        @keyframes spin-loader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
