export type Service = {
  slug: string;
  name: string;
  short: string;
  long: string;
  /** 3–5 concrete deliverables. Used on /services detail sections. */
  included: string[];
  /** One-line typical timing. Used on /services detail sections. */
  timing: string;
  /** Pre-filled WhatsApp message tuned to this service. */
  whatsappMessage: string;
  mockup: {
    src: string;
    alt: string;
    frame: "laptop" | "phone" | "monitor" | "tablet";
    /** Real work Arup did (true) vs. designed placeholder (false). */
    real: boolean;
    caption: string;
  };
};

export const SERVICES: Service[] = [
  {
    slug: "websites",
    name: "Websites",
    short: "Landing pages and Shopify stores that convert.",
    long:
      "Fast, on-brand websites and Shopify stores built to sell. Everything from a one-page landing to a full multi-page store, wired end to end with analytics and clean handovers.",
    included: [
      "Design, copy direction, and page structure — no template kits",
      "Next.js or Shopify build with real page-speed optimization",
      "Analytics wired: GA4, Meta pixel, event tracking on every CTA",
      "SEO fundamentals baked in — metadata, sitemap, structured data",
      "Clean CMS or admin handover so your team can edit without us",
    ],
    timing: "Landing pages 2–3 weeks · Shopify stores 4–6 weeks",
    whatsappMessage: "Hi Arup — I'd like to talk about a website / Shopify store.",
    mockup: {
      src: "/mockups/nomorechemfear.webp",
      alt: "NoMoreChemFear — chemistry tutoring site built by Arup",
      frame: "laptop",
      real: true,
      caption: "NoMoreChemFear · nomorechemfear.com",
    },
  },
  {
    slug: "digital-marketing",
    name: "Digital marketing",
    short: "Meta and Google, plus the creative that carries them.",
    long:
      "Paid ads that get measured on ROAS, not vanity metrics. Creative built in-house — every campaign has its own visual voice, not a template swap.",
    included: [
      "Campaign strategy on Meta, Google, and LinkedIn where it fits",
      "Static + reel creative produced in-house, not stock-swapped",
      "Landing pages tuned to each campaign, not just repurposed",
      "Weekly reporting on ROAS, CAC, and pipeline — not impressions",
      "Ongoing budget and creative iteration based on what's working",
    ],
    timing: "Kickoff in 1 week · monthly retainer thereafter",
    whatsappMessage: "Hi Arup — I'd like to talk about ads / digital marketing.",
    mockup: {
      src: "/mockups/bakkit-poster.webp",
      alt: "BAKKIT Cashew & Pista Millet Cookies — World Milk Day creative Arup produced for Cave Man",
      frame: "phone",
      real: true,
      caption: "BAKKIT · Cave Man Foods",
    },
  },
  {
    slug: "seo",
    name: "SEO",
    short: "Technical fixes and content that earn page one.",
    long:
      "Site audits, on-page fixes, content strategy, and clean link acquisition. We report on rankings and organic traffic, not on how many articles we shipped.",
    included: [
      "Technical audit — Core Web Vitals, crawl issues, index bloat",
      "Keyword strategy tied to real search intent, not tool suggestions",
      "On-page optimization and internal linking rebuild",
      "Content plan for 6–12 months, written by us or briefed to your team",
      "Monthly ranking, traffic, and conversion reporting",
    ],
    timing: "Audit 2 weeks · retainer usually 6-month minimum",
    whatsappMessage: "Hi Arup — I'd like to talk about SEO.",
    mockup: {
      src: "/mockups/seo-mock.svg",
      alt: "Illustrative SEO dashboard concept — not a specific client engagement",
      frame: "monitor",
      real: false,
      caption: "Concept — SEO reporting",
    },
  },
  {
    slug: "software",
    name: "Software development",
    short: "Custom web apps and internal tools, shipped in weeks.",
    long:
      "Modern stacks, clean handovers, and honest scope conversations. From MVPs to internal ops tools that replace a spreadsheet you shouldn't be running your business on.",
    included: [
      "Product shape + scope conversation before any code",
      "Modern stack — Next.js, Node, Postgres, TypeScript end to end",
      "Weekly demos and honest scope adjustments as we build",
      "Real deployment on Vercel, Railway, or your infra of choice",
      "Handover with docs and a 30-day support window included",
    ],
    timing: "MVPs 6–10 weeks · internal tools 3–6 weeks",
    whatsappMessage: "Hi Arup — I'd like to talk about software development.",
    mockup: {
      src: "/mockups/picl.webp",
      alt: "PICL — a 30-year IT integrator's marketing site rebuilt by Arup",
      frame: "laptop",
      real: true,
      caption: "PICL · pid.co.in",
    },
  },
  {
    slug: "apps",
    name: "App development",
    short: "iOS and Android from one codebase.",
    long:
      "React Native apps that feel native and ship faster than a two-team build. When your product needs a phone-shaped surface, we ship one that works.",
    included: [
      "React Native or Expo build — one codebase, both stores",
      "Native-feel navigation, gestures, and platform-appropriate polish",
      "Push notifications, deep linking, and analytics wired in",
      "App Store and Play Store submissions handled by us",
      "Post-launch OTA update pipeline so you ship fixes fast",
    ],
    timing: "MVPs 8–12 weeks · v1 launches 12–16 weeks",
    whatsappMessage: "Hi Arup — I'd like to talk about a mobile app.",
    mockup: {
      src: "/mockups/app-mock.svg",
      alt: "Illustrative mobile app concept — not a specific client build",
      frame: "phone",
      real: false,
      caption: "Concept — mobile app",
    },
  },
  {
    slug: "ai",
    name: "AI & workflow automation",
    short: "Custom GPTs, agents, and workflows with guardrails.",
    long:
      "AI systems designed with human checkpoints, claim review, and hallucination guards. Content ops, review pipelines, RAG assistants — real production, not a demo.",
    included: [
      "Workflow design — where AI fits, where it doesn't, honest scope",
      "Custom agents or GPTs with proper guardrails and human review gates",
      "RAG over your own docs — not another chatbot with a system prompt",
      "n8n / Zapier / custom orchestration wired to real business events",
      "Monitoring and iteration — we watch outputs and tune the prompts",
    ],
    timing: "Prototypes 2–4 weeks · production 6–10 weeks",
    whatsappMessage: "Hi Arup — I'd like to talk about AI / workflow automation.",
    mockup: {
      src: "/mockups/content-studio.webp",
      alt: "Content Studio — AI marketing OS Arup builds with human-review guardrails",
      frame: "monitor",
      real: true,
      caption: "Content Studio · AI marketing OS",
    },
  },
];
