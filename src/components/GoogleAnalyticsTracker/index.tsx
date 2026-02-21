"use client";

import { useState, useLayoutEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalyticsTracker({ gaId }: { gaId: string }) {
  const [canTrack, setCanTrack] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.resolve().then(() => {
        const saved = localStorage.getItem("cookie-prefs");
        if (saved) {
          try {
            const { analytics } = JSON.parse(saved);
            setCanTrack(analytics);
            return;
          } catch (e) {
            console.error("Error parsing cookie prefs", e);
          }
        }
        setCanTrack(false);
      });
    }
  }, []);

  // Avoid hydration mismatch by not rendering on server or if tracking is not allowed
  if (typeof window === 'undefined' || !canTrack) return null;

  return <GoogleAnalytics gaId={gaId} />;
}