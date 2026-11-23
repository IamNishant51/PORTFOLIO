"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * The Colonnade — the site's intro.
 *
 * Built from the award-winning preloader pattern (hairline progress +
 * colonnade split reveal): one paper plate, one serif wordmark rising
 * from its masks, one 1px terracotta hairline tracking real loading
 * (fonts + hero images, capped), and a small odometer-reel number in
 * the corner. At 100 the plate parts along its own columns and the
 * hero — already painted underneath — is revealed, its entrance
 * starting while the columns are still lifting.
 *
 * It plays once per session, never on return navigation, and is skipped
 * entirely under prefers-reduced-motion. Total time to a readable hero
 * is capped at ~2.5s; Escape or click skips it immediately.
 */

// Module-level flag: once the intro has played (or been skipped) in this
// JS session it never plays again — even if the user navigates away
// mid-intro and comes back. sessionStorage is the second guard (it
// survives a full reload in the same tab).
let introSeen = false;
const SEEN_KEY = "preloader-seen";

function markSeen() {
  introSeen = true;
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
}

function hasSeen(): boolean {
  if (introSeen) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

const HERO_PORTRAIT =
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/hero-slit-portrait.webp";
const HERO_SKY =
  "https://ik.imagekit.io/9pfz6g8ri/portfolio-images-for-imagekit/assets/02-act1-arrival/a1-sky-plate.webp";

export function Preloader() {
  const pathname = usePathname();
  // Render-time check: if the intro was already seen, never render it —
  // not even for one frame (no flash on reload or return navigation).
  const [hidden, setHidden] = useState<boolean>(() => pathname !== "/" || hasSeen());
  const [percent, setPercent] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tensReelRef = useRef<HTMLDivElement>(null);
  const onesReelRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const skipRef = useRef<() => void>(() => {});

  useEffect(() => {
    // Not the homepage: nothing to do.
    if (pathname !== "/") {
      setHidden(true);
      document.body.style.overflow = "";
      return;
    }

    const dispatchHero = () => {
      window.dispatchEvent(new CustomEvent("preloader-flight-start"));
      window.dispatchEvent(new CustomEvent("preloader-docked"));
    };

    // Already seen: skip the intro, but still wake the hero entrance.
    // The hero's timeline is paused until it hears these events, and the
    // dispatch is deferred a frame so Act01Arrival has attached its
    // listeners by the time they fire.
    if (hasSeen()) {
      setHidden(true);
      document.body.style.overflow = "";
      requestAnimationFrame(dispatchHero);
      return;
    }

    // Reduced motion: no intro at all; the hero shows in its final state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markSeen();
      setHidden(true);
      document.body.style.overflow = "";
      requestAnimationFrame(dispatchHero);
      return;
    }

    // --- First visit: play the intro ---
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    const lenis = (
      window as unknown as { lenis?: { stop(): void; start(): void } }
    ).lenis;
    lenis?.stop();

    let cancelled = false;
    const progress = { val: 0 };

    // Transform-only progress: the hairline fill scales, the counter
    // digits move on reels. No textContent rewrite per frame.
    const setProgress = (v: number) => {
      const p = Math.max(0, Math.min(100, Math.round(v)));
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${p / 100})`;
      }
      const tens = Math.floor(p / 10);
      const ones = p % 10;
      if (tensReelRef.current) {
        tensReelRef.current.style.transform = `translateY(-${(tens / 11) * 100}%)`;
      }
      if (onesReelRef.current) {
        onesReelRef.current.style.transform = `translateY(-${(ones / 10) * 100}%)`;
      }
      setPercent((prev) => (prev === p ? prev : p));
    };

    // Entrance: the name rises from its masks, line by line.
    const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });
    introTl.fromTo(
      [line1Ref.current, line2Ref.current],
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.1 },
      0.05
    );
    introTl.fromTo(
      [tagRef.current, metaRef.current, bottomRef.current],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0.35
    );

    // Honest progress: wait for the fonts and the hero images, with a
    // cap so a slow asset never holds the page hostage. A failed decode
    // counts as arrived.
    const decode = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          img.decode().then(() => resolve()).catch(() => resolve());
        };
        img.onerror = () => resolve();
        img.src = src;
      });
    const gate = Promise.race([
      Promise.all([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        decode(HERO_PORTRAIT),
        decode(HERO_SKY),
      ]),
      new Promise((resolve) => setTimeout(resolve, 2200)),
    ]);

    let exitTl: gsap.core.Timeline | null = null;

    const runExit = (fast = false) => {
      if (completedRef.current) return;
      completedRef.current = true;
      markSeen();
      document.body.style.overflow = "";
      lenis?.start();
      // Hero handoff: its entrance starts as the columns lift.
      dispatchHero();

      const cols = columnsRef.current.filter(Boolean);
      exitTl = gsap.timeline({
        onComplete: () => {
          setHidden(true);
          ScrollTrigger.refresh();
        },
      });
      // Content lifts away first.
      exitTl.to(
        [
          line1Ref.current,
          line2Ref.current,
          tagRef.current,
          metaRef.current,
          bottomRef.current,
        ],
        {
          yPercent: -130,
          opacity: 0,
          duration: fast ? 0.3 : 0.45,
          stagger: 0.05,
          ease: "power3.in",
        },
        0
      );
      // Then the colonnade parts, centre-out, revealing the hero.
      exitTl.to(
        cols,
        {
          yPercent: -100,
          duration: fast ? 0.6 : 0.9,
          stagger: {
            amount: fast ? 0.18 : 0.25,
            from: "center",
            ease: "power2.inOut",
          },
          ease: "expo.inOut",
        },
        0.12
      );
      exitTl.to(containerRef.current, { opacity: 0, duration: 0.25 }, "-=0.2");
    };

    skipRef.current = () => runExit(true);

    // Count to 92, hold there until the real assets are ready, then
    // finish the count and lift the colonnade.
    const countTween = gsap.to(progress, {
      val: 92,
      duration: 1.15,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!cancelled) setProgress(progress.val);
      },
      onComplete: () => {
        if (cancelled) return;
        gate.then(() => {
          if (cancelled) return;
          gsap.to(progress, {
            val: 100,
            duration: 0.35,
            ease: "power2.out",
            onUpdate: () => {
              if (!cancelled) setProgress(progress.val);
            },
            onComplete: () => {
              if (cancelled) return;
              setProgress(100);
              setTimeout(() => runExit(false), 120);
            },
          });
        });
      },
    });

    // Hard safety: never hold the page longer than 3 seconds.
    const safety = setTimeout(() => {
      if (!cancelled) runExit(false);
    }, 3000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") runExit(true);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelled = true;
      // Leaving mid-intro still counts as seen — coming back never
      // replays it.
      markSeen();
      clearTimeout(safety);
      countTween.kill();
      introTl.kill();
      exitTl?.kill();
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [pathname]);

  if (pathname !== "/" || hidden) return null;

  return (
    <aside
      ref={containerRef}
      onClick={() => skipRef.current()}
      className="fixed inset-0 z-[100] w-screen h-[100dvh] overflow-hidden select-none cursor-pointer bg-paper"
      aria-label="Site introduction"
    >
      {/* The colonnade: five paper panels on desktop, three on mobile.
          They are the exit — they part, centre-out, to reveal the hero. */}
      <div
        className="absolute inset-0 w-full h-full flex pointer-events-none"
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              columnsRef.current[idx] = el;
            }}
            className={`relative h-full bg-paper border-r border-hairline/60 last:border-r-0 will-change-transform ${
              idx >= 3 ? "hidden sm:block w-1/5" : "w-1/3 sm:w-1/5"
            }`}
          />
        ))}
      </div>

      {/* Content: one wordmark, one hairline, one number. Nothing else. */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col justify-between py-8 sm:py-10 pb-[calc(2rem+env(safe-area-inset-bottom))] pointer-events-none">
        {/* Top meta row */}
        <div
          ref={metaRef}
          className="flex items-center justify-between font-mono text-[0.6875rem] text-muted tracking-[0.18em] uppercase"
        >
          <span className="text-ink font-medium">Portfolio — 2027</span>
          <span>18°31'N — 73°51'E</span>
        </div>

        {/* Wordmark, left-aligned and asymmetric, like the rest of the site */}
        <div className="flex flex-col items-start my-auto">
          <div className="overflow-hidden">
            <span
              ref={line1Ref}
              className="block font-serif text-ink leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,8vw,7rem)] will-change-transform"
            >
              Nishant
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={line2Ref}
              className="block font-serif italic text-terracotta leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,8vw,7rem)] will-change-transform"
            >
              Unavane
            </span>
          </div>
          <p
            ref={tagRef}
            className="mt-5 font-mono text-[0.6875rem] text-muted tracking-[0.18em] uppercase"
          >
            Software, made by hand
          </p>
        </div>

        {/* Bottom: hairline progress + counter + skip */}
        <div ref={bottomRef} className="flex flex-col gap-3">
          <div
            className="relative h-px w-full bg-hairline"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Loading"
          >
            <div
              ref={fillRef}
              className="absolute inset-y-0 left-0 w-full bg-terracotta origin-left will-change-transform"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono text-[0.6875rem] text-muted tracking-[0.18em] uppercase">
              [ Esc or click to skip ]
            </span>
            <div className="flex items-baseline gap-1">
              <div className="flex items-baseline font-serif text-3xl sm:text-4xl text-ink leading-none h-[1em] overflow-hidden">
                <div
                  ref={tensReelRef}
                  className="flex flex-col will-change-transform"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                    <span
                      key={d}
                      className="h-[1em] flex items-center justify-center"
                    >
                      {d === 10 ? "10" : d}
                    </span>
                  ))}
                </div>
                <div
                  ref={onesReelRef}
                  className="flex flex-col will-change-transform"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                    <span
                      key={d}
                      className="h-[1em] flex items-center justify-center"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-terracotta text-sm font-semibold">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
