export type ProjectType = "ux-case-study" | "product" | "technical";

export type Block =
  | { kind: "text"; heading: string; ja?: string; body: string[] }
  | { kind: "list"; heading: string; ja?: string; items: string[] }
  | { kind: "flow"; heading: string; ja?: string; steps: string[] }
  | { kind: "metrics"; heading: string; ja?: string; metrics: { from: string; to: string; label: string }[] }
  | { kind: "architecture"; heading: string; ja?: string; nodes: string[]; note?: string }
  | { kind: "terminal"; heading: string; ja?: string; lines: string[] }
  | { kind: "screens"; heading: string; ja?: string; screens: { title: string; meta: string; caption: string }[] }
  | { kind: "embed"; heading: string; ja?: string; label: string; href: string; note: string; iframe?: string };

export type Project = {
  id: string;
  index: string;
  title: string;
  ja: string;
  subtitle: string;
  category: string;
  type: ProjectType;
  year: string;
  role: string[];
  tools: string[];
  overview: string;
  sections: { id: string; label: string; blocks: Block[] }[];
  links: { label: string; sub?: string; href: string; primary?: boolean }[];
};

export const projects: Project[] = [
  {
    id: "easiway",
    index: "01",
    title: "EASIWAY",
    ja: "移動",
    subtitle: "Smart College Transport Management System",
    category: "Product ecosystem",
    type: "product",
    year: "2025",
    role: ["UX research", "Interaction design", "UI design", "Figma component library", "FlutterFlow app design", "System flow design"],
    tools: ["Figma", "FlutterFlow", "Firebase", "Firebase Realtime Database", "HTML", "CSS", "JavaScript", "Git"],
    overview:
      "A real-time college transportation experience designed to reduce uncertainty while students wait for buses.",
    sections: [
      {
        id: "overview",
        label: "OVERVIEW",
        blocks: [
          {
            kind: "text",
            heading: "Overview",
            ja: "概要",
            body: [
              "Real-time college bus tracking and transport management experience.",
              "Three connected roles share one system: student, driver, and admin.",
            ],
          },
          { kind: "list", heading: "Ecosystem roles", ja: "役割", items: ["Student", "Driver", "Admin"] },
        ],
      },
      {
        id: "problem",
        label: "PROBLEM",
        blocks: [
          {
            kind: "text",
            heading: "Problem",
            ja: "課題",
            body: [
              "Students need clearer information about where their buses are, which stops are next, and when they are likely to arrive.",
              "The system also needs connected experiences for drivers and admin staff.",
            ],
          },
          {
            kind: "flow",
            heading: "From uncertainty to confirmation",
            ja: "流れ",
            steps: ["WAITING STUDENT", "LIVE MAP", "BUS POSITION", "ETA", "CONFIRMATION"],
          },
        ],
      },
      {
        id: "process",
        label: "PROCESS",
        blocks: [
          {
            kind: "list",
            heading: "UX approach",
            ja: "過程",
            items: [
              "Personas for student, driver and admin",
              "Journey maps around the waiting moment",
              "Role-based flows",
              "Route exploration",
              "Information hierarchy for live data",
              "Live tracking experience design",
            ],
          },
          { kind: "list", heading: "My role", ja: "担当", items: ["UX research", "Interaction design", "UI design", "Figma component library", "FlutterFlow mobile app design", "System flow design"] },
        ],
      },
      {
        id: "design",
        label: "DESIGN",
        blocks: [
          {
            kind: "list",
            heading: "Features",
            ja: "機能",
            items: [
              "Real-time bus location",
              "Routes",
              "Stops",
              "Live tracking",
              "ETA",
              "Notifications",
              "Driver integration",
              "QR attendance",
              "Fee-management experience",
              "Admin management",
            ],
          },
        ],
      },
      {
        id: "tech",
        label: "TECH",
        blocks: [
          {
            kind: "architecture",
            heading: "System architecture",
            ja: "構造",
            nodes: ["DRIVER", "GPS", "FIREBASE", "STUDENT / ADMIN"],
            note: "Mobile experience assembled in FlutterFlow; live state held in Firebase Realtime Database.",
          },
        ],
      },
      {
        id: "outcome",
        label: "OUTCOME",
        blocks: [
          {
            kind: "text",
            heading: "Outcome",
            ja: "結果",
            body: [
              "A connected transport experience where students see live position, next stop and ETA instead of guessing.",
              "Driver and admin surfaces keep the same data honest across the ecosystem.",
            ],
          },
          {
            kind: "embed",
            heading: "Experience the system",
            ja: "体験",
            label: "SOURCE ARCHIVE",
            href: "https://github.com/manojch77/EASIWAY-PROJECT",
            note: "Live student, admin and QR attendance experiences are linked from the archive tabs.",
          },
        ],
      },
    ],
    links: [
      { label: "ENTER STUDENT EXPERIENCE", sub: "STUDENT", href: "https://manojch77.github.io/EasiWay-s/", primary: true },
      { label: "ENTER ADMIN EXPERIENCE", sub: "ADMIN", href: "https://manojch77.github.io/ADMIN/", primary: true },
      { label: "OPEN QR ATTENDANCE", sub: "QR", href: "https://manojch77.github.io/qr-code/", primary: true },
      { label: "GITHUB ↗", sub: "REPO", href: "https://github.com/manojch77/EASIWAY-PROJECT" },
    ],
  },
  {
    id: "raillo",
    index: "02",
    title: "RAILLO",
    ja: "催事",
    subtitle: "Event Registration & Management Platform",
    category: "Product / UI-UX",
    type: "product",
    year: "2025",
    role: ["UX research", "Personas", "Journey mapping", "Wireframing", "UI design", "Design system"],
    tools: ["Figma", "Design Systems", "Frontend", "HTML", "CSS", "JavaScript", "Firebase", "Git"],
    overview:
      "Event discovery and registration experience designed to simplify participant registration and reduce manual coordination.",
    sections: [
      {
        id: "overview",
        label: "OVERVIEW",
        blocks: [
          {
            kind: "text",
            heading: "Overview",
            ja: "概要",
            body: [
              "Event discovery and registration experience designed to simplify participant registration and reduce manual coordination.",
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "PROBLEM",
        blocks: [
          {
            kind: "text",
            heading: "Problem statement",
            ja: "課題",
            body: ["The existing event process involved a manual multi-step workflow."],
          },
          {
            kind: "list",
            heading: "Research inputs",
            ja: "調査",
            items: [
              "Interviews with 4 coordinators",
              "20 participants",
              "A 6-step manual flow",
              "Opportunity to reduce the workflow to 2 digital steps",
            ],
          },
        ],
      },
      {
        id: "process",
        label: "PROCESS",
        blocks: [
          { kind: "list", heading: "My role", ja: "担当", items: ["UX research", "Personas", "Journey mapping", "Wireframing", "UI design", "Design system"] },
          {
            kind: "flow",
            heading: "User flow",
            ja: "流れ",
            steps: ["DISCOVER EVENT", "VIEW DETAILS", "REGISTER", "CONFIRMATION", "TICKET"],
          },
        ],
      },
      {
        id: "design",
        label: "DESIGN",
        blocks: [
          {
            kind: "list",
            heading: "Key features",
            ja: "機能",
            items: [
              "Event discovery",
              "Event details",
              "Registration",
              "Confirmation",
              "Ticket experience",
              "Event management",
              "Reusable event cards",
              "Dashboards",
              "Registration forms",
              "Certificate generation",
              "Email distribution",
            ],
          },
        ],
      },
      {
        id: "tech",
        label: "TECH",
        blocks: [
          {
            kind: "text",
            heading: "Challenges",
            ja: "難所",
            body: [
              "The manual event workflow spread coordination across people, messages and spreadsheets.",
              "The digital experience folds those handoffs into a single registration path with automated certificate delivery.",
            ],
          },
        ],
      },
      {
        id: "outcome",
        label: "OUTCOME",
        blocks: [
          {
            kind: "metrics",
            heading: "Outcome",
            ja: "結果",
            metrics: [
              { from: "6 manual steps", to: "2 digital steps", label: "REGISTRATION FLOW" },
              { from: "3–5 days", to: "Instant", label: "CERTIFICATE DELIVERY" },
            ],
          },
        ],
      },
    ],
    links: [
      { label: "SOURCE ↗", sub: "SOURCE", href: "https://github.com/manojch77/Raillo" },
      { label: "ENTER RAILLO ↗", sub: "LIVE", href: "https://raillo.vercel.app/", primary: true },
    ],
  },
  {
    id: "greenzone",
    index: "03",
    title: "GREENZONE",
    ja: "食",
    subtitle: "Food Ordering Experience",
    category: "UX case study",
    type: "ux-case-study",
    year: "2025",
    role: ["Discovery", "Persona", "Journey mapping", "Information architecture", "Wireframes", "Design system", "High-fidelity UI", "Usability testing", "Accessibility"],
    tools: ["Figma", "Miro", "UX Research", "Design Systems"],
    overview:
      "A full UX process for a food ordering experience — from discovery and research through information architecture, wireframes, design system and high-fidelity interface.",
    sections: [
      {
        id: "overview",
        label: "OVERVIEW",
        blocks: [
          {
            kind: "text",
            heading: "Project overview",
            ja: "概要",
            body: [
              "A food ordering experience explored as a complete UX process rather than a build exercise.",
              "The work moves from understanding the problem to an accessible, tested interface.",
            ],
          },
        ],
      },
      {
        id: "problem",
        label: "PROBLEM",
        blocks: [
          {
            kind: "text",
            heading: "Problem statement",
            ja: "課題",
            body: [
              "Ordering food should be a short, confident decision. The existing experience made choosing, customising and confirming an order harder than it needed to be.",
            ],
          },
          {
            kind: "flow",
            heading: "The investigation",
            ja: "調査",
            steps: [
              "WHAT IS WRONG?",
              "WHAT ARE USERS STRUGGLING WITH?",
              "WHO ARE THE USERS?",
              "WHAT IS THEIR JOURNEY?",
              "HOW SHOULD INFORMATION BE ORGANISED?",
              "WHAT DOES THE WIREFRAME REVEAL?",
              "WHAT DOES THE DESIGN SYSTEM ESTABLISH?",
              "HOW DOES THE FINAL INTERFACE SOLVE IT?",
            ],
          },
        ],
      },
      {
        id: "process",
        label: "PROCESS",
        blocks: [
          { kind: "list", heading: "Research", ja: "研究", items: ["Discovery", "User pain points", "Persona", "Mental model", "Competitive analysis", "User journey"] },
          { kind: "list", heading: "Structure", ja: "構造", items: ["Information architecture", "User flow", "Low-fidelity wireframes"] },
          {
            kind: "embed",
            heading: "Research notes",
            ja: "研究ノート",
            label: "EXPLORE MIRO BOARD →",
            href: "https://miro.com/app/live-embed/uXjVH9uOQPw=/?embedMode=view_only_without_ui&moveToViewport=-10014,-3572,6533,3300&embedId=662091349947",
            note: "The research and wireframe board holds the raw investigation: pain points, persona work, journey and low-fidelity structure.",
            iframe: "https://miro.com/app/live-embed/uXjVH9uOQPw=/?embedMode=view_only_without_ui&moveToViewport=-10014,-3572,6533,3300&embedId=662091349947",
          },
        ],
      },
      {
        id: "design",
        label: "DESIGN",
        blocks: [
          { kind: "list", heading: "Design system", ja: "体系", items: ["Type scale and hierarchy", "Colour and state tokens", "Reusable components", "Spacing and layout rules"] },
          {
            kind: "embed",
            heading: "Figma case study",
            ja: "設計資料",
            label: "OPEN FIGMA CASE STUDY ↗",
            href: "https://www.figma.com/design/tGMpOwOJyNCzPjFHmWPSKB/GREENZONE-UI?node-id=0-1&t=pttOcdQkKFV914ir-1",
            note: "The full GreenZone UI file — wireframes, design system and high-fidelity screens.",
          },
        ],
      },
      {
        id: "tech",
        label: "TECH",
        blocks: [
          { kind: "list", heading: "Usability testing & iterations", ja: "検証", items: ["Task-based usability sessions", "Issues captured and prioritised", "Iterations applied to flow and interface"] },
          { kind: "list", heading: "Accessibility", ja: "配慮", items: ["Readable contrast", "Legible type sizes", "Clear focus and touch targets", "Consistent, predictable navigation"] },
        ],
      },
      {
        id: "outcome",
        label: "OUTCOME",
        blocks: [
          {
            kind: "text",
            heading: "Final outcome",
            ja: "結果",
            body: [
              "A food ordering experience grounded in research: organised information, a tested flow, a documented design system and an accessible high-fidelity interface.",
            ],
          },
        ],
      },
    ],
    links: [
      { label: "OPEN FIGMA CASE STUDY ↗", sub: "FIGMA", href: "https://www.figma.com/design/tGMpOwOJyNCzPjFHmWPSKB/GREENZONE-UI?node-id=0-1&t=pttOcdQkKFV914ir-1", primary: true },
      { label: "EXPLORE MIRO BOARD →", sub: "MIRO", href: "https://miro.com/app/live-embed/uXjVH9uOQPw=/?embedMode=view_only_without_ui&moveToViewport=-10014,-3572,6533,3300&embedId=662091349947" },
    ],
  },
  {
    id: "linux-health-monitor",
    index: "04",
    title: "LINUX HEALTH MONITOR",
    ja: "監視",
    subtitle: "Health Monitor & Log Analyzer",
    category: "Technical",
    type: "technical",
    year: "2025",
    role: ["Bash scripting", "System monitoring", "Log analysis", "Report design"],
    tools: ["Linux", "Bash", "Cron", "Cybersecurity", "Networking"],
    overview:
      "A Linux system health monitor and log analyzer that collects machine state, watches services and security signals, and publishes readable reports.",
    sections: [
      {
        id: "overview",
        label: "OVERVIEW",
        blocks: [
          {
            kind: "text",
            heading: "Overview",
            ja: "概要",
            body: ["A scripted monitoring layer for Linux machines, producing HTML reports and historical records from raw system state."],
          },
        ],
      },
      {
        id: "problem",
        label: "PROBLEM",
        blocks: [
          { kind: "text", heading: "Problem", ja: "課題", body: ["System state and log signals are scattered across commands and files, so problems are noticed late."] },
        ],
      },
      {
        id: "process",
        label: "PROCESS",
        blocks: [
          {
            kind: "list",
            heading: "What it monitors",
            ja: "対象",
            items: ["CPU monitoring", "Memory", "Disk", "Network", "Service monitoring", "Security monitoring", "Log analysis"],
          },
        ],
      },
      {
        id: "design",
        label: "DESIGN",
        blocks: [
          { kind: "list", heading: "Reporting", ja: "報告", items: ["HTML reports", "Historical reports", "Cron automation"] },
        ],
      },
      {
        id: "tech",
        label: "TECH",
        blocks: [
          {
            kind: "terminal",
            heading: "Sample run",
            ja: "端末",
            lines: [
              "$ ./health-monitor.sh --report",
              "[ok]   cpu load ............ nominal",
              "[ok]   memory .............. within threshold",
              "[warn] disk /var ........... 82% used",
              "[ok]   network ............. reachable",
              "[ok]   services ............ all active",
              "[info] log analysis ........ scanning auth logs",
              "[ok]   report written ...... reports/health-latest.html",
            ],
          },
        ],
      },
      {
        id: "outcome",
        label: "OUTCOME",
        blocks: [
          { kind: "text", heading: "Outcome", ja: "結果", body: ["Machine state becomes a readable, repeatable report instead of an ad-hoc command session."] },
        ],
      },
    ],
    links: [{ label: "GITHUB ↗", sub: "REPO", href: "https://github.com/manojch77" }],
  },
  {
    id: "server-performance-stats",
    index: "05",
    title: "SERVER PERFORMANCE STATS",
    ja: "性能",
    subtitle: "Structured server reporting",
    category: "Technical",
    type: "technical",
    year: "2025",
    role: ["Bash scripting", "Reporting"],
    tools: ["Linux", "Bash", "Networking"],
    overview: "A compact server statistics tool that reports machine performance in a structured, readable form.",
    sections: [
      {
        id: "overview",
        label: "OVERVIEW",
        blocks: [
          { kind: "text", heading: "Overview", ja: "概要", body: ["A script that gathers core server statistics into one structured report."] },
        ],
      },
      {
        id: "problem",
        label: "PROBLEM",
        blocks: [{ kind: "text", heading: "Problem", ja: "課題", body: ["Checking server health usually means running several commands and reading them separately."] }],
      },
      {
        id: "process",
        label: "PROCESS",
        blocks: [
          { kind: "list", heading: "Collected metrics", ja: "指標", items: ["CPU", "RAM", "Disk", "Uptime", "Processes", "Network"] },
        ],
      },
      {
        id: "design",
        label: "DESIGN",
        blocks: [{ kind: "list", heading: "Output", ja: "出力", items: ["Structured reports", "Consistent formatting for comparison"] }],
      },
      {
        id: "tech",
        label: "TECH",
        blocks: [
          {
            kind: "terminal",
            heading: "Sample output",
            ja: "端末",
            lines: [
              "$ ./server-stats.sh",
              "uptime ............ 14 days, 03:22",
              "cpu ............... 18.4% used",
              "memory ............ 3.1G / 8.0G",
              "disk .............. 46% used",
              "processes ......... 212 running",
              "network ........... rx 1.2G / tx 640M",
            ],
          },
        ],
      },
      {
        id: "outcome",
        label: "OUTCOME",
        blocks: [{ kind: "text", heading: "Outcome", ja: "結果", body: ["One command returns the whole picture of a machine."] }],
      },
    ],
    links: [{ label: "GITHUB ↗", sub: "REPO", href: "https://github.com/manojch77" }],
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
