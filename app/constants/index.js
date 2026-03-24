// index.js

export const skillsData = [
  {
    title: "Design & Fullstack Development",
    description:
      "I develop custom web apps with clean Design, Architecture, Optimized Databases, and Seamless integrations—ensuring reliability at every layer.",
    items: [
      {
        title: "Frontend Excellence",
        description: "(React, Vue, TypeScript, Vanilla JS, Interactive UI/UX)",
      },
      {
        title: "Backend Engineering",
        description: "(REST/GraphQL APIs, Microservices, Auth Systems)",
      },
      {
        title: "Database Design",
        description: "(SQL/NoSQL Optimization, Scalable Structures)",
      },
    ],
  },
  {
    title: "DevOps & Cloud Solutions",
    description:
      "I can automate infrastructure, enforce security, and leverage cloud platforms (AWS/Azure) to keep your softwares running smoothly—24/7, at any scale.",
    items: [
      {
        title: "CI/CD Pipelines",
        description: "(GitHub Actions, Docker, Kubernetes)",
      },
      {
        title: "Server Management ",
        description: "(Linux, Nginx, Load Balancing)",
      },
      {
        title: "Performance Tuning",
        description: "(Caching, Compression, Lighthouse 90+ Scores)",
      },
    ],
  },
  {
    title: "Security & Optimization",
    description:
      "I harden security (XSS/SQLI protection, OAuth) and optimize bottlenecks so your app stays fast, safe, and scalable as you grow.",
    items: [
      {
        title: "Code Audits",
        description: "(Refactoring, Tech Debt Cleanup)",
      },
      {
        title: "Pen Testing",
        description: "(Vulnerability Assessments)",
      },
      {
        title: "SEO Tech Stack",
        description: "(SSR, Metadata, Structured Data)",
      },
    ],
  },
  {
    title: "Web & Mobile Apps",
    description:
      "A clunky interface can sink even the best ideas. I craft responsive, pixel perfect web and mobile apps (React Native/Flutter) that users love—bridging design and functionality seamlessly.",
    items: [
      {
        title: "Cross-Platform Apps",
        description: "(Single codebase for iOS/Android/Web)",
      },
      {
        title: "PWAs",
        description: "(Offline mode, Push Notifications)",
      },
      {
        title: "E-Commerce",
        description: "(Checkout flows, Payment Gateways, Inventory APIs)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "GetGenie - AI Content Manager",
    slug: "get-genie",
    description:
      "WordPress Gutenberg based AI Plugin. Perfect for generating SEO optimized content for your websites and Blogs. ",
    href: "/case-study/get-genie",
    image: "/assets/projects/get_genie1.gif",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "Web-app" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
    visitUrl: "https://getgenie.ai",
    caseStudy: {
      role: "Sr Designer & Frontend Developer",
      team: "Engineering Lead, CTO, CEO, Sr Designer",
      techStack: "React, JavaScript, AntDesign",
      problemTitle: "Identifying the Gaps in a Crowded AI Market for Content Writers",
      problemContent: "Competitor analysis revealed linear, non-dynamic content generation flows, missing SEO integration, and limited user control over final outcomes.",
      problemImages: ["/assets/projects/genie_wireframe.webp"], // Example multi-image
      solutionTitle: "A One-Stop Shop for Content & SEO",
      solutionContent: "Designed and developed a streamlined 'One-Click Blog Wizard' that generates SEO-optimized posts in 60 seconds, integrated AI Image Magic for visual content, and implemented 'Head-to-Head Analysis' for SERP visualization.",
      solutionImages: [ "/assets/projects/get_genie1.gif","/assets/projects/genie-1.webp", "/assets/projects/genie_gif.gif", "/assets/projects/genie_2.webp", "/assets/projects/genie-4.webp", "/assets/projects/genie-trust.webp"],
      features: [
        "One-Click Blog Wizard: SEO-optimized blog posts from keyword in 60s.",
        "AI Image Magic: High-quality image generation via simple commands.",
        "SERP Visualization: Competitor analysis to identify and fill content gaps."
      ],
      resultsTitle: "Impact & Growth",
      resultsMetric: "10X",
      resultsContent: "Users reported a 10x increase in productivity. The tool was praised for its ease of use and comprehensive SEO + content creation capabilities. High Lighthouse scores achieved via code-splitting and memoization.",
    }
  },
  {
    id: 2,
    name: "FujiFilm Diosynth - Laboratory Dashboard",
    slug: "fujifilm-dashboard",
    description:
      "A Data intensive Dashboard for FujiFilm Biotech Laboratories. A multi-tiered and interactive web app redesigned.",
    href: "/case-study/fujifilm-dashboard",
    image: "/assets/projects/project1.png",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Dashboard" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "oAuth, JWT" },
    ],
    visitUrl: "https://fujifilmbiotechnologies.fujifilm.com/",
    caseStudy: {
      role: "Product Lead (Front-end & Design)",
      team: "Emran Hossain (Product Lead), CTO, Engineering Lead, Lab Operations Team",
      techStack: "React, GSAP, Atomic Design (Organisms & Templates), PWA features",
      problemTitle: "Navigating a Rigid & Fragmented BioTech Landscape",
      problemContent: "The initial state was a 'mess of interconnected tasks' where data points were haphazardly linked without hierarchy. Scientists and Lab Admins struggled with non-linear information flows and 'tasks within tasks' that made discovering the next logical step a cognitive burden.",
      solutionTitle: "Atomic Scalability & Thick Data Strategy",
      solutionContent: "Leveraged 'Thick Data' (qualitative user insights) to shape a personal, intuitive UX. Implemented an Atomic Design System specifically focusing on reusable Organisms and Templates to handle multi-tiered roles (Admin, Scientist, QC, Super Admin). Established a logical data tree to eliminate nested task confusion. Design system with atomic approach, Primarily focusing on building reusable components using the atomic design approach. Doubling down on Organisms and Templates mostly. It was important for Fujifilm to operate while being mobile, So responsiveness, saved sessions, cached data was very much important throughout the process.",
      solutionImages: ["/assets/projects/before-fuji.webp", "/assets/projects/after-fuji.webp", "/assets/projects/fuji-4.webp", "/assets/projects/fuji-5.webp", "/assets/projects/fuji-6.webp"],
      features: [
        "Dynamic Role-Based UI: Tailored dashboards for Admin, Scientist, QC, and Viewers.",
        "Atomic Organisms: Reusable, complex UI patterns that maintain consistency across workflows.",
        "Data-Driven Hierarchy: Logical mapping of 'interconnected data' to simplify nested tasks.",
        "Lab Mobility: PWA-like performance with saved sessions and cached data for on-the-go ops.",
        "Thick Data UX: Qualitative insights used to make high-tech tools feel 'fun to use'."
      ],
      resultsTitle: "The Resulting Transformation",
      resultsMetric: "100%",
      resultsContent: "Transformed wireframe chaos into a comprehensive, high-performance dashboard. The final product turned a biotech 'mess' into a system where everything finally 'makes sense', resulting in high user satisfaction and improved operational speed.",
    }
  },
  {
    id: 3,
    name: "InsideMaps Capture - Image capture & processing App",
    slug: "insidemaps-capture",
    description:
      "An iOS app to turn your images of your homes into interactive 3D tours. Ideal for Real estate appraisers",
    href: "/case-study/insidemaps-capture",
    image: "/assets/projects/Hero-Image-1.png",
    bgImage: "/assets/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "SwiftUI" },
      { id: 2, name: "iOS-app" },
      { id: 3, name: "ARkit" },
      { id: 4, name: "Core ML" },
    ],
    visitUrl: "https://apps.apple.com/us/app/insidemaps-capture/id1077854108",
    caseStudy: {
      role: "Frontend Developer, Product Designer",
      team: "iOS Team, AR Specialist",
      techStack: "SwiftUI, ARKit",
      problemTitle: "Redesigning the Asset Capture Feature",
      problemContent: "Revenue hits a roadblock when there is a genuine dissatisfaction from customers when using certain services in our application. And that is what happened to us. Our customers were not happy using our feature.",
      
      overview: "Insidemaps Capture is feature within the Insidemaps application. It’s main job is to make sure any user can complete the capturing process without any problem. But currently that is not the case, it is somewhat hard to navigate around the whole system.",
      
      researchTitle: "Quantitative & Qualitative Research",
      researchPhases: [
        {
          title: "Quantitative Research — Phase 1",
          content: "Initial phase was divided into two parts. Part 1 was mostly quantitative analysis where I interviewed a group of 20 people. Questions were carefully crafted to generate relevant data.",
          image: "/assets/projects/Hero-Image-1.png"
        },
        {
          title: "Big Data Analysis",
          content: "Deep dive into usage patterns and large scale user behavior to identify technical bottlenecks in the capture process.",
          image: "/assets/projects/im-1.webp"
        },
        {
          title: "Qualitative Research — Phase 2",
          content: "In-depth user interviews and direct observation of the capture flow to understand the emotional friction points.",
          image: "/assets/projects/im-3.webp"
        }
      ],

      solutionTitle: "Final Improvements",
      solutionContent: "These are the improvements I made after taking all the research into account.",
      solutionImages: ["/assets/projects/im-2.gif"],
      
      improvementSections: [
        {
          title: "Reducing Scanning Time",
          content: "Optimized the AR tracking and image processing pipeline to reduce the time needed for a full room scan.",
          image: "/assets/projects/im-4.webp"
        },
        {
          title: "Improving Picture Quality",
          content: "Implemented HDR enhancement and better auto-focus algorithms for sharper, more reliable assets.",
          image: "/assets/projects/im-5.webp"
        },
        {
          title: "Updated Reusable Components",
          content: "Redesigning the components library to fit the improved design and interaction.",
          image: "/assets/projects/im-6.webp"
        }
      ],

      resultsTitle: "The Resulting Transformation",
      resultsMetric: "100%",
      resultsContent: "Successfully improved user satisfaction scores and reduced session abandonment rates.",
      resultsImages: ["/assets/projects/im-7.webp", "/assets/projects/im-8.webp"]
    }
  },
  {
    id: 4,
    name: "MatchTrack - Team management App",
    slug: "match-track",
    description: "React Native mobile application for Tennis Coaches.",
    href: "/case-study/match-track",
    image: "/assets/projects/project3.png",
    bgImage: "/assets/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Mobile-App" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Firebase" },
      { id: 4, name: "SQLite" },
    ],
    visitUrl: "https://apps.apple.com/sg/app/matchtrack-tennis-score-keeper/id977481057",
    caseStudy: {
      role: "Lead Mobile Developer",
      team: "Mobile Designer, Backend Dev",
      techStack: "React Native, Firebase",
      problemTitle: "Designing a mobile app for the Sports Management Industry",
      problemContent: "A client wants to develop a SaaS app to manage professional Tennis athletes, track equipment, and monitor performance, improving team efficiency, specially in Denmark. The sports management software market is growing rapidly, valued at $5.96 billion in 2021 and projected to reach $24.09 bill ion by 2031, with a 15.1% CAGR.",
      overview: "A client wants to develop a SaaS app to manage professional Tennis athletes, track equipment, and monitor performance, improving team efficiency , specially in Denmark. The sports management software market is growing rapidly, valued at $5.96 billion in 2021 and projected to reach $24.09 billion by 2031, with a 15.1% CAGR. We aim to launch the product with a few unique selling point.",
      
      researchTitle: "Use cases are everything",
      researchPhases: [
        {
          title: "Started from an Excel sheet",
          content: "From an Excel sheet to the ideation stage, the idea was simple, driven by our belief in product-led growth. Our focus was on addressing the most critical use cases while ensuring the application remained intuitive to manage.",
          image: "/assets/projects/mt-1.webp"
        },
        {
          title: "User Interviews — Identifying use cases",
          content: "It is often fun and games when ideating but real challenge comes along when its time to put priority on things. So the question remains, where do we start from? I did some user interviews and came up with critical use cases. And that was the plan, to start with use cases and solve one high priority problem at a time.",
          image: "/assets/projects/mt-2.webp"
        }
      ],

      solutionTitle: "Taking Initiative",
      solutionContent: "Started with the prototype to focus on perfect navigation. Bringing in user insights early on.",
      solutionImages: ["/assets/projects/mt-3.webp"],
      
      improvementSections: [
        {
          title: "Easy to understand Navigation",
          content: "Clear navigation is essential for moving between tasks and getting things done quicker. I have iterated twice on this to find the perfect balance.",
          image: "/assets/projects/mt-4.webp"
        },
        {
          title: "Simplified user-flows",
          content: "Making sure critical sections are handled within 2–3 steps to reduce cognitive load. For example: in-app shopping experience is like a 3 step process. Easy to handle, faster checkouts.",
          image: "/assets/projects/mt-5.webp"
        },
        {
          title: "Easy Report",
          content: "Track and Generate Report to manage better.",
          image: "/assets/projects/mt-6.webp"
        }
      ],

      resultsTitle: "Retrospective",
      resultsMetric: "100%",
      resultsContent: "After the launch, we were very happy with the market response and the praises. Since this is a SaaS, we quickly iterated one last time to make sure it was perfectly scalable.",
      resultsImages: ["/assets/projects/mt-7.webp"]
    }
  },
  {
    id: 5,
    name: "The Office Outlet - E-Commerce",
    slug: "office-outlet",
    description: "A web app to decorate and buy your next workstation ",
    href: "/case-study/office-outlet",
    image: "/assets/projects/office1.gif",
    bgImage: "/assets/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Web-app" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
    visitUrl: "https://thetotaloffice.com/",
    caseStudy: {
      role: "Sr Designer/Researcher/Front-end Engineer",
      team: "Engineering Lead, CEO, Sr Designer/Researcher/Front-end Engineer (me)",
      techStack: "Next.js, GraphQL, Firebase",
      problemTitle: "Why we started This project",
      problemContent: "The current enterprise or personal Workstation space planning and interior design process in the UAE demographic is time-consuming, lacking visualization capabilities, and often leads to costly mistakes and waste. Users struggle to visualize and experiment with different design options, resulting in dissatisfaction after physical implementation. We saw the gap.",
      overview: "The Task was to create a web application that will help people drag and drop workstation items such as table, chairs etc to create a virtual workstation and then order that station just like what you created. Timeline was 6 months, but under my supervision and influence it was done within 5.",
      
      researchTitle: "Asking the right questions - Before Starting",
      researchPhases: [
        {
          title: "Strategic Q&A Session",
          content: "I make sure that I do not ask wrong questions as time is much valuable in a development lifecycle. For example: I try not to focus on the big picture on the first phase of the design process, I care about individual success of my component and features. So I created this Q&A session to strategically ask question to find smaller to bigger size bottlenecks.",
          image: "/assets/projects/office-1.webp"
        }
      ],

      solutionTitle: "Wire-framing, Designing & Testing",
      solutionContent: "Following a linear process was not feasible for us. So I did all of those things at the same time. I call it Iteration on the Go! I started with this style of wireframes and prototyped them fast to make sure every component has a purpose and the navigation flow makes sense.",
      solutionImages: ["/assets/projects/office-2.webp"],
      
      improvementSections: [
        {
          title: "Building out the components",
          content: "Following the Atomic Design Principle I start with the small stuff and build outward. Since this is a product that will be used by non technical people, design decision matters for maximum conversion.",
          image: "/assets/projects/office-3.webp"
        },
        {
          title: "Polishing the Design, UX and Usability",
          content: "At this point branding, color theory, text readability, touch target, hover animations, interaction design principles are introduced to ensure a smooth user experience.",
          image: "/assets/projects/office-4.webp"
        }
      ],

      resultsTitle: "Final Design",
      resultsMetric: "100%",
      resultsContent: "Final output was satisfactory because 100% user conversion rate during Q1 was outstanding result we never hoped for. Everyone who visited the website ended up ordering from the website. Initial launch was only inside Dubai. Later we expanded to the UAE region.",
      resultsImages: ["/assets/projects/office-5.webp"]
    }
  },
  {
    id: 6,
    name: "InsideMaps Website - UX Redesign",
    slug: "insidemaps-redesign",
    description: "An experience redesign of a Legacy website",
    href: "/case-study/insidemaps-redesign",
    image: "/assets/projects/redesign1.webp",
    bgImage: "/assets/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Website" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Chakra UI" },
    ],
    visitUrl: "https://www.insidemaps.com/",
    caseStudy: {
      role: "Lead Designer",
      team: "Lead Designer (me), CTO, Engineering Lead, Product Owner, 3 Jr Designers",
      techStack: "React, Chakra UI, Node.js",
      problemTitle: "Internal Usability Tests & Sitemap Redesign",
      problemContent: "The internal usability tests revealed several red flags, most notably with the existing Sitemap. The navigation flow was hindering the experience for newcomers, with disconnected information and confusing redirection.",
      overview: "As a lead Product designer, I was responsible for recreating the website navigation and improving the user conversion rate using a 5-phase approach: Discovery, Validate, Research, Design, Prototype/Validate, and Development.",
      
      researchTitle: "Discovery & Sitemap Strategy",
      researchPhases: [
        {
          title: "Internal Usability Testing",
          content: "A part of the Discovery phase for our focused team. We used internal validation before going to users to identify early structural issues.",
          image: "/assets/projects/im-web-1.webp"
        },
        {
          title: "Reimagining The Sitemap",
          content: "Moved from a fragmented '10,000 ft view' to a centralized information hub. Clear navigation flow: knowledge, resource, and pricing accessible directly from the start.",
          image: "/assets/projects/im-web-2.webp"
        }
      ],

      solutionTitle: "Interface & Layout Iteration",
      solutionContent: "Following a trail-and-error process where the first layout attempt didn't meet expectations, leading to a successful 'Take 2' using wire-frame prototypes and A/B testing with users.",
      solutionImages: ["/assets/projects/im-web-3.webp"],
      
      improvementSections: [
        {
          title: "A/B Testing & Take 2",
          content: "Second attempt tested at the root level with clickable wire-frame prototypes to ensure the navigation flow and user journey felt natural.",
          image: "/assets/projects/im-web-4.webp"
        },
        {
          title: "Responsiveness & Accessibility",
          content: "Implemented Aria attributes, keyboard navigation, color theory, and enhanced touch targets to ensure a seamless experience for everyone.",
          image: "/assets/projects/im-web-5.webp"
        },
        {
          title: "Atomic Design Implementation",
          content: "Built the UI from the ground up using atomic design principles: atoms (design tokens), molecules (patterns), organisms (modules), and finally templates and pages.",
          image: "/assets/projects/im-web-6.webp"
        }
      ],

      resultsTitle: "Impact & Results",
      resultsMetric: "80%",
      resultsContent: "User conversion and app downloads both increased by 80%. Specifically, 8 out of 10 visitors signed up, with 85% becoming long-term users—a testament to the cohesive experience between the website and the app I also designed.",
      resultsImages: ["/assets/projects/im-web-7.webp", "/assets/projects/im-web-8.webp", "/assets/projects/im-web-9.webp"]
    }
  },
  {
    id: 7,
    name: "Writer - Markdown Text Editor with Vim Motions ",
    slug: "writer-app",
    description:
      "A Markdown text editor that is powered by vim mitions, has built-in LSP for 10+ languages including Rust, Go, C++ and Java",
    href: "/case-study/writer-app",
    image: "/assets/projects/emran_project_writer.gif",
    bgImage: "/assets/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "desktop-app" },
      { id: 3, name: "Electron" },
      { id: 4, name: "Codemirror6" },
      { id: 5, name: "Typescript" },
    ],
    visitUrl: "https://github.com/git-emran/simple-notes",
    caseStudy: {
      role: "Solo Developer",
      team: "Solo Developer (Emran Hossain)",
      techStack: "Electron, React, CodeMirror 6, OpenAI API, MermaidJS",
      problemTitle: "The Need for a Fluid, Vim-Powered Markdown Experience",
      problemContent: "As a developer and Vim enthusiast, I found that existing markdown editors often lacked the fluidity of Vim motions combined with modern IDE features like LSP and AI assistance. Most tools were either too heavy or too limited for quick 'brain dumps' and disposable work.",
      overview: "Writer is a professional macOS desktop markdown application built for Vim enthusiasts. It bridges the gap between simple note-taking and high-level coding documentation, featuring a built-in LSP for 10+ languages, interactive canvas for diagrams, and AI-powered content generation.",
      
      researchTitle: "Product Vision & Developer Experience",
      researchPhases: [
        {
          title: "The Minimalist Developer Workflow",
          content: "Focusing on the core needs of a developer: fast syntax highlighting, Vim-native interactions, and a non-clunky interface for disposable notes and leetcode practice.",
          image: "/assets/projects/writer-4.png"
        },
        {
          title: "Expanding the Ecosystem (v2.02)",
          content: "Identifying the need for integrated Terminal, Task management and Visualization, leading to the addition of Kanban boards and the interactive Canvas system.",
          image: "/assets/projects/terminal.gif"
        }
      ],

      solutionTitle: "A Comprehensive Markdown Editor",
      solutionContent: "Developed a high-performance desktop application using Electron and CodeMirror 6, integrating specialized features like a context based AI writer, MermaidJS rendering, and a real-time progress tracking system.",
      solutionImages: ["/assets/projects/emran_project_writer.gif"],
      
      improvementSections: [
        {
          title: "Interactive Canvas & Visual Thinking",
          content: "Introduced an interactive environment to create flowcharts and diagrams, with the ability to export directly to PDF for documentation.",
          image: "https://github.com/user-attachments/assets/0fa0e1c1-89e4-4da1-8f6e-9150e95c5f55"
        },
        {
          title: "Task Management & Organization",
          content: "Built an integrated Kanban board and automated 'Daily Note' system, complemented by custom note statuses and specialized progress bars for checkbox lists.",
          image: "/assets/projects/writer-5.gif"
        },
        {
          title: "AI & LSP Integration",
          content: "Implemented 'Write with AI' powered by Open-router models and a full LSP suite for code completions and syntax diagnostics across multiple languages.",
          image: "/assets/projects/writer-ai.gif"
        }
      ],

      resultsTitle: "Community Response & Evolution",
      resultsMetric: "v2.02",
      resultsContent: "Successfully delivered a redesigned UI that balances aesthetics with functionality. High performance was achieved through memoization and filetree state persistence, making it a reliable daily tool for developers globally.",
      resultsImages: ["/assets/projects/writer-final.png"]
    }
  },
];
export const socials = [
  { name: "Insta", href: "https://www.instagram.com/designwithemran/" },

  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/emran-hossain-80ab17190/",
  },
  { name: "GitHub", href: "https://github.com/git-emran" },
  { name: "My Blog", href: "https://my-blog-omega-ashy.vercel.app/" },
];

