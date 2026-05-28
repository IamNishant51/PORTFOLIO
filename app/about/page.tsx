// Server component — no "use client" directive.
// Next.js streams the page shell to Googlebot immediately,
// then hydrates interactive parts (Navbar, GSAP) on the client.
import AboutClient from "./AboutClient";

export default function AboutPage() {
  return <AboutClient />;
}
