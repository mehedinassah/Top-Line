"use client";

import { useEffect } from "react";

/**
 * Injects the Helpdeck AI support widget (a Shadow-DOM chat bubble).
 * Configure via env:
 *   NEXT_PUBLIC_HELPDECK_URL         - Helpdeck backend base URL (required to activate)
 *   NEXT_PUBLIC_HELPDECK_WIDGET_KEY  - publishable widget key (has a Top-Line default)
 * Renders nothing until a URL is configured, so it stays dormant until deployed.
 */
const DEFAULT_WIDGET_KEY = "wk_A-TUi1nPZLQ__TajexM0dagowhBp9tBj";

export default function HelpdeckWidget() {
  useEffect(() => {
    const url = (process.env.NEXT_PUBLIC_HELPDECK_URL || "").replace(/\/$/, "");
    const key = process.env.NEXT_PUBLIC_HELPDECK_WIDGET_KEY || DEFAULT_WIDGET_KEY;
    if (!url || !key) return;
    if (document.getElementById("helpdeck-widget-script")) return;

    const s = document.createElement("script");
    s.id = "helpdeck-widget-script";
    s.src = `${url}/widget/widget.js`;
    s.async = true;
    s.setAttribute("data-widget-key", key);
    s.setAttribute("data-api-url", url);
    s.setAttribute("data-title", "Top-Line Assistant");
    s.setAttribute("data-accent", "#111827");
    s.setAttribute(
      "data-greeting",
      "Hi! 👋 I'm the Top-Line assistant. Ask me about products, sizing, shipping, returns or payment."
    );
    document.body.appendChild(s);

    return () => {
      document.getElementById("helpdeck-widget-host")?.remove();
      s.remove();
    };
  }, []);

  return null;
}
