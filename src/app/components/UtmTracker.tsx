"use client";

import { useEffect } from "react";

const UTM_SOURCE_STORAGE_KEY = "utm_source";

export default function UtmTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source")?.trim().toLowerCase();

    if (utmSource) {
      window.localStorage.setItem(UTM_SOURCE_STORAGE_KEY, utmSource);
    }
  }, []);

  return null;
}
