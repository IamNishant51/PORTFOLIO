export const EASE = {
  power1: { in: "power1.in", out: "power1.out", inOut: "power1.inOut" },
  power2: { in: "power2.in", out: "power2.out", inOut: "power2.inOut" },
  power3: { in: "power3.in", out: "power3.out", inOut: "power3.inOut" },
  power4: { in: "power4.in", out: "power4.out", inOut: "power4.inOut" },
  elastic: (amp = 1, period = 0.3) => `elastic.out(${amp}, ${period})`,
  none: "none",
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  xslow: 1.2,
} as const;

export function magneticEffect(
  el: HTMLElement,
  e: MouseEvent,
  strength = 0.3
) {
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * strength;
  const y = (e.clientY - rect.top - rect.height / 2) * strength;
  import("gsap").then((mod) =>
    mod.default.to(el, { x, y, duration: DURATION.fast, ease: EASE.power2.out })
  );
}

export function magneticReset(el: HTMLElement) {
  import("gsap").then((mod) =>
    mod.default.to(el, {
      x: 0,
      y: 0,
      duration: DURATION.slow,
      ease: EASE.elastic(1, 0.3),
    })
  );
}

export async function counter(
  obj: { current: number },
  target: number,
  duration = 2
) {
  const mod = await import("gsap");
  return mod.default.to(obj, {
    current: target,
    duration,
    ease: EASE.power2.out,
    roundProps: "current" as never,
  });
}
