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
  gallery?: ProjectMedia[];
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
    gallery: [
      { src: "/projects/gallery/kaizen/session-overview.png", alt: "Kaizen Code session overview on a mobile device", kind: "product-capture", width: 828, height: 1792, approved: true },
      { src: "/projects/gallery/kaizen/agent-thread.png", alt: "Kaizen Code agent thread with task context", kind: "product-capture", width: 828, height: 1792, approved: true },
      { src: "/projects/gallery/kaizen/task-list.png", alt: "Kaizen Code parallel task list on mobile", kind: "product-capture", width: 828, height: 1792, approved: true },
      { src: "/projects/gallery/kaizen/workspace-detail.png", alt: "Kaizen Code workspace detail and agent response", kind: "product-capture", width: 828, height: 1792, approved: true },
      { src: "/projects/gallery/kaizen/terminal-session.png", alt: "Kaizen Code terminal session inside the mobile workspace", kind: "terminal-capture", width: 828, height: 1792, approved: true },
    ],
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
    gallery: [
      { src: "/projects/gallery/snapshot/cli-help.svg", alt: "Snapshot CLI help output listing workspace commands", kind: "terminal-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/snapshot/backends.svg", alt: "Snapshot backend inspection output from the local CLI", kind: "terminal-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/snapshot/tests.svg", alt: "Snapshot milestone test output showing the init spawn status diff flow", kind: "terminal-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/snapshot/status.svg", alt: "Snapshot safe failure output for an uninitialized project", kind: "terminal-capture", width: 1200, height: 720, approved: true },
    ],
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
    gallery: [
      { src: "/projects/gallery/vrmac/simulator-live.jpeg", alt: "Live iPhone simulator capture of the VRMac spatial display", kind: "product-capture", width: 712, height: 472, approved: true },
      { src: "/projects/gallery/vrmac/protocol.svg", alt: "VRMac host to mobile session protocol evidence sheet", kind: "architecture-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/vrmac/build-receipt.svg", alt: "VRMac host and client build receipt", kind: "terminal-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/vrmac/simulator-state.svg", alt: "VRMac simulator state evidence plate", kind: "product-capture", width: 1200, height: 720, approved: true },
    ],
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
    gallery: [
      { src: "/projects/gallery/motion/current.png", alt: "Motion Cues current state screen from the Android release capture", kind: "product-capture", width: 720, height: 1480, approved: true },
      { src: "/projects/gallery/motion/dots.png", alt: "Motion Cues dot field preview from the Android release capture", kind: "product-capture", width: 720, height: 1480, approved: true },
      { src: "/projects/gallery/motion/motion.png", alt: "Motion Cues motion profile screen from the Android release capture", kind: "product-capture", width: 720, height: 1480, approved: true },
      { src: "/projects/gallery/motion/system.png", alt: "Motion Cues system controls screen from the Android release capture", kind: "product-capture", width: 720, height: 1480, approved: true },
      { src: "/projects/gallery/motion/onboarding-overlay.png", alt: "Motion Cues overlay onboarding screen from the Android release capture", kind: "product-capture", width: 720, height: 1480, approved: true },
    ],
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
    gallery: [
      { src: "/projects/gallery/annotate/protocol.svg", alt: "OpenCode Annotate browser to relay to agent routing evidence", kind: "architecture-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/annotate/test-flow.svg", alt: "OpenCode Annotate local test page fixture with selectable UI elements", kind: "product-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/annotate/build-receipt.svg", alt: "OpenCode Annotate package boundary evidence sheet", kind: "terminal-capture", width: 1200, height: 720, approved: true },
    ],
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
    gallery: [
      { src: "/projects/gallery/stackjet/surface.svg", alt: "Stackjet remote storage control surface", kind: "product-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/stackjet/architecture.svg", alt: "Stackjet source to Convex job to Drive transfer path", kind: "architecture-capture", width: 1200, height: 720, approved: true },
      { src: "/projects/gallery/stackjet/checks.svg", alt: "Stackjet current proof and implementation checks", kind: "terminal-capture", width: 1200, height: 720, approved: true },
    ],
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
  {
    slug: "checkaroundme", index: "08", title: "CheckAroundMe", shortTitle: "CheckAroundMe", premise: "A service-provider discovery platform developed as professional lead-engineering work.",
    status: "Professional work", maturity: "Limited public detail", year: "2024—26", featuredOrder: null,
    domains: ["WEB"], ownership: "Lead Engineer", visibility: "limited", role: "Lead Engineer · full-stack product ownership",
    summary: "Own the technical development of a service-provider discovery platform, turning product direction into production software across interface, backend, data, and deployment.",
    challenge: "A real product demands complete technical ownership across the full stack, from architecture decisions through production operations.",
    intervention: "Led product architecture and implementation across customer, provider, booking, and operations workflows.",
    decision: "Maintain full-stack ownership to keep product decisions, technical constraints, and deployment realities aligned.",
    proof: ["Lead product architecture and implementation decisions.", "Build the core customer, provider, booking, and operations workflows.", "Diagnose and ship improvements across the complete production stack."],
    lessons: "Professional product ownership requires balancing technical depth with product judgment across the full delivery chain.",
    stack: ["Next.js", "Appwrite", "tRPC", "Shadcn UI"], links: [], module: "generic",
  },
  {
    slug: "antichess", index: "09", title: "AntiChess", shortTitle: "AntiChess", premise: "An early platform for playing chess against different AI models and comparing their behavior.",
    status: "Early build", maturity: "Foundation and architecture stage", year: "2024—26", featuredOrder: null,
    domains: ["AI"], ownership: "Creator", visibility: "public", role: "Creator · architecture and game logic",
    summary: "AntiChess lets you play chess against multiple AI models and compare how they reason about the same positions differently.",
    challenge: "Different AI models have different latency, reasoning depth, and move selection patterns. The interface needs to accommodate all of them without bias.",
    intervention: "Built a monorepo with a shared chess engine package and a Next.js frontend using shadcn/ui with a custom chess theme.",
    decision: "Separate the game logic from the AI provider layer so models can be swapped without touching the board.",
    proof: ["Monorepo architecture with shared engine package.", "Next.js 14+ with App Router and TypeScript.", "Custom chess theme with Tailwind design tokens."],
    lessons: "Game AI comparison is more about exposing reasoning patterns than about raw strength.",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "Tailwind CSS"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/Anti-Chess" }], module: "generic",
  },
  {
    slug: "watchparty", index: "10", title: "WatchParty", shortTitle: "WatchParty", premise: "An early shared virtual theatre concept combining synchronized viewing and conversation.",
    status: "Early build", maturity: "Exploratory product stage", year: "2024—26", featuredOrder: null,
    domains: ["WEB"], ownership: "Creator", visibility: "public", role: "Creator · product concept and prototype",
    summary: "WatchParty explores how shared media viewing and real-time conversation can coexist in a single lightweight interface.",
    challenge: "Synchronized playback and real-time chat need to stay aligned across participants without heavy infrastructure.",
    intervention: "Built a SvelteKit prototype to test the interaction model before committing to a full build.",
    decision: "Keep the prototype lightweight to validate the concept before investing in production infrastructure.",
    proof: ["SvelteKit prototype exists.", "Concept and interaction model are documented.", "Early-stage exploration with working local demo."],
    lessons: "Shared media experiences need synchronization and conversation to feel natural, not just technically connected.",
    stack: ["Svelte", "SvelteKit"], links: [], module: "generic",
  },
  {
    slug: "wsgic-bridgeio", index: "11", title: "WSGIC + BridgeIO Ecosystem", shortTitle: "BridgeIO", premise: "A Python web framework and a family of cross-language bridges that let Python, JavaScript, and the browser call each other directly.",
    status: "Open source", maturity: "Public framework experiments with working demos", year: "2023—25", featuredOrder: null,
    domains: ["TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · framework design and cross-language runtime engineering",
    summary: "WSGIC is a Python web framework. BridgeIO is the runtime layer underneath: py_bridge, js_bridge, browser-bridge, PybridgeWeb, JsBridgeWeb, and ExpressPy let Python control JavaScript DOM, serve Express-style routes, and share objects across language boundaries. The ecosystem also includes es62py (an ES6-to-Python transpiler) and virtual-dom (direct Python control of the browser DOM).",
    challenge: "Python and JavaScript have different event loops, object models, and runtime lifecycles. Making them call each other without serialization overhead requires matching their execution contexts at the transport layer.",
    intervention: "Built paired client-server bridges for each language boundary: py_bridge for Node-to-Python, js_bridge for Python-to-Node, browser-bridge for browser-to-server, and combined surfaces like ExpressPy and virtual-dom.",
    decision: "Make each bridge a small, focused library rather than one monolithic runtime, so each language pair can be used independently.",
    proof: ["ExpressPy serves Express.js-style routes from Python using py_bridge and js_bridge.", "virtual-dom controls browser DOM directly from Python.", "es62py transpiles ECMAScript 6 syntax to Python equivalents.", "wsgic ships auth, API, and admin modules."],
    lessons: "Cross-language instinct starts with understanding what each runtime does well and building the thinnest possible bridge between them.",
    stack: ["Python", "JavaScript", "Node.js", "WebSocket", "WSGI"], links: [
      { label: "wsgic", href: "https://github.com/7HR4IZ3/wsgic" },
      { label: "js-bridge", href: "https://github.com/7HR4IZ3/js-bridge" },
      { label: "py_bridge", href: "https://github.com/7HR4IZ3/py_bridge" },
      { label: "browser-bridge", href: "https://github.com/7HR4IZ3/browser-bridge" },
      { label: "ExpressPy", href: "https://github.com/7HR4IZ3/ExpressPy" },
      { label: "virtual-dom", href: "https://github.com/7HR4IZ3/virtual-dom" },
      { label: "es62py", href: "https://github.com/7HR4IZ3/es62py" },
    ], module: "bridge",
  },
  {
    slug: "socially", index: "12", title: "Socially", shortTitle: "Socially", premise: "A multi-platform social media management tool for scheduling, analytics, and automation.",
    status: "Open source", maturity: "Published with multi-platform support", year: "2024—26", featuredOrder: null,
    domains: ["WEB"], ownership: "Creator", visibility: "public", role: "Creator · full-stack product engineering",
    summary: "Socially manages accounts across Twitter, Facebook, Instagram, LinkedIn, TikTok, and YouTube from one interface with scheduling, analytics dashboards, media libraries, and automation workflows.",
    challenge: "Each social platform has different API constraints, rate limits, content formats, and authentication flows. A unified interface needs to normalize all of them without losing platform-specific features.",
    intervention: "Built a multi-platform management layer with content scheduling, analytics aggregation, media organization, and team collaboration features.",
    decision: "Normalize the common operations (post, schedule, analyze) across platforms while preserving platform-specific options where they matter.",
    proof: ["Multi-platform support across six major social networks.", "Content scheduling, media library, and analytics dashboard implemented.", "Automation workflows and team collaboration features."],
    lessons: "Social media management is fundamentally an integration problem: the product is only as good as its weakest platform adapter.",
    stack: ["Svelte", "TypeScript"], links: [{ label: "Source (Svelte)", href: "https://github.com/7HR4IZ3/socially" }, { label: "Source (TS)", href: "https://github.com/7HR4IZ3/socially-8i" }], module: "generic",
  },
  {
    slug: "time-tracker", index: "13", title: "Time Tracker", shortTitle: "Time Tracker", premise: "Timesheet data transformed into actionable analytics with visualizations and reporting.",
    status: "Open source", maturity: "Published with analytics features", year: "2024—26", featuredOrder: null,
    domains: ["WEB"], ownership: "Creator", visibility: "public", role: "Creator · product engineering",
    summary: "Time Tracker imports timesheet data and turns it into insights through charts, breakdowns, and trend visualizations.",
    challenge: "Raw timesheet data is noisy and hard to interpret. The tool needs to surface patterns without requiring the user to build their own analysis.",
    intervention: "Built a React + Vite application with Tailwind styling that ingests timesheet data and presents it through interactive visualizations.",
    decision: "Keep the import flexible and the visualization focused on actionable insights rather than exhaustive reporting.",
    proof: ["Data import and parsing pipeline implemented.", "Interactive chart visualizations with breakdowns.", "React + TypeScript + Tailwind + Vite stack."],
    lessons: "The value of time tracking is not in recording hours but in revealing where they actually go.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/time-tracker" }], module: "generic",
  },
  {
    slug: "oauth-helper", index: "14", title: "OAuth Helper", shortTitle: "OAuth Helper", premise: "A web app that simplifies obtaining access tokens for popular services.",
    status: "Open source", maturity: "Published utility", year: "2024—26", featuredOrder: null,
    domains: ["WEB", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · product engineering",
    summary: "OAuth Helper provides a user-friendly interface for obtaining and storing OAuth access tokens, making it easier to authenticate applications against popular APIs.",
    challenge: "OAuth flows are repetitive and error-prone. Each service has slightly different scopes, redirect URIs, and token lifecycle behaviors.",
    intervention: "Built a focused web app that handles the OAuth dance for multiple services and presents the resulting tokens in a usable format.",
    decision: "Keep it a single-purpose tool rather than building a full OAuth management platform.",
    proof: ["User-friendly interface for token acquisition.", "Supports multiple popular web services.", "Secure token storage."],
    lessons: "Small utility tools can eliminate entire categories of friction when they focus on one workflow.",
    stack: ["TypeScript"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/oauth-helper" }], module: "generic",
  },
  {
    slug: "vvveb-modernization", index: "15", title: "VvvebJs Modernization", shortTitle: "VvvebJs", premise: "A large visual site builder brought through a staged architecture and interface modernization.",
    status: "Lab", maturity: "Local working set", year: "2024—26", featuredOrder: null,
    domains: ["WEB"], ownership: "Engineering", visibility: "public", role: "Engineering · staged modernization",
    summary: "VvvebJs is a visual drag-and-drop page builder. The modernization effort rebuilds it as a JSON-native editor with modern tooling while preserving the existing feature set.",
    challenge: "Migrating a large vanilla JavaScript codebase to a modern architecture without breaking the existing editor experience requires careful staging.",
    intervention: "Planned a staged migration with feature parity tracking, starting with the core DSL, renderer, and workspace packages.",
    decision: "Use a workspace-based architecture with clear package boundaries to make the migration incremental rather than big-bang.",
    proof: ["Bun workspace architecture with core, UI, importer, exporter, and preset packages.", "Feature parity audit tracking gaps and implementation order.", "Legacy reference preserved alongside the rewrite."],
    lessons: "Large codebase modernization succeeds when each stage is independently shippable and testable.",
    stack: ["Bun", "TypeScript", "Vanilla JS"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/vvvebjs-plus" }], module: "generic",
  },
  {
    slug: "appwrite-project-migrate", index: "16", title: "Appwrite Project Migrate", shortTitle: "Appwrite Migrate", premise: "A cautious CLI for selectively copying Appwrite resources with dry-run and recovery behavior.",
    status: "Lab", maturity: "Local working set", year: "2024—26", featuredOrder: null,
    domains: ["CLOUD"], ownership: "Creator", visibility: "public", role: "Creator · CLI engineering",
    summary: "A direct Appwrite project copier that inventories, plans, clears, copies, resumes, and verifies users, teams, databases, storage, functions, and sites between Appwrite projects.",
    challenge: "Appwrite's native migration service doesn't cover all resource groups. A manual copier needs to handle partial failures, resume from checkpoints, and verify integrity.",
    intervention: "Built a Bun CLI with dry-run planning, checkpoint-based resume, per-resource-group verification, and clear credential handling.",
    decision: "Use checkpoints and verification rather than trusting a single pass to complete cleanly.",
    proof: ["Supports users, teams, databases, storage, functions, and sites.", "Dry-run, checkpoint, resume, and verify modes.", "Credentials never written into checkpoints or reports."],
    lessons: "Data migration tools earn trust through verifiable behavior, not through speed.",
    stack: ["Bun", "TypeScript", "Appwrite API"], links: [], module: "generic",
  },
  {
    slug: "dlm", index: "17", title: "dlm", shortTitle: "dlm", premise: "A service-backed download manager with CLI, TUI, and adaptive segmented downloads.",
    status: "Lab", maturity: "Local working set", year: "2024—26", featuredOrder: null,
    domains: ["TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · systems and CLI engineering",
    summary: "dlm runs a local daemon over a Unix socket, accepts URLs, curl commands, fetch snippets, and HAR files, then manages downloads with pause, resume, cancel, retry, and queue restoration.",
    challenge: "Download management needs reliability across restarts, adaptive streaming for different server capabilities, and a usable interface without a full desktop app.",
    intervention: "Built a service-backed architecture with SQLite persistence, adaptive single-stream and segmented range downloads, and both CLI and OpenTUI surfaces.",
    decision: "Separate the daemon from the interface so downloads survive terminal disconnects and the UI can be swapped.",
    proof: ["Unix domain socket daemon with SQLite persistence.", "CLI and full-screen OpenTUI dashboard.", "Adaptive downloading with segmented range support.", "Post-download verification, extraction, and notification hooks."],
    lessons: "A download manager is really a reliability problem: the interface is secondary to getting the bytes across cleanly.",
    stack: ["Bun", "TypeScript", "SQLite", "OpenTUI"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/dlm" }], module: "generic",
  },
  {
    slug: "oss-hub", index: "18", title: "OSS Hub", shortTitle: "OSS Hub", premise: "A mobile-first platform for exploring, rating, preserving, and discussing open-source codebases.",
    status: "Lab", maturity: "Private working set", year: "2024—26", featuredOrder: null,
    domains: ["WEB"], ownership: "Creator", visibility: "limited", role: "Creator · product and full-stack engineering",
    summary: "OSS Hub is a developer platform for discovering open-source codebases, preserving snippet provenance, and sharing code socially through a mobile-first interface.",
    challenge: "Open-source discovery is fragmented across GitHub, package managers, and blog posts. A unified view needs to preserve context about why code matters, not just what it contains.",
    intervention: "Built a Turborepo monorepo with Convex backend, Expo mobile app, and web frontend, focused on repository browsing, snippet preservation, and social features.",
    decision: "Start mobile-first because developers increasingly browse code on phones, even if they edit on desktop.",
    proof: ["Monorepo with backend, mobile, web, and shared packages.", "Convex schema with users, repositories, files, snippets, bookmarks, and feed.", "Expo Router app with public and protected routes."],
    lessons: "Code discovery needs provenance and social context, not just search.",
    stack: ["Expo", "Convex", "TypeScript", "Turborepo"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/oss-hub" }], module: "generic",
  },
  {
    slug: "video-creator", index: "19", title: "Video Creator", shortTitle: "Video Creator", premise: "An automated pipeline that turns an article into narration, assembled video, and multi-platform uploads.",
    status: "Lab", maturity: "Private working set", year: "2024—26", featuredOrder: null,
    domains: ["AI"], ownership: "Creator", visibility: "limited", role: "Creator · pipeline engineering",
    summary: "Video Creator automates the journey from Reddit stories or articles to narrated, assembled videos with direct uploads to YouTube, TikTok, and Facebook.",
    challenge: "Video generation involves research, scripting, audio synthesis, visual assembly, and platform-specific upload formats. Each step has its own failure modes.",
    intervention: "Built a monorepo with a CLI core, SvelteKit web interface, and Express OAuth proxy for secure platform authentication.",
    decision: "Use a CLI-first approach with a web interface on top, so the pipeline can run headless in automation.",
    proof: ["CLI and web interface for story browsing and video generation.", "Multi-platform uploader with OAuth proxy.", "Remotion rendering pipeline with AI scene boards."],
    lessons: "Automated content pipelines are fragile at every boundary: the value is in making each failure recoverable.",
    stack: ["Bun", "Remotion", "SvelteKit", "Express"], links: [], module: "generic",
  },
  {
    slug: "logscat", index: "20", title: "Logscat", shortTitle: "Logscat", premise: "A web UI to display Android logcat logs neatly without opening Android Studio.",
    status: "Open source", maturity: "Published utility", year: "2024—26", featuredOrder: null,
    domains: ["WEB", "MOBILE", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · tooling",
    summary: "Logscat provides a clean web-based interface for viewing Android logcat output, removing the need to open the full Android Studio IDE just to read logs.",
    challenge: "Android Studio is heavy and slow for just reading logs. Developers need a fast, filterable log view that works alongside their actual development environment.",
    intervention: "Built a lightweight WebUI that connects to logcat and presents logs in a readable, filterable format.",
    decision: "Keep it minimal and focused: just logs, just readable, just fast.",
    proof: ["WebUI for logcat display.", "Lightweight alternative to Android Studio log viewer.", "Published on GitHub."],
    lessons: "The best developer tools remove one specific pain point without introducing new complexity.",
    stack: ["JavaScript", "Web"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/logscat" }], module: "generic",
  },
  {
    slug: "sqlite-orm", index: "21", title: "Sqlite-ORM", shortTitle: "Sqlite-ORM", premise: "A Python SQLite ORM modeled after Django ORM interface.",
    status: "Open source", maturity: "Published library", year: "2023—26", featuredOrder: null,
    domains: ["TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · library design",
    summary: "Sqlite-ORM brings Django-style model definitions, queries, and migrations to SQLite in Python, making lightweight database work feel familiar to Django developers.",
    challenge: "Django ORM is tightly coupled to its framework. SQLite has different constraints around concurrency, type affinity, and migration behavior.",
    intervention: "Implemented a Django-inspired API surface that works standalone with SQLite, handling model definitions, queries, and schema management.",
    decision: "Match Django familiar interface rather than inventing a new query syntax, so developers can switch contexts without learning a new API.",
    proof: ["Django-style model and query interface.", "Standalone Python library.", "Published on GitHub."],
    lessons: "Familiar interfaces reduce adoption friction, even when the underlying engine is different.",
    stack: ["Python", "SQLite"], links: [{ label: "Source", href: "https://github.com/7HR4IZ3/Sqlite-ORM" }], module: "generic",
  },
  {
    slug: "acode-plugins", index: "22", title: "Acode Plugin Ecosystem", shortTitle: "Acode Plugins", premise: "A collection of plugins extending Acode mobile editor with language support, terminal, git, workspace management, and hot-reload.",
    status: "Open source", maturity: "Published with 21 star peak on language-client", year: "2023—26", featuredOrder: null,
    domains: ["MOBILE", "TOOLING"], ownership: "Creator", visibility: "public", role: "Creator · plugin architecture and ecosystem",
    summary: "The Acode plugin ecosystem includes language client and server plugins (21 and 17 stars), a terminal plugin, git integration, workspace management, vim mode, hot-reload dev server, and an SDK for building new plugins.",
    challenge: "Mobile editors lack the plugin infrastructure that desktop editors take for granted. Each plugin needs to work within Android WebView constraints and Acode plugin API.",
    intervention: "Built a layered ecosystem: core language support plugins, utility plugins (terminal, git, workspace), developer tooling (hot-reload, SDK), and extended input modes (vim).",
    decision: "Start with language support because that the highest-value gap in mobile editing, then build outward from there.",
    proof: ["acode-language-client (21 stars) and acode-language-servers (17 stars) published.", "Terminal, git, workspace, vim, and hot-reload plugins published.", "Plugin SDK for third-party development."],
    lessons: "Plugin ecosystems grow from one high-value plugin, not from a platform announcement.",
    stack: ["JavaScript", "TypeScript", "WebSocket", "LSP"], links: [
      { label: "language-client", href: "https://github.com/7HR4IZ3/acode-language-client" },
      { label: "language-servers", href: "https://github.com/7HR4IZ3/acode-language-servers" },
      { label: "terminal", href: "https://github.com/7HR4IZ3/acode-terminal-plugin" },
      { label: "hot-reload", href: "https://github.com/7HR4IZ3/acode-hot-reload" },
      { label: "plugin-sdk", href: "https://github.com/7HR4IZ3/acode-plugin-sdk" },
    ], module: "bridge",
  },
  ...[
    ["acode-ionic", "23", "Acode Ionic", "Acode mobile app rewritten using Ionic and Capacitor.", "Open source", "Published rewrite", "MOBILE", "Creator"],
    ["mond", "24", "Mond", "Rainmeter Mond skin for Hologram Desktop.", "Open source", "Published", "WEB", "Creator"],
    ["vvvebjs-plus", "25", "VvvebJs Plus", "Modified version of Vvveb website builder with improvements.", "Open source", "Published", "WEB", "Creator"],
    ["spck-editor", "26", "Spck Editor", "Spck editor extracted from the app for standalone use.", "Open source", "Published", "WEB", "Creator"],
    ["comic-downloader", "27", "Comic Downloader", "Comic downloader Android app built with Capacitor, Vue, and Vuetify.", "Open source", "Published", "MOBILE", "Creator"],
    ["whatsapp", "28", "WhatsApp Wrapper", "JavaScript wrapper for the Bailyes WhatsApp library.", "Open source", "Published", "TOOLING", "Creator"],
    ["thraize-bot", "29", "Thraize Bot", "Personal WhatsApp bot for automation.", "Open source", "Published", "TOOLING", "Creator"],
    ["vsmobile", "30", "VSCode Mobile", "VSCode on mobile powered by Alpine and Code Server.", "Open source", "Published", "MOBILE", "Creator"],
    ["cultbeauty-scraper", "31", "CultBeauty Scraper", "Python Scrapy crawler for cultbeauty.co.uk.", "Open source", "Published", "WEB", "Creator"],
    ["portfolio", "32", "Portfolio Legacy", "Previous portfolio built with Vue2 and Python Bottle.", "Open source", "Published", "WEB", "Creator"],
  ].map(([slug, index, title, premise, status, maturity, domain, ownership]) => ({
    slug, index, title, shortTitle: title, premise, status: status as ProjectStatus, maturity, year: "2023—26", featuredOrder: null,
    domains: [domain as ProjectDomain], ownership, visibility: "public" as "public" | "limited",
    role: ownership, summary: premise, challenge: "The project explores a real product or infrastructure constraint without presenting unfinished work as a completed launch.",
    intervention: "The current implementation establishes the core architecture and the parts of the workflow that can be described safely.",
    decision: "Keep the public claim proportional to the evidence and the project current maturity.",
    proof: ["A local implementation exists.", "The product boundary and intended workflow are documented.", "Public details are restricted to verified, non-sensitive behavior."],
    lessons: "Working-set projects remain useful evidence when their scope and maturity are communicated honestly.", stack: [], links: [], module: "generic" as const,
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
