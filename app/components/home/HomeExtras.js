"use client";
import dynamic from "next/dynamic";
import DropCountdown from "./DropCountdown";
import WhyInk3D from "./WhyInk3D";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import DiscordCTA from "./DiscordCTA";

const ProductCarousel3D = dynamic(() => import("./ProductCarousel3D"), { ssr: false });

export default function HomeExtras() {
  return (
    <>
      <ProductCarousel3D />
      <DropCountdown />
      <WhyInk3D />
      <HowItWorks />
      <FAQ />
      <DiscordCTA />
    </>
  );
}
