// content/method.ts — Four steps from CONTENT.md §6

export interface MethodStep {
  step: string;
  title: string;
  body: string;
}

export const methodSteps: MethodStep[] = [
  {
    step: "01",
    title: "Find the real question.",
    body: "Write down the core human problem before reaching for an interface or framework.",
  },
  {
    step: "02",
    title: "Make the small version.",
    body: "Connect one useful path end to end immediately.",
  },
  {
    step: "03",
    title: "Follow the friction.",
    body: "Watch edge cases, sluggish frames, and moments the software demands unnecessary cognitive load.",
  },
  {
    step: "04",
    title: "Edit. Then edit again.",
    body: "Keep the necessary essence. Polish typography, layout, performance.",
  },
];
