import type { ReactNode } from 'react';

export function Section({
  eyebrow,
  title,
  children,
  className = '',
  id,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-10">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}

export function CTA({
  href,
  children,
  variant = 'primary',
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  external?: boolean;
}) {
  const styles =
    variant === 'primary'
      ? 'bg-cca-red text-white hover:bg-cca-red/90'
      : 'border border-white/20 text-white/80 hover:border-white/40 hover:text-white';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors ${styles}`}
    >
      {children}
    </a>
  );
}

/**
 * A box with a header strip over a body — the layout unit the rest of the page
 * is built from. Boxes tile: paired side by side, or run full width.
 */
export function Box({
  title,
  eyebrow,
  children,
  className = '',
  id,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      data-reveal
      className={`overflow-hidden rounded-3xl border border-white/12 bg-white/[0.055] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.95)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-md ${className}`}
    >
      <header className="border-b border-white/12 bg-white/[0.07] px-8 py-6 sm:px-11 sm:py-7">
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h2>
      </header>
      <div className="px-8 py-8 sm:px-11 sm:py-11">{children}</div>
    </section>
  );
}

/** Wrapper that gives a run of boxes consistent gutters. */
export function BoxGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto grid w-full max-w-[88rem] gap-8 px-5 sm:gap-10 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
