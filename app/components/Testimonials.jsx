"use client";

import React from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { testimonials } from "../constants";

export default function Testimonials({ className = "" }) {
  return (
    <div className={`w-full ${className}`}>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
