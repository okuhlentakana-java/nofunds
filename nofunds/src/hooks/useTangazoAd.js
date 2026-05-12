import { useEffect, useRef, useState } from "react";
import { AD_BASE_URL, AD_API_KEY } from "../api";

export function useTangazoAd(zone) {
  const scriptRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (scriptRef.current) return;
    const script = document.createElement("script");
    script.src = `${AD_BASE_URL}/embed.js?key=${AD_API_KEY}&zone=${zone}`;
    script.async = true;
    document.body.appendChild(script);
    scriptRef.current = script;

    // Watch for data-tangazo-rendered="1" being set (no ad available)
    const observer = new MutationObserver(() => {
      const node = document.querySelector(`[data-tangazo-zone="${zone}"]`);
      if (node?.getAttribute("data-tangazo-rendered") === "1") {
        // Only empty if the ad slot has no child content injected
        if (!node.hasChildNodes() || node.innerHTML.trim() === "") {
          setIsEmpty(true);
        }
        observer.disconnect();
      }
    });

    observer.observe(document.body, { subtree: true, attributeFilter: ["data-tangazo-rendered"] });

    return () => {
      observer.disconnect();
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [zone]);

  return { isEmpty };
}