import AnimatedHeaderSection from "./AnimatedHeaderSection";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { testimonials } from "../constants";

const Testimonials = () => {
  const text =
    "Winning comes from using each other's strengths and covering each other's weaknesses.";
  return (
    <section id="testimonials" className="flex flex-col min-h-screen pb-10">
      <AnimatedHeaderSection
        title={"Testimonials"}
        subTitle={"Kind words from my colleagues"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="pb-10">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
