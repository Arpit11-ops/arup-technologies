/**
 * Nav links use absolute paths so they work from any page.
 * On the Home page, the anchor targets scroll to the on-page section.
 * On sub-pages (e.g. /services), they route back to Home + scroll to the section.
 */
export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/#process", label: "How we work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const PROCESS_STEPS = [
  {
    label: "Discover",
    body:
      "A 30-minute call. No pitch deck. We ask what's stuck and what would change if it wasn't.",
  },
  {
    label: "Shape",
    body:
      "One week to lock scope, timeline, and cost. You approve the plan before we touch a pixel.",
  },
  {
    label: "Build",
    body:
      "Weekly demos, not monthly reports. You see progress live and course-correct while it's cheap.",
  },
  {
    label: "Optimize",
    body:
      "Ship isn't done. We watch the numbers and iterate on what's working, not what looked good in the mock.",
  },
];

export const BELIEFS = [
  {
    lead: "One team, not five.",
    body:
      "Every service you see on this page runs on the same roster. Nobody hands your project off to an account manager.",
  },
  {
    lead: "AI where it wins, hands-on where it counts.",
    body:
      "We use AI to move faster on the parts that scale, and stay in the room on the parts that matter. No slop shipped under our name.",
  },
  {
    lead: "Paid to move numbers.",
    body:
      "We measure on leads, revenue, and ROAS — not on decks delivered. If it isn't working, we tell you before you have to ask.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They fixed our website and our ads without making us hire two agencies. First month we saw the lead volume double.",
    name: "TODO — placeholder",
    role: "TODO — founder role",
    business: "TODO — client business",
    city: "TODO — city",
    placeholder: true,
  },
  {
    quote:
      "Weekly calls, real work shipped, honest conversations when something wasn't landing. Rare in this market.",
    name: "TODO — placeholder",
    role: "TODO — founder role",
    business: "TODO — client business",
    city: "TODO — city",
    placeholder: true,
  },
];
