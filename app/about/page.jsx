import Image from "next/image";
import HoverLink from "../components/HoverLink";
import AboutVideos from "../components/AboutVideos";
import Testimonials from "../components/Testimonials";

export const metadata = {
  title: "Emran Hossain — About",
  description: "Passionate about clean architecture built to scale resulting in high-performance solutions from prototype to production.",
};

export default function AboutPage() {
  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-transparent text-black dark:text-white min-h-screen flex flex-col">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex flex-row justify-between items-center px-7 pt-4 pb-2 mb-6">
        <div className="flex flex-row gap-6">
          <HoverLink
            preset="work"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/"
          >
            Work
          </HoverLink>
          <HoverLink
            preset="hero"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/timeline"
          >
            Timeline
          </HoverLink>
          <HoverLink
            preset="about"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
            href="/about"
          >
            About
          </HoverLink>
          <HoverLink
            preset="notes"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/notes"
          >
            Notes
          </HoverLink>
          <HoverLink
            preset="interactions_nav"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
            href="/interaction-archive"
          >
            Interactions
          </HoverLink>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="bg-transparent text-lg dark:text-white flex-1 w-full">
        <div className="grid grid-cols-12 px-7">
          <div className="col-span-12 md:col-span-11 lg:col-span-7 max-w-screen-lg pb-5 leading-relaxed">
            {/* Page Header */}
            <h1 className="text-4xl font-serif mb-12 mt-4 tracking-tight font-bold text-black dark:text-white">
              About
            </h1>

            {/* Content Statement & Bio */}
            <div className="mb-10 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose">
              <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed mb-6">
                I AM PASSIONATE ABOUT CLEAN ARCHITECTURE BUILT TO SCALE RESULTING IN HIGH-PERFORMANCE SOLUTIONS FROM PROTOTYPE TO PRODUCTION
              </p>
              <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed">
                I build fast, intuitive apps from pixel-perfect interfaces to backends that scale. Seven years across B2B SaaS, AI/ML products, and developer tooling taught me the same lesson every time: the best code is the kind users never have to think about.
              </p>
            </div>

            {/* Profile Image */}
            <div className="mb-12 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose">
              <Image
                src="/images/man.png"
                alt="Emran Hossain"
                width={1364}
                height={1782}
                priority
                unoptimized
                className="w-full max-w-md rounded-none mb-0"
                style={{ color: "transparent" }}
              />
            </div>

            {/* Videos Showcase */}
            <div className="mb-16 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose">
              <h3 className="font-serif text-2xl font-bold mb-6 text-black dark:text-white">
                Videos
              </h3>
              <AboutVideos />
            </div>

            {/* Testimonials */}
            <div className="mb-16 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose">
              <h3 className="font-serif text-2xl font-bold mb-6 text-black dark:text-white">
                Testimonials
              </h3>
              <Testimonials />
            </div>

            {/* Personal / Off-duty Interests */}
            <div className="mb-16 xl:mr-60 lg:mr-30 md:mr-10 max-w-prose">
              <h3 className="font-serif text-2xl font-bold mb-6 text-black dark:text-white">
                When I’m not shipping production grade solutions:
              </h3>
              <ul className="space-y-4 text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 select-none">⚡️</span>
                  <span>
                    Open-sourcing my latest experiment (or riffing on yours)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 select-none">🎥</span>
                  <span>
                    Teaching UX &amp; Dev fundamentals on{" "}
                    <HoverLink
                      href="https://adplist.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      preset="writer"
                      className="text-black hover:underline dark:text-white font-medium"
                    >
                      ADPList
                    </HoverLink>{" "}
                    — rising tide lift all ships
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 select-none">🧗</span>
                  <span>
                    Rock climbing (problem-solving with real stakes)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 select-none">🎸</span>
                  <span>
                    Strumming chords while CI pipelines pass (multitasking at its finest)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Fixed Right Navigation */}
          <div className="hidden md:block md:fixed md:right-8 md:top-4 lg:col-span-2 lg:col-start-11 md:col-span-2 md:col-start-12 col-span-12 pt-4 pb-20 transition-opacity z-20">
            <div className="flex flex-col items-end text-right md:mt-0 mt-6">
              <HoverLink
                preset="work"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/"
              >
                Work
              </HoverLink>
              <HoverLink
                preset="hero"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/timeline"
              >
                Timeline
              </HoverLink>
              <HoverLink
                preset="about"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
                href="/about"
              >
                About
              </HoverLink>
              <HoverLink
                preset="notes"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/notes"
              >
                Notes
              </HoverLink>
              <HoverLink
                preset="interactions_nav"
                className="mb-8 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/interaction-archive"
              >
                Interactions
              </HoverLink>
              <HoverLink
                preset="linkedin"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
              >
                LinkedIn
              </HoverLink>
              <HoverLink
                preset="github"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/git-emran"
              >
                GitHub
              </HoverLink>
              <HoverLink
                preset="instagram"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/designwithemran/"
              >
                Instagram
              </HoverLink>
              <HoverLink
                preset="blog"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                href="https://my-blog-omega-ashy.vercel.app/"
              >
                Blog
              </HoverLink>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex flex-row flex-wrap px-7 py-2 pb-10 w-full">
        <HoverLink
          preset="linkedin"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
        >
          LinkedIn
        </HoverLink>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <HoverLink
          preset="github"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/git-emran"
        >
          GitHub
        </HoverLink>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <HoverLink
          preset="instagram"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/designwithemran/"
        >
          Instagram
        </HoverLink>
        <span className="mx-1 text-lg text-gray-400 dark:text-gray-500">/</span>
        <HoverLink
          preset="blog"
          className="text-left no-underline text-lg dark:text-white inline-block transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://my-blog-omega-ashy.vercel.app/"
        >
          Blog
        </HoverLink>
      </nav>
    </main>
  );
}
