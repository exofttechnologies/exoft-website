"use client";

import { useEffect, useRef, useCallback } from "react";

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;
    const gridSize = 80;

    interface MovingPoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      opacity: number;
      size: number;
    }

    let pts: MovingPoint[] = [];
    let animationFrameId = 0;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      /* ── Very thin grid lines (10% opacity) ── */
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 0.5;

      // Vertical grid lines
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      /* ── Animate points moving along grid lines ── */
      for (const pt of pts) {
        const dx = pt.targetX - pt.x;
        const dy = pt.targetY - pt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pt.speed) {
          // Snap to target intersection
          pt.x = pt.targetX;
          pt.y = pt.targetY;

          // Pick adjacent vertical/horizontal grid coordinates
          const directions = [
            { dx: 0, dy: gridSize },
            { dx: 0, dy: -gridSize },
            { dx: gridSize, dy: 0 },
            { dx: -gridSize, dy: 0 },
          ];

          // Filter directions that remain inside boundaries
          const valid = directions.filter((d) => {
            const nextX = pt.x + d.dx;
            const nextY = pt.y + d.dy;
            return nextX >= 0 && nextX <= w && nextY >= 0 && nextY <= h;
          });

          if (valid.length > 0) {
            const chosen = valid[Math.floor(Math.random() * valid.length)];
            pt.targetX = pt.x + chosen.dx;
            pt.targetY = pt.y + chosen.dy;
          }
        } else {
          // Move step towards target
          pt.x += (dx / dist) * pt.speed;
          pt.y += (dy / dist) * pt.speed;
        }

        // Draw glowing point
        const radGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 10);
        radGrad.addColorStop(0, `rgba(250, 90, 56, ${pt.opacity})`);
        radGrad.addColorStop(0.3, `rgba(250, 90, 56, ${pt.opacity * 0.4})`);
        radGrad.addColorStop(1, "rgba(250, 90, 56, 0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // White core dot
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    };

    const resize = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      // Populate points if empty, or adjust to width changes
      if (pts.length === 0) {
        const numPoints = Math.min(15, Math.max(6, Math.floor(w / 120)));
        for (let i = 0; i < numPoints; i++) {
          const gridX = Math.floor(Math.random() * Math.floor(w / gridSize)) * gridSize;
          const gridY = Math.floor(Math.random() * Math.floor(h / gridSize)) * gridSize;
          pts.push({
            x: gridX,
            y: gridY,
            targetX: gridX,
            targetY: gridY,
            speed: Math.random() * 0.8 + 0.6,
            opacity: Math.random() * 0.3 + 0.6,
            size: Math.random() * 0.8 + 1.2,
          });
        }
      }
    };

    resize();
    
    // Setup ResizeObserver to handle page height adjustments
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    window.addEventListener("resize", resize);
    tick();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <>
      <canvas ref={canvasRef} className="background-sky-canvas" />
      <style jsx>{`
        .background-sky-canvas {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
