import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Mission } from "@/components/about/Mission";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  title: "About — Tesla",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Mission />
      <Timeline />
      <Values />
      <CallToAction />
    </>
  );
}
