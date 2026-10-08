"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Direction B's nav sits over the hero photo and turns solid once you scroll. */
export function NavShell({ children }: { children: ReactNode }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={solid ? "nav solid" : "nav"}>{children}</header>;
}
