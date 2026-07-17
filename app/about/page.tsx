import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { AboutContent } from "@/components/about-content";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "About | Arup Technologies",
  description: "A hands-on digital partner for founders and growing teams across India.",
};

export default function AboutPage() {
  return <><SmoothScroll /><Nav /><main><AboutContent /><Contact /></main><Footer /></>;
}
