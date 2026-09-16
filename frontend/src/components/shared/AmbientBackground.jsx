/**
 * AmbientBackground — sits INSIDE the page div, behind all content.
 * Uses position:fixed so it covers the full viewport regardless of scroll.
 * The page div keeps bg-[#FBF8F3] — the canvas draws cream + waves on top,
 * covering the page background. Works because canvas is rendered FIRST
 * in the DOM before all other page children.
 */
import { useEffect, useRef } from "react";

function WaveCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { amplitude: 90,  period: 0.0010, speed: 0.25, yBase: 0.22, color: "rgba(201,151,58,0.14)", width: 2.5, offset: 0.0 },
      { amplitude: 70,  period: 0.0007, speed: 0.18, yBase: 0.42, color: "rgba(185,138,44,0.12)", width: 2.0, offset: 1.6 },
      { amplitude: 110, period: 0.0013, speed: 0.32, yBase: 0.64, color: "rgba(201,151,58,0.11)", width: 1.8, offset: 2.9 },
      { amplitude: 55,  period: 0.0008, speed: 0.14, yBase: 0.82, color: "rgba(160,115,35,0.10)", width: 1.4, offset: 4.1 },
      { amplitude: 75,  period: 0.0015, speed: 0.22, yBase: 0.10, color: "rgba(201,151,58,0.09)", width: 1.2, offset: 0.7 },
    ];

    let frame = 0;
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Paint cream background first (replaces the div's bg-[#FBF8F3])
      ctx.fillStyle = "#FBF8F3";
      ctx.fillRect(0, 0, W, H);

      // Atmospheric corner glows
      const gTL = ctx.createRadialGradient(W * 0.05, H * 0.05, 0, W * 0.05, H * 0.05, W * 0.5);
      gTL.addColorStop(0, "rgba(201,151,58,0.09)");
      gTL.addColorStop(1, "rgba(201,151,58,0)");
      ctx.fillStyle = gTL; ctx.fillRect(0, 0, W, H);

      const gBR = ctx.createRadialGradient(W * 0.95, H * 0.95, 0, W * 0.95, H * 0.95, W * 0.5);
      gBR.addColorStop(0, "rgba(180,130,40,0.07)");
      gBR.addColorStop(1, "rgba(180,130,40,0)");
      ctx.fillStyle = gBR; ctx.fillRect(0, 0, W, H);

      // Wave lines
      waves.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 3) {
          const y =
            H * w.yBase +
            Math.sin(x * w.period + frame * w.speed * 0.04 + w.offset) * w.amplitude +
            Math.sin(x * w.period * 1.9 + frame * w.speed * 0.028 + w.offset + 1) * (w.amplitude * 0.38);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.width;
        ctx.lineCap = "round";
        ctx.stroke();
      });

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // pointer-events:none so clicks pass through to page content
  // z-index:-1 so it sits BEHIND all sibling elements in the page div
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
}

export const AmbientBackground = () => <WaveCanvas />;