export const testimonials = [
  {
    quote:
      "He had a knack for making our platform look great and work even better. Emran could take tricky concepts and turn them into designs that just clicked. He was super easy to work with and always ready to tackle problems. His mix of creativity and know-how really made a difference. We were lucky to have Emran on the team!",
    name: "Anders Tidemand",
    designation: "CEO, Tiblo Digital (Digital Mind)",
    src: "/images/anders.jpeg",
  },
  {
    quote:
      "MarketTime is a fast-paced company with ever-changing priorities, and Emran did an excellent job of juggling the demands provided to him by multiple Agile teams. His ability to adapt quickly while maintaining a high standard of work is truly impressive. Emran's leadership skills shine through in the way he inspires his team, always ready to step in and support wherever needed.",
    name: "Todd Litzman",
    designation: "CEO, MarketTime",
    src: "/images/todd.jpeg",
  },
  {
    quote:
      "Working with Emran was truly a pleasure. Emran displayed the ability to ask questions that not many others could. Solving customers pain points and making the best experience for them is truly Emrans passion and you can see that in his work output and in discussions with customers. He is truly an exceptional Design thinker and a Developer.",
    name: "Richard Wohnsiedler",
    designation: "Product Owner, ISN",
    src: "/images/rich.jpeg",
  },
  {
    quote:
      "He's an expert in blending killer design with serious coding chops. He didn’t just make our platform look good, he built functionality that ran like a dream. Emran could dive into the code, fix bugs, and optimize systems like a pro. He was awesome to work with, always ready to troubleshoot or tweak things on the fly. He has a creative edge.",
    name: "Anders Blomqvist",
    designation: "CTO, Tiblo Digital (Digital Mind)",
    src: "/images/anders2.jpeg",
  },
];
