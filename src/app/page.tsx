import { Hero } from "@/components/home/Hero";
import { Models } from "@/components/home/Models";
import { Stats } from "@/components/home/Stats";
import { Features } from "@/components/home/Features";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { Gallery } from "@/components/home/Gallery";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Models />
      <Stats />
      <Features />
      <VideoShowcase />
      <Gallery />
      <CallToAction />
    </>
  );
}
