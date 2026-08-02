export const siteConfig = {
  alias: "THRAIZE",
  handle: "7HR4IZ3",
  name: "Alhassan Abdulazeez",
  title: "Full Stack Engineer",
  location: "Nigeria",
  availability: "Open to full-stack roles, startup collaborations, and selected freelance work.",
  description:
    "Full-stack engineer building unusual, useful software across AI tools, mobile runtimes, native products, and modern web platforms.",
  url: "https://thraize.dev",
  contact: {
    email: "gamerxville@gmail.com",
    github: "https://github.com/7HR4IZ3",
    linkedin: "https://www.linkedin.com/in/alhassan-abdulazeez-ab5a2827a",
    upwork: "https://www.upwork.com/freelancers/~010061f167a6d96ef2",
    x: "https://x.com/iamthraize",
  },
} as const;

export const contactHref = `mailto:${siteConfig.contact.email}`;
