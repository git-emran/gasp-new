import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { HoverBackgroundProvider } from "./components/HoverBackgroundProvider";
import ScrollToTopFab from "./components/ScrollToTopFab";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Emran Hossain",
  description: "Portfolio and design engineering work by Emran Hossain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="stylesheet" href="https://use.typekit.net/rku4zxn.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(prefers-color-scheme: dark)');if(m.matches){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-D2ZF2LF7V8" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D2ZF2LF7V8');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white min-h-screen`}
      >
        <HoverBackgroundProvider>
          {children}
          <ScrollToTopFab />
        </HoverBackgroundProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
