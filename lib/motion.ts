// lib/motion.ts — shared motion tokens calibrated to DESIGN.md §6 and BUILD-PLAN.md §5

export const easings = {
  move: "cubic-bezier(0.22, 1, 0.36, 1)",
  entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
  wipe: "cubic-bezier(0.76, 0, 0.24, 1)",
  soft: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

export const durations = {
  hoverIn: 0.09,
  hoverOut: 0.14,
  quick: 0.16,
  standard: 0.22,
  calm: 0.32,
  slow: 0.42,
  reveal: 0.7,
  plate: 1.5,
  scene: 1.2,
  ambient: 2.4,
} as const;
