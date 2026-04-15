"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

export default function LoaderWrapper({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHomePage);

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading && isHomePage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading, isHomePage]);

  return (
    <>
      {isLoading && isHomePage && <LoadingScreen onFinish={() => setIsLoading(false)} />}
      <div className={isLoading && isHomePage ? "invisible" : "visible"}>
        {children}
      </div>
    </>
  );
}
