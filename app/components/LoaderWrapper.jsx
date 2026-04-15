"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      <div className={isLoading ? "invisible" : "visible"}>
        {children}
      </div>
    </>
  );
}
