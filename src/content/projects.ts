export type ProjectDomain = "WEB" | "NATIVE" | "MOBILE" | "AI" | "TOOLING" | "SPATIAL" | "CLOUD";
export type ProjectStatus = "Shipped" | "Open source" | "Active build" | "Contribution" | "Professional work" | "Early build" | "Lab";
export type ProjectModule = "kaizen" | "snapshot" | "vrmac" | "motion" | "annotate" | "stackjet" | "bridge" | "generic";
export type ProjectMedia = {
  src: string;
  alt: string;
  kind: "product-capture" | "terminal-capture" | "architecture-capture";
  width: number;
  height: number;
  approved: true;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  premise: string;
  status: ProjectStatus;
  maturity: string;
  year: string;
  featuredOrder: number | null;
  domains: ProjectDomain[];
  ownership: string;
  visibility: "public" | "limited";
  role: string;
  summary: string;
  challenge: string;
  intervention: string;
  decision: string;
  proof: string[];
  lessons: string;
  stack: string[];
  links: { label: string; href: string }[];
  module: ProjectModule;
  media?: ProjectMedia;
};

export const projects: Project[] = [
  {
    slug: "kaizen-code", index: "01", title: "Kaizen Code", shortTitle: "Kaizen", premise: "A mobile workspace where coding agents can understand projects, propose changes, and work through a native runtime.",
    status: "Active build", maturity: "Android runtime proven; iOS bridge remains intentionally fail-closed", year: "2026", featuredOrder: 1,
    domains: ["MOBILE", "AI", "NATIVE", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · product and full-stack engineering",
    summary: "Kaizen Code challenges the assumption that serious AI-assisted development requires a desktop. It is a task-oriented mobile workspace with agent conversations, diffs, permission controls, project context, external file handoff, and an Alpine terminal surface.",
    challenge: "A useful mobile development product needs more than a small editor. The agent, filesystem, terminal, permissions, runtime lifecycle, and host operating system all need explicit contracts.",
    intervention: "I designed the product around project-level tasks and host-enforced Ask, Approve, and Full permissions, then connected the WebView surface to a native AlpineRuntime bridge for sessions, commands, agent installation, and external handoff.",
    decision: "Kaizen Code does not embed a traditional text editor. It presents highlighted previews and diffs, then hands files to Acode or the operating system while the product concentrates on the wider agent workflow.",
    proof: ["Android app-UID guest runtime executed a real command successfully.", "Web, Android, and iOS application targets build from one Capacitor product surface.", "The iOS bridge refuses to pretend the guest runtime works before its reviewed RuntimeCore is linked."],
    lessons: "A mobile-first tool becomes clearer when it stops copying the desktop and gives the host explicit authority over every agent capability.",
    stack: ["Bun", "TypeScript", "Preact", "Capacitor", "Kotlin", "Swift", "Alpine", "ACP"], links: [], module: "kaizen",
    media: { src: "/projects/kaizen-code.png", alt: "Kaizen Code mobile workspace selection screen", kind: "product-capture", width: 390, height: 844, approved: true },
  },
  {
    slug: "snapshot", index: "02", title: "Snapshot", shortTitle: "Snapshot", premise: "Controlled parallel workspaces for AI coding agents, with explicit review, deterministic merges, and recovery.",
    status: "Open source", maturity: "Working CLI with multiple workspace backends", year: "2026", featuredOrder: 2,
    domains: ["AI", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · CLI architecture and safety model",
    summary: "Snapshot lets several agents work against one codebase without sharing one unstable directory. Each workspace remains inspectable, reviewable, mergeable, and recoverable.",
    challenge: "Parallel agent output creates speed and uncertainty simultaneously. Workspace creation, conflicts, approvals, and rollback need to remain understandable under failure.",
    intervention: "I placed worktrees, APFS copy-on-write clones, and overlay backends behind one workflow with preflight checks, persisted reports, interactive review, and dedicated repair commands.",
    decision: "Use several storage substrates behind one strict workflow instead of making the fastest backend the product contract.",
    proof: ["Supports worktree, APFS copy-on-write, overlay, and automatic backend selection.", "Includes merge-many, preflight, review artifacts, and explicit conflict reports.", "Provides doctor, repair-mounts, unlock, and revert recovery paths."],
    lessons: "Acceleration is only useful when a person can still understand, approve, reject, and undo the result.",
    stack: ["Bun", "TypeScript", "Git", "APFS", "TUI"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/snapshot" }], module: "snapshot",
    media: { src: "/projects/snapshot.svg", alt: "Snapshot terminal preflight and parallel workspace capture", kind: "terminal-capture", width: 1200, height: 720, approved: true },
  },
  {
    slug: "vrmac", index: "03", title: "VRMac", shortTitle: "VRMac", premise: "A Mac display transported into a world-anchored Android VR, passthrough, and AR environment.",
    status: "Active build", maturity: "Both device targets build; live end-to-end validation needs physical hardware", year: "2026", featuredOrder: 3,
    domains: ["SPATIAL", "NATIVE", "MOBILE"], ownership: "Creator", visibility: "public", role: "Creator · system design, transport, and interaction",
    summary: "A Swift host captures the Mac display while a Kotlin/Cardboard client renders it as a movable desktop in 3D space using ordinary mobile hardware.",
    challenge: "Capture, signaling, video transport, stereoscopic rendering, head pose, world placement, and gaze input must behave like a single product across two machines.",
    intervention: "I normalized the session protocol, repaired signaling and frame handling, and built gaze-driven placement with VR, passthrough, and AR modes.",
    decision: "Use a phone and Cardboard as an accessible spatial client rather than requiring a dedicated high-end headset.",
    proof: ["Swift host builds as a standalone package.", "Android client compiles, passes unit tests, and produces a debug APK.", "Pairing uses a normalized vrmac:// session URL with focused signaling and world-math tests."],
    lessons: "Cross-device experiences feel convincing only when transport, interaction, and spatial math are designed as one continuous system.",
    stack: ["Swift", "ScreenCaptureKit", "WebRTC", "Kotlin", "OpenGL ES", "ARCore"], links: [], module: "vrmac",
    media: { src: "/projects/vrmac.svg", alt: "VRMac world-anchored desktop architecture capture", kind: "architecture-capture", width: 1200, height: 720, approved: true },
  },
  {
    slug: "motion-cues", index: "04", title: "Motion Cues", shortTitle: "Motion", premise: "A native Android overlay that turns vehicle movement into a quiet visual reference above other applications.",
    status: "Shipped", maturity: "Release build and store assets produced", year: "2026", featuredOrder: 4,
    domains: ["NATIVE", "MOBILE"], ownership: "Creator", visibility: "public", role: "Creator · product engineering and release",
    summary: "Motion Cues uses device sensors and a non-touchable system overlay to display motion-reactive dots while leaving the application underneath fully usable.",
    challenge: "The cues must remain helpful across orientation changes and sensor noise without blocking touches or demanding attention.",
    intervention: "I built calibration, adaptive intensity, smoothing, stillness behavior, presets, Quick Settings controls, foreground-service reliability, and the Android release path.",
    decision: "Keep the cue layer deliberately restrained and non-touchable; usefulness depends on becoming part of the background.",
    proof: ["Native sensor overlay, foreground service, notification controls, and Quick Settings tile are implemented.", "Motion mapping adapts to orientation and provides accelerometer fallback.", "A signed release bundle and Play Store visual assets were produced."],
    lessons: "A system-level product can require deep engineering while its successful interface remains almost invisible.",
    stack: ["Kotlin", "Android Views", "Sensors", "Foreground service", "Play Billing"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/VehicleMotionCues" }], module: "motion",
    media: { src: "/projects/motion-cues.png", alt: "Motion Cues Android release screen showing the overlay controls and dots", kind: "product-capture", width: 540, height: 960, approved: true },
  },
  {
    slug: "opencode-annotate", index: "05", title: "OpenCode Annotate", shortTitle: "Annotate", premise: "Select an interface in the browser and route that exact feedback into the coding-agent session that owns it.",
    status: "Open source", maturity: "Published browser and agent-session workflow", year: "2026", featuredOrder: 5,
    domains: ["WEB", "AI", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · protocol, browser tooling, and package design",
    summary: "The browser captures selected elements, comments, routes, and optional screenshots while an OpenCode plugin delivers them to the correct active coding session.",
    challenge: "Interface feedback usually loses the selected element, current route, screenshot, and intended code session during handoff.",
    intervention: "I connected browser and agent through a session-aware WebSocket protocol with singleton coordination, queued annotations, and steer modes.",
    decision: "Preserve the browser's evidence instead of asking a person to recreate visual context in prose.",
    proof: ["One local relay coordinates several OpenCode processes.", "Element and box selection retain useful page context.", "Queue and steer modes preserve annotations across reconnects."],
    lessons: "Feedback becomes substantially more actionable when transport preserves where it came from and who owns the response.",
    stack: ["Bun", "TypeScript", "WebSocket", "OpenCode", "html2canvas"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/opencode-annotate" }], module: "annotate",
    media: { src: "/projects/opencode-annotate.png", alt: "OpenCode Annotate browser comment routed from a selected interface", kind: "product-capture", width: 1280, height: 800, approved: true },
  },
  {
    slug: "stackjet", index: "06", title: "Stackjet", shortTitle: "Stackjet", premise: "A remote file URL travels directly into cloud storage without using the person's device as a temporary warehouse.",
    status: "Active build", maturity: "Google Drive upload workflow implemented", year: "2026", featuredOrder: 6,
    domains: ["WEB", "CLOUD", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · full-stack product engineering",
    summary: "Stackjet evolves the original DriveUploader idea into a storage-operations platform. Its first live workflow authorizes Google Drive and orchestrates remote URL uploads with an inspectable event timeline.",
    challenge: "The normal download-then-upload flow wastes local storage, bandwidth, time, and battery—especially on a constrained device.",
    intervention: "I built separate platform and Drive authorization, encrypted refresh-token storage, Convex-backed jobs, direct file streaming, and support for signed or authenticated sources.",
    decision: "Stream from source to destination and persist job state rather than turning the browser into the transfer engine.",
    proof: ["Google sign-in and a separate Drive consent flow are implemented.", "Remote URL uploads support direct files and authenticated headers.", "Type checking, lint, and production build pass in the current project."],
    lessons: "Removing one unnecessary hop can reshape an entire product architecture and make the result more useful on mobile hardware.",
    stack: ["Next.js", "TypeScript", "Convex", "OAuth", "Google Drive API"], links: [{ label: "Source · DriveUploader", href: "https://github.com/7HR4IZ3/google-drive-uploader" }], module: "stackjet",
    media: { src: "/projects/stackjet.svg", alt: "Stackjet URL-to-cloud-storage product interface capture", kind: "product-capture", width: 1200, height: 720, approved: true },
  },
  {
    slug: "acode-beyond-android", index: "07", title: "Acode Beyond Android", shortTitle: "Acode", premise: "Platform contribution work carrying an Android-shaped mobile editor into iOS runtimes, filesystems, and terminals.",
    status: "Contribution", maturity: "Substantial platform work; collaborative ownership", year: "2026", featuredOrder: null,
    domains: ["MOBILE", "NATIVE", "TOOLING"], ownership: "Contributor", visibility: "public", role: "Platform contribution · iOS runtime and terminal",
    summary: "I worked across Cordova, Objective-C, WebSockets, iSH, and ARM64 runtime boundaries to extend Acode's mobile development environment beyond Android.",
    challenge: "Filesystem paths, prepared plugin copies, terminal lifecycle, and executable runtimes all cross differently on iOS.",
    intervention: "The work connects native filesystem routing, Cordova assets, iSH-backed root filesystems, terminal streaming and resize, and ARM64-compatible tooling.",
    decision: "Port the complete workflow contract rather than presenting an iOS shell that stops at the editor surface.",
    proof: ["Terminal WebSocket streaming and resize paths were implemented.", "Native file picking and sdcard-style routing were reconciled.", "Rootfs restoration and ARM64 runtime validation were integrated into the platform work."],
    lessons: "Platform contribution needs precise ownership language and evidence from the full runtime chain.",
    stack: ["Objective-C", "Cordova", "Bun", "WebSocket", "iSH", "ARM64"], links: [{ label: "Acode Foundation", href: "https://github.com/Acode-Foundation/Acode" }, { label: "My fork", href: "https://github.com/7HR4IZ3/Acode" }], module: "bridge",
  },
  ...[
    ["checkaroundme", "08", "CheckAroundMe", "A service-provider discovery platform developed as professional lead-engineering work.", "Professional work", "Limited public detail", "WEB", "Lead Engineer"],
    ["antichess", "09", "AntiChess", "An early platform for playing chess against different AI models and comparing their behavior.", "Early build", "Foundation and architecture stage", "AI", "Creator"],
    ["watchparty", "10", "WatchParty", "An early shared virtual theatre concept combining synchronized viewing and conversation.", "Early build", "Exploratory product stage", "WEB", "Creator"],
    ["wsgic-bridgeio", "11", "WSGIC → BridgeIO", "Python frameworks and language bridges that reveal the origin of the cross-system instinct.", "Open source", "Public framework experiments", "TOOLING", "Creator"],
    ["vvveb-modernization", "12", "VvvebJs Modernization", "A large visual site builder brought through a staged architecture and interface modernization.", "Lab", "Local working set", "WEB", "Engineering"],
    ["appwrite-project-migrate", "13", "Appwrite Project Migrate", "A cautious CLI for selectively copying Appwrite resources with dry-run and recovery behavior.", "Lab", "Local working set", "CLOUD", "Creator"],
    ["dlm", "14", "dlm", "A service-backed download manager with CLI, TUI, and browser handoff surfaces.", "Lab", "Local working set", "TOOLING", "Creator"],
    ["oss-hub", "15", "OSS Hub", "A mobile-first place to explore, rate, preserve, and discuss open-source projects.", "Lab", "Private working set", "WEB", "Creator"],
    ["video-creator", "16", "Video Creator", "An automated pipeline that turns an article into narration, assembled video, and traceable output.", "Lab", "Private working set", "AI", "Creator"],
  ].map(([slug, index, title, premise, status, maturity, domain, ownership]) => ({
    slug, index, title, shortTitle: title, premise, status: status as ProjectStatus, maturity, year: "2024—26", featuredOrder: null,
    domains: [domain as ProjectDomain], ownership, visibility: (["checkaroundme", "oss-hub", "video-creator"].includes(slug) ? "limited" : "public") as "public" | "limited",
    role: ownership, summary: premise, challenge: "The project explores a real product or infrastructure constraint without presenting unfinished work as a completed launch.",
    intervention: "The current implementation establishes the core architecture and the parts of the workflow that can be described safely.",
    decision: "Keep the public claim proportional to the evidence and the project's current maturity.",
    proof: ["A local implementation exists.", "The product boundary and intended workflow are documented.", "Public details are restricted to verified, non-sensitive behavior."],
    lessons: "Working-set projects remain useful evidence when their scope and maturity are communicated honestly.", stack: [], links: [], module: slug === "wsgic-bridgeio" ? "bridge" as const : "generic" as const,
  })),
];

export const featuredProjects = projects.filter((project) => project.featuredOrder !== null).sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
export const featuredProjectEvidence = featuredProjects.map((project) => {
  if (!project.media) throw new Error(`Featured project ${project.slug} is missing approved media.`);
  return { slug: project.slug, ...project.media };
});
export const workProjects = projects.filter((project) => !["Early build", "Lab"].includes(project.status));
export const labProjects = projects.filter((project) => ["Early build", "Lab"].includes(project.status));
export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
