// src/api/index.js

// ─── Base URLs ────────────────────────────────────────────────────────────────
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ─── Endpoints ────────────────────────────────────────────────────────────────
export const ENDPOINTS = {
  // Bundles
  bundles:              `${BASE_URL}/api/v1/bundles`,
  bundle:               (id) => `${BASE_URL}/api/v1/bundles/${id}`,

  // Recharges
  bundleRecharge:       `${BASE_URL}/api/v1/recharges/bundles`,
  airtimeRecharge:      `${BASE_URL}/api/v1/recharges/airtime`,
  airtimeCredit:        `${BASE_URL}/api/v1/recharges/airtime-credit`,
  creditOptions:        `${BASE_URL}/api/v1/recharges/airtime-credit/credit-options`,
  creditEligibility:    `${BASE_URL}/api/v1/recharges/airtime-credit/credit-eligibility`,
  recharge:             (id) => `${BASE_URL}/api/v1/recharges/${id}`,

  // OTP
  otp:                  `${BASE_URL}/api/v1/otp`,
  otpVerify:            `${BASE_URL}/api/v1/otp/verification`,

  // VAS Subscriptions
  vasSubscriptions:     `${BASE_URL}/api/v1/vas/subscriptions`,
  vasOffers:            `${BASE_URL}/api/v1/vas/subscriptions/offers`,

  // EcoCash webhook (inbound — called by EcoCash, not by frontend directly)
  ecocashWebhook:       `${BASE_URL}/api/v1/webhooks/payments/ecocash`,

  // PayFast — your Spring Boot backend
  payfastInitiate:      `${BACKEND_URL}/api/payment/initiate`,
};

// ─── Central fetch wrapper ────────────────────────────────────────────────────
export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getToken()}`,  ← add when auth is ready
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

// ─── Reference generator ──────────────────────────────────────────────────────
// Produces a unique transaction reference for every recharge call.
// Format: REF-<timestamp>-<5 random chars>  e.g. REF-1714900000000-X7K2P
export function generateReference() {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `REF-${Date.now()}-${rand}`;
}