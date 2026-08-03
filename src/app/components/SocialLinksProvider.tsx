"use client";

import { createContext, useContext } from "react";
import { siteConfig } from "../data/siteConfig";
import type { SocialLinks } from "@/db/dal";

/**
 * Carries the admin-managed social links to client components.
 *
 * The footer and contact page are client components rendered inside client
 * pages, so they can't query the database themselves. The root layout resolves
 * the links once on the server and provides them here.
 */
const SocialLinksContext = createContext<SocialLinks>(siteConfig.social);

export function SocialLinksProvider({
  value,
  children,
}: {
  value: SocialLinks;
  children: React.ReactNode;
}) {
  return (
    <SocialLinksContext.Provider value={value}>
      {children}
    </SocialLinksContext.Provider>
  );
}

/** Falls back to the values in siteConfig when no provider is present. */
export function useSocialLinks(): SocialLinks {
  return useContext(SocialLinksContext);
}
