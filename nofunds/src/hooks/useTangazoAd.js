import { useEffect, useRef, useState } from "react";
import { AD_BASE_URL, AD_API_KEY } from "../api";

const TIMEOUT_MS = 5000; // treat as failed if script doesn't settle in 5s

export function useTangazoAd(zone) {
  const scriptRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (scriptRef.current) return;

    const markEmpty = () => setIsEmpty(true);

    // ── 1. Script load error (server down / network failure) ──────────────
    const script = document.createElement("script");
    script.src = `${AD_BASE_URL}/embed.js?key=${AD_API_KEY}&zone=${zone}`;
    script.async = true;
    script.onerror = markEmpty; // fired when the script 404s or times out at network level
    document.body.appendChild(script);
    scriptRef.current = script;

    // ── 2. "No campaign" signal — Tangazo sets data-tangazo-rendered="1" ──
    const observer = new MutationObserver(() => {
      const node = document.querySelector(`[data-tangazo-zone="${zone}"]`);
      if (node?.getAttribute("data-tangazo-rendered") === "1") {
        if (!node.hasChildNodes() || node.innerHTML.trim() === "") {
          markEmpty();
        }
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      subtree: true,
      attributeFilter: ["data-tangazo-rendered"],
    });

    // ── 3. Timeout safety net — script loaded but zone never filled ────────
    const timeout = setTimeout(() => {
      const node = document.querySelector(`[data-tangazo-zone="${zone}"]`);
      if (!node || !node.hasChildNodes() || node.innerHTML.trim() === "") {
        markEmpty();
      }
      observer.disconnect();
    }, TIMEOUT_MS);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [zone]);

  return { isEmpty };
}