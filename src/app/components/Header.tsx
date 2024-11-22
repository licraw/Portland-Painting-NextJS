"use client";

import { ReactNode } from "react";

type HeaderProps = {
  children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {children}
    </header>
  );
}
