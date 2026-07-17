import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export const metadata: Metadata = {
  title: "Contact | Arup Technologies",
  description: "Tell Arup Technologies what you are building, fixing, or trying to grow.",
};

export default function ContactPage() {
  return <><SmoothScroll /><Nav /><main><Contact standalone /></main><Footer /></>;
}
