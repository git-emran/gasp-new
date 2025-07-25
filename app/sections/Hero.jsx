import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `Expert in Enterprise Design / Development`;
  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
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
