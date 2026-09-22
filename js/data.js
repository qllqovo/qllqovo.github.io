/* ============================================================
   qllqovo.github.io — data layer
   Default content seeded from the owner's résumé (2026.09).
   All edits are persisted to localStorage under QL_DATA_KEY.
   ============================================================ */
"use strict";

const QL_DATA_KEY = "qllqovo_site_v1";
const QL_AUTH_KEY = "qllqovo_auth_v1";

/* Owner credentials — client-side check (static-site demo) */
const QL_ACCOUNT = "15161557667";
const QL_PASSWORD = "lyx20051130";

function uid(prefix) {
  return (prefix || "id") + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
}

const DEFAULT_DATA = {
  meta: {
    name: "廖羽瑄",
    enName: "Liao Yuxuan",
    nickname: "qllqovo",
    role: "Electrical Engineering · Jiangnan University",
    location: "Wuxi, Jiangsu, China",
    email: "2191762356@qq.com",
    phone: "15161557667",
    tagline: "Circuit-minded builder, event-stage storyteller, always curious."
  },

  about: {
    portrait: "",
    headline: "An engineer who designs, tests and tells.",
    intro: [
      "I am an undergraduate in Electrical Engineering & Automation at Jiangnan University, graduating in 2027. My work sits at the intersection of hardware fundamentals and digital products — from dual-carbon energy platforms to big-stage events.",
      "I enjoy turning technical language into something clients can feel: clean front-end interfaces, readable test reports, and smooth on-site execution. I adapt fast, care about detail, and keep learning new tools on every project."
    ],
    facts: [
      { k: "Name", v: "廖羽瑄 · Liao Yuxuan" },
      { k: "Born", v: "Nov 2005" },
      { k: "Education", v: "B.Eng. Electrical Engineering & Automation, Jiangnan University (2023–2027)" },
      { k: "Location", v: "Wuxi, Jiangsu, China" },
      { k: "Email", v: "2191762356@qq.com" },
      { k: "Phone", v: "15161557667" }
    ],
    education: [
      { time: "2023.09 – 2027.06", org: "Jiangnan University", role: "B.Eng. Electrical Engineering & Automation", desc: "Circuit analysis, system modelling, data processing and platform development fundamentals." }
    ],
    experience: [
      { time: "2026.07 – 2026.08", org: "GL Green Technology (Wuxi) Co., Ltd.", role: "R&D Specialist", desc: "Designed the front-end of two dual-carbon platforms (Energy-Carbon Management & PV Storage), wrote system test cases, BUG lists and test reports, and supported cross-department coordination." },
      { time: "2026.01 – 2026.02", org: "Zhi'ao East-West Exhibition (Wuxi) Co., Ltd.", role: "Marketing Specialist", desc: "Wrote market research and WeChat official-account copy, produced report decks, and assisted the live production of the 3rd Pet Doctor CNY Gala." }
    ],
    awards: [
      { time: "2025.05", name: "Runner-up, “Shen Yuan Cup” Campus Debate Competition" },
      { time: "2024.11", name: "First Prize, Top Ten Dance Competition (group)" },
      { time: "2023.11", name: "Second Prize, Professional Growth Data Analysis Competition" }
    ],
    languages: [
      { name: "English", level: "Fluent — workable as a working language for technical communication" },
      { name: "French / Korean", level: "Learning experience, cross-cultural communication" }
    ]
  },

  projects: [
    {
      id: "p1",
      title: "Energy-Carbon & PV-Storage Platform — Front-end Design & Testing",
      role: "Dual-platform front-end architecture, business data visualisation, test-case writing & BUG tracking",
      period: "2026.07 – 2026.08",
      description: "GL Green Technology's core digital platforms in response to the national “dual carbon” strategy. I joined the full product cycle as an R&D core member — from requirement analysis and page development to system testing.",
      highlights: [
        "Researched dual-carbon policies and competitors, delivered 10+ research documents; independently designed page layouts and interaction logic for both platforms.",
        "Integrated with the back-end team on API contracts, resolved data-rendering latency and format issues.",
        "Wrote the platform test-case result report, verified system functions, tracked the BUG list and pushed issues to closure."
      ],
      tags: ["Front-end", "Data Visualisation", "System Testing"]
    },
    {
      id: "p2",
      title: "3rd Pet Doctor CNY Gala — “Good Veterinarian AI Assistant”",
      role: "On-site shooting support & equipment debugging",
      period: "2026.02",
      description: "A large annual online gala in the pet-care industry, produced by Zhi'ao East-West Exhibition, involving director, camera, venue and recording teams.",
      highlights: [
        "Supported on-site filming and device debugging to keep the recording smooth.",
        "Co-wrote WeChat official-account articles for long-tail event reach."
      ],
      tags: ["Event Ops", "Content", "Equipment"]
    },
    {
      id: "p3",
      title: "Sponsorship & Business Cooperation Programme",
      role: "Negotiation lead — sponsorship resources, offline promotion & rights delivery",
      period: "2024.03 – 2024.04",
      description: "Solved the budget and material needs of the college's annual flagship event as the core member of the outreach department.",
      highlights: [
        "Independently approached 10+ local merchants (dining, retail, cultural), reached intent with 3, securing about ¥5,000 in materials and funds.",
        "Led the “Outreach Welfare Day” offline campaign, covering 300+ students in a single session.",
        "Boosted the department's official account followers by 25%."
      ],
      tags: ["Negotiation", "Sponsorship", "Events"]
    },
    {
      id: "p4",
      title: "College Freshmen Welcome Gala — Programme Coordination & Stage Execution",
      role: "Programme review & on-site execution lead",
      period: "2024.09 – 2024.12",
      description: "The college's largest annual offline event, spanning multiple departments and a complex stage AV system.",
      highlights: [
        "Coordinated 10+ programme rehearsals and schedules; personal programmes won Top-Ten Dance group third prize (2023) and first prize (2024).",
        "Served as the bridge between the art troupe and colleges, logistics and venue teams.",
        "Led stage scheduling, guest seating, lighting/sound monitoring and emergency plans."
      ],
      tags: ["Event Production", "Leadership", "Coordination"]
    },
    {
      id: "p5",
      title: "Campus Debate Tournament System — Full Lifecycle Delivery",
      role: "Tournament organiser — standardised rules, multi-college coordination, venue & judges",
      period: "2024.09 – 2025.06",
      description: "A three-tier system: “Freshman Cup”, “Exhibition Match” and the university-level debate league. I owned the whole lifecycle from research and rule design to on-site delivery.",
      highlights: [
        "Designed 4 differentiated rule sets; built an entry-level topic pool and training plan for freshmen, plus points-elimination and judge-avoidance rules for the league.",
        "As vice-captain of the university debate team and captain of the college team, coordinated venues, judges, schedules and materials.",
        "Ran 100-person-scale events (hosting, timing, scoring, devices, check-in) with contingency plans; the “select-train-compete-review” loop won the university runner-up."
      ],
      tags: ["Project Management", "Debate", "Operations"]
    }
  ],

  blog: [],

  contact: {
    note: "Whether it is a role, a collaboration, or just a hello — my inbox is always open. I usually reply within a day.",
    items: [
      { k: "Email", v: "2191762356@qq.com", link: "mailto:2191762356@qq.com" },
      { k: "Phone", v: "15161557667", link: "tel:15161557667" },
      { k: "Location", v: "Wuxi, Jiangsu, China", link: "" },
      { k: "GitHub", v: "github.com/qllqovo", link: "https://github.com/qllqovo" }
    ]
  },

  skills: [
    {
      category: "Engineering & Systems",
      sub: "Core discipline",
      items: [
        { name: "Circuit analysis & system modelling", level: 80 },
        { name: "Inverter & PV system fundamentals", level: 70 },
        { name: "Data processing & platform development flow", level: 78 }
      ]
    },
    {
      category: "Product & Design",
      sub: "What I build",
      items: [
        { name: "Front-end page design & interaction", level: 82 },
        { name: "Business data visualisation", level: 80 },
        { name: "PPT & document production", level: 88 }
      ]
    },
    {
      category: "Testing & Quality",
      sub: "How I verify",
      items: [
        { name: "Test-case writing & BUG tracking", level: 84 },
        { name: "System test reports & quality closure", level: 82 }
      ]
    },
    {
      category: "Communication & Collaboration",
      sub: "How I work",
      items: [
        { name: "Cross-department coordination", level: 90 },
        { name: "Client-facing communication", level: 86 },
        { name: "Event & stage operations", level: 85 }
      ]
    },
    {
      category: "Languages",
      sub: "How I connect",
      items: [
        { name: "English — fluent (working language)", level: 85 },
        { name: "French / Korean — learning", level: 40 }
      ]
    }
  ],

  music: {
    note: "A small playlist of tracks I keep on repeat. Signed-in owner can add songs.",
    playlist: []
  },

  footprint: {
    note: "Cities I have lived, studied or visited. Click a lit city to leave a note.",
    cities: [
      { id: "c1", name: "Wuxi", country: "China", lat: 31.4912, lng: 120.3119, lit: true, comments: [] }
    ]
  },

  guestbook: {
    shakePool: [
      "If your life were a book, which chapter are you in right now?",
      "What is a small thing that made you smile this week?",
      "Which city do you dream of living in for a year?",
      "What skill would you learn if time were free?",
      "What does your ideal Sunday look like?",
      "Which song do you never skip?",
      "What is a project you are secretly proud of?",
      "If you could ask the world one question, what would it be?",
      "What is the best advice you have ever received?",
      "Where should I travel next — and why?",
      "What does 'home' mean to you?",
      "What are you curious about lately?"
    ],
    entries: []
  }
};

