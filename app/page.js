import Image from "next/image";
import HoverLink from "./components/HoverLink";

export default function Home() {
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
            preset="about"
            className="text-lg no-underline hover:underline dark:text-white dark:hover:text-gray-300"
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
          <div className="col-span-11 lg:col-span-7 md:col-span-9 max-w-screen-lg pb-5 leading-relaxed">
            {/* Hero / Intro */}
            <div className="xl:mr-60 lg:mr-30 md:mr-20 max-w-prose">
              <h1 className="font-serif font-extrabold md:text-8xl text-7xl mt-0 mb-6 text-black dark:text-white tracking-tight -mr-[calc(100%/11)] md:mr-0">
                Emran Hossain
              </h1>
              <div className="leading-relaxed">
                I&apos;m a designer and full-stack developer who builds high-performance, polished digital products. Most recently, I designed and engineered solutions for{" "}
                <HoverLink
                  href="https://getgenie.ai"
                  preset="ai"
                  className="underline underline-offset-4 decoration-1 decoration-gray-400 hover:decoration-black dark:hover:decoration-white transition-colors"
                >
                  GetGenie
                </HoverLink>{" "}
                (AI content assistant), the{" "}
                <HoverLink
                  href="https://fujifilmbiotechnologies.fujifilm.com/"
                  preset="biotech"
                  className="underline underline-offset-4 decoration-1 decoration-gray-400 hover:decoration-black dark:hover:decoration-white transition-colors"
                >
                  FujiFilm Diosynth
                </HoverLink>{" "}
                biotech laboratory platform, and{" "}
                <HoverLink
                  href="https://apps.apple.com/us/app/insidemaps-capture/id1077854108"
                  preset="spatial"
                  className="underline underline-offset-4 decoration-1 decoration-gray-400 hover:decoration-black dark:hover:decoration-white transition-colors"
                >
                  InsideMaps
                </HoverLink>{" "}
                spatial capture. As a design technologist, I bridge the gap between creative visual craft, robust component architecture, and production frontend systems.
              </div>
              <div className="mt-4 leading-relaxed mb-16">
                In lots of parts of my life, I&apos;m a generalist. I like helping teams move faster and be more ambitious together: imagining novel solutions, obsessing over interaction details, and shipping software that users love using.
              </div>
            </div>

            {/* Articles Stream */}

            {/* Project 1: GetGenie */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="ai"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/get-genie"
                >
                  <span className="font-medium">GetGenie AI</span>
                </HoverLink>
                {" — "}
                <span>
                  WordPress Gutenberg-based AI writing assistant. I designed and engineered an interactive, responsive workspace bridging complex LLM pipelines directly into the editor workflow with custom state synchronization to eliminate block crashes.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="GetGenie AI"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/get_genie1.gif"
                  />
                </div>
              </div>
            </article>

            {/* Project 2: Writer */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="writer"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/writer-app"
                >
                  <span className="font-medium">Writer — Canvas & Markdown Workspace</span>
                </HoverLink>
                {" — "}
                <span>
                  A thinking environment designed for deep work. Combines a distraction-free markdown editor with an infinite diagramming canvas, integrated Kanban board, and language server intelligence.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="Writer Workspace"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/emran_project_writer.gif"
                  />
                </div>
              </div>
            </article>

            {/* Project 3: FujiFilm Diosynth */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="biotech"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/fujifilm-dashboard"
                >
                  <span className="font-medium">FujiFilm Diosynth Laboratory Dashboard</span>
                </HoverLink>
                {" — "}
                <span>
                  A multi-tiered, data-intensive dashboard for biotech laboratories. Re-architected non-linear information flows into an Atomic Design system with role-based UI and offline session caching for on-the-go tablet operations.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-0 md:mb-6 md:col-span-6 col-span-12">
                  <Image
                    alt="FujiFilm Dashboard Before"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/before-fuji.webp"
                  />
                </div>
                <div className="mb-6 md:mb-0 md:col-span-6 col-span-12">
                  <Image
                    alt="FujiFilm Dashboard After"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/after-fuji.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 4: InsideMaps Capture */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="spatial"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/insidemaps-capture"
                >
                  <span className="font-medium">InsideMaps Capture</span>
                </HoverLink>
                {" — "}
                <span>
                  iOS application transforming room photography into interactive 3D tours. Conducted quantitative and qualitative user research across real estate appraisers to redesign asset capture mechanics and streamline AR guidance.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="InsideMaps Capture"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/im-2.gif"
                  />
                </div>
              </div>
            </article>

            {/* Project 5: MatchTrack */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="tennis"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/match-track"
                >
                  <span className="font-medium">MatchTrack</span>
                </HoverLink>
                {" — "}
                <span>
                  React Native mobile SaaS for tennis academies in Denmark. Streamlined athlete metric monitoring, tournament scheduling, and equipment inventory into a fast, 3-step navigation system.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-0 md:mb-6 md:col-span-6 col-span-12">
                  <Image
                    alt="MatchTrack Navigation"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/mt-4.webp"
                  />
                </div>
                <div className="mb-6 md:mb-0 md:col-span-6 col-span-12">
                  <Image
                    alt="MatchTrack User Flows"
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/mt-5.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 6: The Office Outlet */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="office"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/office-outlet"
                >
                  <span className="font-medium">The Office Outlet</span>
                </HoverLink>
                {" — "}
                <span>
                  Interactive workstation space planning and e-commerce web application for the UAE market. Users can drag and drop ergonomic furniture elements into a virtual space and complete orders with live quotation estimates.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="The Office Outlet"
                    loading="lazy"
                    width={1200}
                    height={750}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/office1.gif"
                  />
                </div>
              </div>
            </article>

            {/* Project 7: InsideMaps Website Redesign */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="redesign"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/case-study/insidemaps-redesign"
                >
                  <span className="font-medium">InsideMaps — UX & Platform Redesign</span>
                </HoverLink>
                {" — "}
                <span>
                  Re-architecting the web presence and user onboarding flow for a legacy 3D spatial platform. Redesigned information architecture from the ground up, boosting conversion and app activations by 80%.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-6 col-span-12">
                  <Image
                    alt="InsideMaps UX & Platform Redesign"
                    loading="lazy"
                    width={1200}
                    height={750}
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/redesign1.webp"
                  />
                </div>
              </div>
            </article>

            {/* Project 8: Interaction Design Archive */}
            <article className="mb-12 my-12">
              <div className="mb-6 mt-6 leading-relaxed xl:mr-60 lg:mr-30 max-w-prose md:mr-20">
                <HoverLink
                  preset="interaction"
                  className="text-black hover:underline dark:text-white dark:hover:text-gray-300"
                  href="/interaction-archive"
                >
                  <span className="font-medium">Interaction Design & Spatial Prototypes</span>
                </HoverLink>
                {" — "}
                <span>
                  An experimental collection of micro-interactions, gesture mechanics for VisionOS and iPadOS, custom mobile animation primitives, and tactile UI patterns.
                </span>
              </div>
              <div className="grid grid-cols-12 md:gap-6 gap-2 -mr-[calc(100%/11)] md:mr-0">
                <div className="mb-0 md:mb-6 md:col-span-6 col-span-12">
                  <Image
                    alt="VisionOS Gestures"
                    loading="lazy"
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/visionos1.gif"
                  />
                </div>
                <div className="mb-6 md:mb-0 md:col-span-6 col-span-12">
                  <Image
                    alt="iPadOS Dock Animation"
                    loading="lazy"
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full rounded-none mb-0"
                    style={{ color: "transparent" }}
                    src="/assets/projects/ipados2.gif"
                  />
                </div>
              </div>
            </article>
          </div>

          {/* Desktop Fixed Right Navigation */}
          <div className="hidden md:block md:fixed md:right-8 md:top-4 lg:col-span-2 lg:col-start-11 md:col-span-2 md:col-start-12 col-span-12 pt-4 pb-20 transition-opacity z-20">
            <div className="flex flex-col items-end text-right md:mt-0 mt-6">
              <HoverLink
                preset="work"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300 font-medium"
                href="/"
              >
                Work
              </HoverLink>
              <HoverLink
                preset="about"
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
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
