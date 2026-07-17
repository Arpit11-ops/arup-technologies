import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Why } from "@/components/why";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

// Testimonials intentionally omitted from v1. Placeholder proof undermines the
// trust arc the rest of the page builds. Re-add via `components/testimonials.tsx`
// in v1.1 once real quotes with real attribution are on hand.

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <Why />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
