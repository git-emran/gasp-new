import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { HeroText } from "../components/HeroText";
import { Link, Text } from "@radix-ui/themes";
import MatrixRain from "../components/MatrixRain";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `Expert in Enterprise Design - Development`;
  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0">
        <MatrixRain height="85vh" />
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
