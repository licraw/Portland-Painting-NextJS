"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import GoogleCaptchaWrapper from "../api/verifyRecaptcha/GoogleCaptchaWrapper";
import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";
import PencilBanner from "./PencilBanner";
import StickyReviewsWidget from "./StickyReviewsWidget";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <GoogleCaptchaWrapper>
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <Header>
          <PencilBanner ctaAction="/estimate" />
          <Nav />
        </Header>
        <main>{children}</main>
        <StickyReviewsWidget />
        <Footer />
      </div>
    </GoogleCaptchaWrapper>
  );
}
