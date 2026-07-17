import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { ServicesHero } from "@/components/services-hero";
import { ServiceDetail } from "@/components/service-detail";
import { ServicesTransition } from "@/components/services-transition";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SERVICES } from "@/lib/services";

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
        {SERVICES.map((s, i) => (
          <ServiceDetail
            key={s.slug}
            service={s}
            index={i}
            dark={i % 2 === 0}
            reverse={i % 2 === 1}
          />
        ))}
        <ServicesTransition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
