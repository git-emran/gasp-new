import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { HeroText } from "../components/HeroText";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `Expert in Enterprise Design / Development`;
  return (
    <section id="home" className="flex flex-col justify-between min-h-screen">
      <div className="flex mt-[10rem] justify-center">
        <HeroText />
      </div>
      <AnimatedHeaderSection
        subTitle={"Designer • Developer"}
        title={"Emran Hossain"}
        text={text}
        textColor={"text-black"}
      />
    </section>
  );
};

export default Hero;
