"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Skills from "./sections/Skills";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";
import Testimonials from "./components/Testimonials";

const Page = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  return (
    <ReactLenis root className="min-h-screen overflow-hidden">
      <div>
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Works />
        <Skills />
        <About />
        <Testimonials />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default Page;
