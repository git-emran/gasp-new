import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { HeroText } from "../components/HeroText";
import { Link, Text } from "@radix-ui/themes";
import MatrixRain from "../components/MatrixRain";
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const text = `Expert in Enterprise Design - Development`;
  const matrixHeight = mounted && isMobile ? "55vh" : "85vh";
  const matrixDensity = mounted && isMobile ? 0.5 : 1;

  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0">
        <MatrixRain height={matrixHeight} density={matrixDensity} />
      </div>
      <AnimatedHeaderSection
        subTitle={"Design • Engineering"}
        title={"Emran Hossain"}
        text={text}
        textColor={"text-black"}
      />

    </section>
  );
};

export default Hero;
