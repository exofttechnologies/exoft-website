"use client";

import React, { useEffect, useRef, useState } from "react";
import "./LiquidLens.css";

const LENS_SIZE = 60;
const LERP = 0.08;
const HIDE_DELAY = 1500;

export default function LiquidLens() {
  const lensRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafRef = useRef<number>(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    function animate() {
      currentX.current += (mouseX.current - currentX.current) * LERP;
      currentY.current += (mouseY.current - currentY.current) * LERP;

      const tx = `translate(${currentX.current}px, ${currentY.current}px)`;

      if (lensRef.current) lensRef.current.style.transform = tx;
      if (glowRef.current) glowRef.current.style.transform = tx;
      if (ringRef.current) ringRef.current.style.transform = tx;

      rafRef.current = requestAnimationFrame(animate);
    }

    function showLens() {
      setIsVisible(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setIsVisible(false), HIDE_DELAY);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX.current = e.clientX - LENS_SIZE / 2;
      mouseY.current = e.clientY - LENS_SIZE / 2;
      showLens();
    }

    function onMouseDown() {
      showLens();
    }

    function onMouseLeave() {
      setIsVisible(false);
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      mouseX.current = t.clientX - LENS_SIZE / 2;
      mouseY.current = t.clientY - LENS_SIZE / 2;
      showLens();
    }

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      mouseX.current = t.clientX - LENS_SIZE / 2;
      mouseY.current = t.clientY - LENS_SIZE / 2;
      currentX.current = mouseX.current;
      currentY.current = mouseY.current;
      showLens();
    }

    function onTouchEnd() {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setIsVisible(false), 800);
    }

    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className={`liquid-lens-root ${isVisible ? "liquid-lens-visible" : ""}`}
      aria-hidden="true"
    >
      <div ref={lensRef} className="liquid-lens-glass" />
      <div ref={glowRef} className="liquid-lens-glow" />
      <div ref={ringRef} className="liquid-lens-ring" />
    </div>
  );
}
