export const profile = {
  name: "Chinthala Manoj",
  nameShort: "MANOJ",
  nameJa: "チンタラ・マノージ",
  role: "UI/UX Designer",
  roleSecondary: "Frontend Developer",
  statement: ["DESIGN.", "BUILD.", "SECURE."],
  statementJa: ["設計", "開発", "守る"],
  tagline: "UI/UX Designer × Frontend Developer",
  support:
    "I design digital experiences, prototype products, and understand the systems behind them.",
  email: "manojchinthala217@gmail.com",
  linkedin: "https://linkedin.com/in/manojchinthala",
  github: "https://github.com/manojch77",
};

/** Editable — update with real internship dates and responsibilities. */
export const experience = [
  {
    role: "UI/UX Designer Intern",
    company: "BAOIAM",
    period: "JUL 2026 — AUG 2026", // editable
    status: "COMPLETED",
    summary:
      "Working as a UI/UX intern at BAOIAM, contributing to interface design, product experiences, visual systems, and design workflows.",
    contributions: [
      "Interface design for product surfaces",
      "Product experience and flow definition",
      "Visual systems and component consistency",
      "Design workflow support and handoff",
    ],
    tools: ["Figma", "Design Systems", "Prototyping", "User Flows"],
  },
];

export type SkillSheet = {
  ja: string;
  en: string;
  items: { name: string; note: string; where: string }[];
};

export const skillSheets: SkillSheet[] = [
  {
    ja: "設計",
    en: "DESIGN",
    items: [
      { name: "Figma", note: "Primary design and component tool.", where: "Easiway / Raillo / GreenZone" },
      { name: "UX", note: "Research-led experience definition.", where: "GreenZone / Raillo" },
      { name: "UI", note: "Visual interface craft and hierarchy.", where: "Easiway / GreenZone" },
      { name: "Interaction Design", note: "States, transitions, feedback.", where: "Easiway" },
      { name: "Wireframing", note: "Low-fidelity structure exploration.", where: "GreenZone" },
      { name: "Prototyping", note: "Clickable flows for validation.", where: "Raillo / GreenZone" },
    ],
  },
  {
    ja: "製品",
    en: "PRODUCT",
    items: [
      { name: "User Flows", note: "Role-based path mapping.", where: "Easiway" },
      { name: "Personas", note: "Grounded user archetypes.", where: "GreenZone / Raillo" },
      { name: "Journey Mapping", note: "End-to-end experience mapping.", where: "Raillo / GreenZone" },
      { name: "Information Architecture", note: "Content and navigation structure.", where: "GreenZone" },
      { name: "Usability Testing", note: "Task-based evaluation.", where: "GreenZone" },
      { name: "Design Systems", note: "Reusable tokens and components.", where: "Raillo / Easiway" },
    ],
  },
  {
    ja: "開発",
    en: "DEVELOPMENT",
    items: [
      { name: "Frontend", note: "Turning design into interfaces.", where: "Raillo" },
      { name: "HTML", note: "Semantic structure.", where: "Easiway web experiences" },
      { name: "CSS", note: "Layout and visual implementation.", where: "Easiway web experiences" },
      { name: "JavaScript", note: "Interactive behaviour.", where: "Easiway / Raillo" },
    ],
  },
  {
    ja: "モバイル",
    en: "MOBILE",
    items: [
      { name: "Flutter", note: "Mobile UI understanding.", where: "Easiway" },
      { name: "FlutterFlow", note: "Mobile app design and assembly.", where: "Easiway" },
    ],
  },
  {
    ja: "基盤",
    en: "BACKEND",
    items: [
      { name: "Firebase", note: "App data and service layer.", where: "Easiway / Raillo" },
      { name: "Firebase Realtime Database", note: "Live location and state sync.", where: "Easiway" },
    ],
  },
  {
    ja: "系統",
    en: "SYSTEMS / SECURITY",
    items: [
      { name: "Linux", note: "System administration and scripting.", where: "Linux Health Monitor" },
      { name: "Cybersecurity", note: "Monitoring and hardening basics.", where: "Linux Health Monitor" },
      { name: "Networking", note: "Traffic and connectivity checks.", where: "Server Performance Stats" },
      { name: "Bash", note: "Automation and reporting scripts.", where: "Linux Health Monitor" },
    ],
  },
  {
    ja: "工程",
    en: "WORKFLOW",
    items: [
      { name: "Git", note: "Versioning and history.", where: "All projects" },
      { name: "GitHub", note: "Repositories and collaboration.", where: "All projects" },
    ],
  },
  {
    ja: "記録",
    en: "DOCUMENTATION",
    items: [{ name: "Overleaf", note: "Technical and academic documentation.", where: "Reports" }],
  },
];
