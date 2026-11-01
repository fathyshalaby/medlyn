import type { ReactNode } from "react";
import { Footer } from "./footer";
import { NavProvider } from "./nav-context";
import { SiteNav } from "./site-nav";
import { type PublicPage, StructuredData } from "./structured-data";

export function SiteFrame({ page, children }: { page: PublicPage; children: ReactNode }) {
  return (
    <NavProvider>
      <StructuredData page={page} />
      <SiteNav />
      <main className="relative z-[1] min-h-svh bg-background-primary pt-[8rem]">{children}</main>
      <Footer />
    </NavProvider>
  );
}
