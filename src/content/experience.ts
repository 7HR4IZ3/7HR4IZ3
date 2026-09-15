export type Experience = {
  index: string;
  organization: string;
  role: string;
  period: string;
  status: "Current" | "Former" | "Independent";
  engagement: string;
  summary: string;
  proof: string[];
  systems: string[];
};

export const experience: Experience[] = [
  {
    index: "01",
    organization: "CheckAroundMe",
    role: "Lead Engineer",
    period: "Aug 2025 — Present",
    status: "Current",
    engagement: "Startup product ownership",
    summary:
      "Own the technical development of a service-provider discovery platform, turning product direction into production software across interface, backend, data, and deployment.",
    proof: [
      "Lead product architecture and implementation decisions.",
      "Build the core customer, provider, booking, and operations workflows.",
      "Diagnose and ship improvements across the complete production stack.",
    ],
    systems: ["Product", "Next.js", "Backend", "Data", "Deployment", "Operations"],
  },
  {
    index: "02",
    organization: "Lunary.ai",
    role: "Software Engineer",
    period: "Former",
    status: "Former",
    engagement: "Production AI software",
    summary:
      "Contributed to a production AI product while keeping proprietary implementation, customer data, and internal infrastructure private.",
    proof: [
      "Worked within a production AI software environment.",
      "Contributed to application and platform engineering.",
      "Balanced delivery with confidentiality boundaries.",
    ],
    systems: ["AI product", "Application", "Platform", "Integrations", "Reliability"],
  },
  {
    index: "03",
    organization: "Upwork",
    role: "Freelance Full Stack Engineer · Top Rated",
    period: "2023 — Present",
    status: "Independent",
    engagement: "Medium- and long-term client work",
    summary:
      "Work with clients through medium- and long-term engagements spanning full-stack products, browser automation, scraping, integrations, maintenance, and production debugging.",
    proof: [
      "Translate loosely defined requirements into practical technical plans.",
      "Build and maintain features across frontend and backend systems.",
      "Support existing codebases after the initial delivery.",
    ],
    systems: ["Full stack", "Automation", "Scraping", "Extensions", "Integrations", "Maintenance"],
  },
];

export const education = {
  institution: "University of Benin",
  programme: "Bachelor of Engineering",
  field: "Materials and Metallurgical Engineering",
  level: "Fourth year · since 2023",
  summary:
    "Engineering study strengthens the systems, mathematics, experimentation, constraints, and documentation behind my software practice. Fourth-year student since 2023.",
} as const;

export const capabilities = [
  ["Product", "Interfaces, workflows, product decisions, and the difficult final mile from idea to something usable."],
  ["Systems", "APIs, data, authentication, native bridges, runtimes, background work, and cross-device protocols."],
  ["AI tools", "Agent workflows, model integration, controlled permissions, structured output, and recovery paths."],
  ["Delivery", "Testing, debugging, cloud deployment, maintenance, documentation, and honest operational trade-offs."],
] as const;

export type SceneModule =
  | "init"
  | "spawn"
  | "kaizen"
  | "snapshot"
  | "vrmac"
  | "motion"
  | "annotate"
  | "stackjet"
  | "merge";

export type SceneChapter = {
  id: string;
  module: SceneModule;
  label: string;
  reducedMotionPose: "assembled" | "exploded";
};

export const sceneChapters: SceneChapter[] = [
  { id: "home", module: "init", label: "Initialize", reducedMotionPose: "assembled" },
  { id: "record", module: "spawn", label: "Spawn workspaces", reducedMotionPose: "exploded" },
  { id: "project-kaizen-code", module: "kaizen", label: "Kaizen Code", reducedMotionPose: "exploded" },
  { id: "project-snapshot", module: "snapshot", label: "Snapshot", reducedMotionPose: "exploded" },
  { id: "project-vrmac", module: "vrmac", label: "VRMac", reducedMotionPose: "exploded" },
  { id: "project-motion-cues", module: "motion", label: "Motion Cues", reducedMotionPose: "exploded" },
  { id: "project-opencode-annotate", module: "annotate", label: "OpenCode Annotate", reducedMotionPose: "exploded" },
  { id: "project-stackjet", module: "stackjet", label: "Stackjet", reducedMotionPose: "exploded" },
  { id: "experience", module: "merge", label: "Merge", reducedMotionPose: "assembled" },
];
