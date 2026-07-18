import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { ServicesHero } from "@/components/services-hero";
import { ServicesCylinder } from "@/components/services-cylinder";
import { ServicesTransition } from "@/components/services-transition";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Services — Arup Technologies",
  description:
    "Websites, digital marketing, SEO, software and app development, and AI + workflow automation. Six services, one team, one honest process.",
};

export default function ServicesPage() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <ServicesHero />
        <ServicesCylinder />
        <ServicesTransition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
