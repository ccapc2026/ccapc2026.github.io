'use client';

import { useEffect, useRef } from 'react';

/**
 * A drifting particle field on a fixed full-viewport canvas, sitting behind the
 * page. Points wander, rebound off the edges, and link to nearby neighbours;
 * the links fade with distance so the mesh reads as depth rather than a net.
 *
 * Deliberately dependency-free — a canvas and a rAF loop is the whole thing.
 * It pauses when the tab is hidden and does not run at all for viewers who ask
 * for reduced motion.
 */
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;

    const WHITE = '255,255,255';

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };
    let points: P[] = [];

    // Scale count with viewport area so a phone doesn't run a desktop's load.
    const targetCount = () => Math.round(Math.min(90, Math.max(28, (width * height) / 20000)));

    function seed() {
      points = Array.from({ length: targetCount() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.6,
        c: WHITE,
      }));
    }

    /**
     * Flowing ribbons behind the points.
     *
     * Each ribbon is a bundle of closely-spaced strands sharing one path, so it
     * reads as a swept band of fine lines rather than a single stroke. Bands are
     * tilted and over-extended past the viewport on all sides, which is what
     * makes them fill corners instead of stopping at the edges.
     */
    type Ribbon = {
      base: number; // vertical anchor, as a fraction of height
      tilt: number; // vertical drift across the full width
      amp1: number;
      len1: number;
      amp2: number;
      len2: number;
      speed: number;
      phase: number;
      strands: number;
      spread: number; // px between strands
      alpha: number;
    };
    let ribbons: Ribbon[] = [];

    function seedCurves() {
      // Bands run from above the top to below the bottom so nothing terminates
      // inside the frame.
      const COUNT = 9;
      ribbons = Array.from({ length: COUNT }, (_, i) => {
        const t = i / (COUNT - 1);
        return {
          base: -0.25 + t * 1.5 + (Math.random() - 0.5) * 0.08,
          tilt: (Math.random() - 0.5) * height * 0.55,
          amp1: 90 + Math.random() * 190,
          len1: 620 + Math.random() * 900,
          amp2: 26 + Math.random() * 70,
          len2: 190 + Math.random() * 320,
          speed: 0.00005 + Math.random() * 0.00013,
          phase: Math.random() * Math.PI * 2,
          strands: 10 + Math.floor(Math.random() * 16),
          spread: 2.5 + Math.random() * 6,
          alpha: 0.05 + Math.random() * 0.07,
        };
      });
    }

    function drawCurves(time: number) {
      const STEP = 14;
      for (const rb of ribbons) {
        const y0 = rb.base * height;
        const drift = time * rb.speed + rb.phase;

        for (let sIdx = 0; sIdx < rb.strands; sIdx++) {
          // Strands fan out from the bundle's spine, and each is scaled a
          // fraction differently so the band widens and narrows along its run.
          const offset = (sIdx - rb.strands / 2) * rb.spread;
          const scale = 1 + (sIdx - rb.strands / 2) * 0.012;

          ctx!.beginPath();
          for (let x = -STEP; x <= width + STEP; x += STEP) {
            const p = x / width;
            const y =
              y0 +
              offset +
              p * rb.tilt +
              Math.sin(x / rb.len1 + drift) * rb.amp1 * scale +
              Math.sin(x / rb.len2 - drift * 1.6) * rb.amp2;
            if (x <= 0) ctx!.moveTo(x, y);
            else ctx!.lineTo(x, y);
          }
          ctx!.strokeStyle = `rgba(255,255,255,${rb.alpha})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      seedCurves();
    }

    /** One static frame, for viewers who asked not to see motion. */
    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      drawCurves(0);
      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.c},0.3)`;
        ctx!.fill();
      }
    }

    const LINK = 130;

    function tick() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      drawCurves(performance.now());

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        // Rebound off the edges rather than wrapping, so motion stays contained.
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.18;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(${WHITE},${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }

      for (const p of points) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.c},0.42)`;
        ctx!.fill();
      }

      frame = requestAnimationFrame(tick);
    }

    function start() {
      cancelAnimationFrame(frame);
      if (reduced.matches) drawStatic();
      else frame = requestAnimationFrame(tick);
    }

    function onResize() {
      resize();
      start();
    }

    // Stop burning frames on a tab nobody is looking at.
    function onVisibility() {
      running = !document.hidden;
      if (running) start();
      else cancelAnimationFrame(frame);
    }

    resize();
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', start);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', start);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
