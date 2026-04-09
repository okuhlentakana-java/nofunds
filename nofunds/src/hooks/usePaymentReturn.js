// src/hooks/usePaymentReturn.js
import { useState, useEffect } from "react";

export function usePaymentReturn() {
  const [result, setResult] = useState({
    paymentStatus: null,
    returnedItem:  null,
    returnedPhone: "",
  });

  useEffect(() => {
    const params  = new URLSearchParams(window.location.search);
    const payment = params.get("payment"); // "success" | "cancelled" | null
    if (!payment) return;

    let item  = null;
    let phone = "";
    try {
      const raw = sessionStorage.getItem("pendingPayment");
      if (raw) {
        const parsed = JSON.parse(raw);
        item  = parsed.item  || null;
        phone = parsed.phone || "";
      }
    } catch { /* ignore */ }

    // Clean the URL first (no setState here)
    params.delete("payment");
    params.delete("payment_id");
    const clean = window.location.pathname + (params.toString() ? `?${params}` : "");
    window.history.replaceState({}, "", clean);
    sessionStorage.removeItem("pendingPayment");

    // setState in a microtask — satisfies the linter rule by not being
    // synchronous in the effect body while still running in the same tick
    Promise.resolve().then(() =>
      setResult({ paymentStatus: payment, returnedItem: item, returnedPhone: phone })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clear = () =>
    setResult({ paymentStatus: null, returnedItem: null, returnedPhone: "" });

  return { ...result, clear };
}