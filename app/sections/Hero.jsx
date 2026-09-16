import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import VideoPlayer from "../components/VideoPlayer";

const Hero = () => {
  const text = `Expert in Enterprise Design & Development`;

  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen overflow-hidden">
      {/* Modern High-Tech Video Player */}
      <div className="relative z-10 w-full mb-4 sm:mb-8 mt-24">
        <VideoPlayer />
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
