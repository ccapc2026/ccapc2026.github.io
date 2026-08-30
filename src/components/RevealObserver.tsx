'use client';

import { useEffect } from 'react';

/**
 * Reveals anything marked `data-reveal` as it scrolls into view.
 *
 * Mounted once, it watches every marked element rather than wrapping each one
 * in its own component — so the boxes stay server-rendered with no extra DOM.
 * Elements entering together are staggered slightly so a row of boxes arrives
 * in sequence instead of all at once.
 */
export default function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No observer support, or motion is unwanted: show everything immediately.
    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const arriving = entries.filter((e) => e.isIntersecting);
        arriving.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 4) * 80}ms`;
          el.classList.add('is-visible');
          // Once shown, stop watching — this should not replay on scroll-up.
          observer.unobserve(el);
        });
      },
      // Fire a little before the element is fully on screen.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