/* ---------- storage helpers ---------- */
function loadData() {
  try {
    const raw = localStorage.getItem(QL_DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return deepMerge(structuredClone(DEFAULT_DATA), parsed);
    }
  } catch (e) {
    console.warn("Failed to load stored data, using defaults.", e);
  }
  return structuredClone(DEFAULT_DATA);
}

function saveData(data) {
  try {
    localStorage.setItem(QL_DATA_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Failed to save data (storage may be full).", e);
    toast("Storage is full — image may be too large.");
    return false;
  }
}

function deepMerge(base, over) {
  if (Array.isArray(base) && Array.isArray(over)) return over;
  if (over && typeof over === "object" && base && typeof base === "object") {
    const out = { ...base };
    for (const k of Object.keys(over)) {
      out[k] = deepMerge(base[k], over[k]);
    }
    return out;
  }
  return over === undefined ? base : over;
}

/* ---------- auth ---------- */
function isLoggedIn() {
  return localStorage.getItem(QL_AUTH_KEY) === "1";
}
function doLogin(account, password) {
  if (String(account).trim() === QL_ACCOUNT && String(password) === QL_PASSWORD) {
    localStorage.setItem(QL_AUTH_KEY, "1");
    return true;
  }
  return false;
}
function doLogout() {
  localStorage.removeItem(QL_AUTH_KEY);
}

/* ---------- tiny helpers ---------- */
function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
