import Image from "next/image";
import HoverLink from "../components/HoverLink";
import AboutVideos from "../components/AboutVideos";
import Testimonials from "../components/Testimonials";

export const metadata = {
  title: "Emran Hossain — About",
  description:
    "Product Design Lead and Design Engineer passionate about clean architecture built to scale, resulting in high-performance digital solutions.",
};

export default function AboutPage() {
  return (
    <main className="tracking-tight md:px-2 md:py-1 px-0 py-1 bg-transparent text-black dark:text-white min-h-screen flex flex-col font-sans">
      {/* Mobile Top Navigation */}
      <div className="md:hidden flex flex-row justify-between items-center px-7 pt-4 pb-2 mb-6">
        <div className="flex flex-row gap-5">
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
          <div className="col-span-12 md:col-span-11 lg:col-span-8 xl:col-span-8 max-w-4xl pb-24 leading-relaxed">
            {/* Top Bar Subheader */}
            <div className="flex flex-row justify-between items-baseline pt-4 pb-10 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
              <HoverLink
                href="/"
                preset="hero"
                className="font-normal text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white transition-colors"
              >
                Emran Hossain
              </HoverLink>
              <span className="text-right text-neutral-500 dark:text-neutral-400 font-mono text-xs md:text-sm">
                Product Design Lead · Copenhagen
              </span>
            </div>

            {/* Editorial Hero Statement */}
            <header className="mb-14">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                About &amp; Philosophy
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-black dark:text-white tracking-tight leading-[1.12] mb-6">
                Designing at the seam of taste, systems architecture, and production code.
              </h1>
              <p className="text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed tracking-tight max-w-3xl">
                I build fast, intuitive digital products from pixel-perfect interfaces to backend systems that scale. Over seven years spanning B2B SaaS, AI/ML tools, and developer platforms, I&apos;ve learned a single truth {" "}
                <span className="italic font-semibold text-black dark:text-white">
                  "A Good Software depends on how Intuitive it is".
                </span>
              </p>
            </header>

            {/* Bio & Portrait Composition */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16 pb-16 border-b border-neutral-200/80 dark:border-neutral-800">
              {/* Narrative Left Column */}
              <div className="lg:col-span-7 space-y-6 text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed">
                <p>
                  Most digital products lose their soul in handoff—between Figma canvases and Git pull requests. My work lives in the space where design and engineering are the same craft. I conceive systems with deep empathy for browser paint cycles, layout thrashing, and React reconciliation.
                </p>
                <p>
                  Whether leading the 0→1 UX for fleet platforms at{" "}
                  <HoverLink
                    href="https://tiblo.dk"
                    preset="hero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black dark:text-white underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                  >
                    Tiblo Digital
                  </HoverLink>
                  , engineering WordPress Gutenberg AI workspaces at{" "}
                  <HoverLink
                    href="/case-study/get-genie"
                    preset="ai"
                    className="font-medium text-black dark:text-white underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                  >
                    GetGenie AI
                  </HoverLink>
                  , or building high-throughput laboratory dashboards for{" "}
                  <HoverLink
                    href="/case-study/fujifilm-dashboard"
                    preset="biotech"
                    className="font-medium text-black dark:text-white underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                  >
                    FujiFilm Diosynth
                  </HoverLink>
                  , I bridge complex machine learning models directly into fluid, tactile user flows.
                </p>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-white tracking-tight">
                      7+
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 tracking-wider">
                      Years Craft
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-white tracking-tight">
                      1M+
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 tracking-wider">
                      Users Served
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-white tracking-tight">
                      0→1
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 tracking-wider">
                      To Production
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-black dark:text-white tracking-tight">
                      60fps
                    </div>
                    <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-1 tracking-wider">
                      Tactile Physics
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-base">
                  <HoverLink
                    href="/timeline"
                    preset="hero"
                    className="inline-flex items-center gap-1.5 font-medium text-black dark:text-white hover:underline underline-offset-4"
                  >
                    <span>Explore complete career history &amp; milestones in Timeline</span>
                    <span aria-hidden="true">→</span>
                  </HoverLink>
                </div>
              </div>

              {/* Portrait Column */}
              <div className="lg:col-span-5">
                <div className="w-full">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-transparent">
                    <Image
                      src="/images/man.png"
                      alt="Emran Hossain"
                      width={800}
                      height={1000}
                      priority
                      unoptimized
                      className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-medium text-base text-black dark:text-white">
                        Emran Hossain
                      </span>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        Copenhagen / Remote
                      </span>
                    </div>
                    <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Product Design Lead &amp; Engineer
                    </p>
                    <div className="mt-3 pt-3 border-t border-neutral-200/70 dark:border-neutral-800/80 flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Currently shipping at Tiblo Digital</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Philosophy / Standards Section */}
            <section className="mb-16 pb-16 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Principles
                </span>
                <h2 className="text-3xl font-serif font-bold text-black dark:text-white mt-1 mb-2">
                  How I Build &amp; Think
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                  Four foundational standards that dictate every interface, architectural decision, and design system.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 block mb-2">
                    01 / ARCHITECTURE
                  </span>
                  <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                    Clean Architecture at Scale
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Systems engineered to endure. Unidirectional data flow, isolated UI state, and resilient component boundaries that withstand sudden user spikes without requiring rewrites.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 block mb-2">
                    02 / PERFORMANCE
                  </span>
                  <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                    Speed as a Core Feature
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Sweating the 16ms frame budget. Zero layout thrashing, virtualized renders, debounced network pipelines, and instant tactile feedback that make software feel weightless.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 block mb-2">
                    03 / CRAFT &amp; CODE
                  </span>
                  <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                    Zero Handoff Friction
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    No lost details between design canvas and pull request. Designing in Figma with full mechanical awareness of CSS layouts, React hooks, and API data structures.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 block mb-2">
                    04 / AUGMENTATION
                  </span>
                  <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                    Human-in-the-Loop AI
                  </h3>
                  <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Machine intelligence shouldn&apos;t hijack human workflows. Architecting context-aware assistants, explainable confidence signals, and optimistic previews that empower users.
                  </p>
                </div>
              </div>
            </section>

            {/* Videos Showcase */}
            <section className="mb-16 pb-16 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Media &amp; Walkthroughs
                </span>
                <h2 className="text-3xl font-serif font-bold text-black dark:text-white mt-1 mb-2">
                  Video Deep-Dives
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                  Recorded explorations covering design engineering systems, tactile micro-interactions, and product architecture philosophies.
                </p>
              </div>
              <AboutVideos />
            </section>

            {/* Testimonials */}
            <section className="mb-16 pb-16 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Endorsements
                </span>
                <h2 className="text-3xl font-serif font-bold text-black dark:text-white mt-1 mb-2">
                  What Leaders &amp; Peers Say
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                  Unfiltered feedback from CEOs, CTOs, and Product Owners I&apos;ve collaborated with across Denmark, the US, and global teams.
                </p>
              </div>
              <Testimonials />
            </section>

            {/* Personal / Off-duty Interests */}
            <section className="mb-16 pb-16 border-b border-neutral-200/80 dark:border-neutral-800">
              <div className="mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Off-Duty
                </span>
                <h2 className="text-3xl font-serif font-bold text-black dark:text-white mt-1 mb-2">
                  When I’m Not Shipping Production Code
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
                  Curiosities, experiments, physical problem solving, and music outside the terminal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1: Open Source */}
                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl select-none">⚡️</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Open Source
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                      Developer Tools &amp; Experiments
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                      Building and maintaining tools for the developer community, including{" "}
                      <span className="font-mono text-xs bg-neutral-200/60 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                        slides.nvim
                      </span>{" "}
                      (Neovim presentation engine) and{" "}
                      <span className="font-mono text-xs bg-neutral-200/60 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                        Writer
                      </span>{" "}
                      (Vim-native desktop markdown editor).
                    </p>
                  </div>
                  <div>
                    <HoverLink
                      href="https://github.com/git-emran"
                      target="_blank"
                      rel="noopener noreferrer"
                      preset="hero"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-black dark:text-white hover:underline underline-offset-4"
                    >
                      <span>View GitHub repositories</span>
                      <span aria-hidden="true">→</span>
                    </HoverLink>
                  </div>
                </div>

                {/* Card 2: Mentorship */}
                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl select-none">🎓</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Mentorship
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                      ADPList Community Mentor
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                      Teaching UX principles, design engineering mindsets, and frontend architecture to early-career designers and engineers around the globe.
                    </p>
                  </div>
                  <div>
                    <HoverLink
                      href="https://adplist.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      preset="writer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-black dark:text-white hover:underline underline-offset-4"
                    >
                      <span>Book a session on ADPList</span>
                      <span aria-hidden="true">→</span>
                    </HoverLink>
                  </div>
                </div>

                {/* Card 3: Rock Climbing */}
                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl select-none">🧗</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Movement
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                      Bouldering &amp; Rock Climbing
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      Problem-solving in physical space with real stakes. Testing route reading, micro-body mechanics, static balance, and mental persistence against gravity.
                    </p>
                  </div>
                </div>

                {/* Card 4: Guitar */}
                <div className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl select-none">🎸</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Acoustic
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-black dark:text-white mb-2">
                      Fingerstyle Guitar &amp; Riffs
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      Strumming chords and improvising acoustic melodies while CI/CD pipelines compile and automated test suites turn green. Multitasking at its finest.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Connect & Colophon */}
            <section className="mb-6">
              <div className="p-8 md:p-10 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">
                  Colophon &amp; Connect
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-black dark:text-white mb-4">
                  Let&apos;s build something exceptional.
                </h2>
                <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl mb-8">
                  Open for select product design advisory, 0→1 design engineering builds, and conversations about high-performance web systems.
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base">
                  <HoverLink
                    href="https://www.linkedin.com/in/emran-hossain-80ab17190/"
                    preset="linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black dark:text-white hover:underline underline-offset-4"
                  >
                    LinkedIn ↗
                  </HoverLink>
                  <HoverLink
                    href="https://github.com/git-emran"
                    preset="github"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black dark:text-white hover:underline underline-offset-4"
                  >
                    GitHub ↗
                  </HoverLink>
                  <HoverLink
                    href="https://my-blog-omega-ashy.vercel.app/"
                    preset="blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black dark:text-white hover:underline underline-offset-4"
                  >
                    Blog ↗
                  </HoverLink>
                  <HoverLink
                    href="https://www.instagram.com/designwithemran/"
                    preset="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-black dark:text-white hover:underline underline-offset-4"
                  >
                    Instagram ↗
                  </HoverLink>
                  <HoverLink
                    href="/timeline"
                    preset="hero"
                    className="font-medium text-black dark:text-white hover:underline underline-offset-4"
                  >
                    Timeline →
                  </HoverLink>
                </div>
              </div>
            </section>
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
                className="mb-2 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/interaction-archive"
              >
                Interactions
              </HoverLink>
              <HoverLink
                preset="terminal"
                className="mb-8 no-underline hover:underline dark:text-white dark:hover:text-gray-300"
                href="/dev"
              >
                Terminal mode
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
