import FeaturedPieces from "@/components/homecomponent/FeaturedPieces";
import Hero from "@/components/homecomponent/Hero";
import OurPhilosophy from "@/components/homecomponent/Philosophy";
import Navwrapper from "@/components/Navwrapper/NavFooter";

export default function Home() {
  return (
    <>
      <Navwrapper>
        <Hero />
        <OurPhilosophy />
        <FeaturedPieces />
      </Navwrapper>
    </>
  );
}
