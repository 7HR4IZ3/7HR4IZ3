import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content" className="page-shell" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
