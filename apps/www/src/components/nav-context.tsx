"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

export type NavTheme = "light" | "dark";

type NavState = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  bgTheme: NavTheme;
  setBgTheme: (theme: NavTheme) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const NavContext = createContext<NavState>({
  collapsed: false,
  setCollapsed: () => {},
  bgTheme: "light",
  setBgTheme: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [bgTheme, setBgTheme] = useState<NavTheme>("light");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavContext value={{ collapsed, setCollapsed, bgTheme, setBgTheme, menuOpen, setMenuOpen }}>
      {children}
    </NavContext>
  );
}

export function useNav() {
  return useContext(NavContext);
}
