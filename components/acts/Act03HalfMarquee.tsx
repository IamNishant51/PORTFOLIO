import { MarqueeStrip } from "@/components/primitives/MarqueeStrip";

export function Act03HalfMarquee() {
  const stackItems = [
    "REACT 19",
    "NEXT.JS 15",
    "TYPESCRIPT",
    "AUTONOMOUS AGENTS",
    "MODEL CONTEXT PROTOCOL",
    "COGNEE KNOWLEDGE GRAPHS",
    "OLLAMA LOCAL INFERENCE",
    "VS CODE EXTENSION API",
    "GSAP & SCROLLTRIGGER",
    "FASTIFY & NODE.JS",
    "SQLITE & FASTAPI",
    "BROWSER AUTOMATION",
  ];

  return <MarqueeStrip items={stackItems} />;
}
