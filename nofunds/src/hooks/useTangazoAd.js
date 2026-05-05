import { useEffect, useRef } from "react";
import { AD_API_KEY } from "../api";
import { AD_BASE_URL } from "../api";

const BASE = AD_BASE_URL;
const API_KEY = AD_API_KEY;

export function useTangazoAd(zone) {
  const scriptRef = useRef(null);
  useEffect(() => {
    if (scriptRef.current) return;
    const script = document.createElement("script");
    script.src = `${BASE}/embed.js?key=${API_KEY}&zone=${zone}`;
    script.async = true;
    document.body.appendChild(script);
    scriptRef.current = script;
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [zone]);
}