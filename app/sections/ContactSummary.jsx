import { useRef } from "react";
import Marquee from "../components/Marquee";

const ContactSummary = () => {
  const containerRef = useRef(null);
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "Design",
    "Development",
    "Design",
    "Development",
    "Design",
  ];

  return (
    <section
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 py-16"
    >
      <Marquee items={items} />
      <div className="overflow-hidden font-light text-center contact-text-responsive">
        <p>
          “Together, Let’s build <br />
          <span className="font-normal">Software</span> that looks stunning,{" "}
          <span className="italic">feels Intuitive</span> <br />
          and performs <span className="text-gold">flawlessly</span> “
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="text-white bg-black border-y-2 border-white/10"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
