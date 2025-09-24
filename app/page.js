"use client";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Skills from "./sections/Skills";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import Testimonials from "./components/Testimonials";

const Page = () => {
  return (
    <ReactLenis root className="min-h-screen">
      <div className="w-full">
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
