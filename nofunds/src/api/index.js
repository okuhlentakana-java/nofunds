// ─── Central API configuration ───────────────────────────────────────────────
export const  BASE_URL = "http://nofunds.jamesdube.com";
export const BACKEND_URL = "https://uncurbable-brianne-cruelly.ngrok-free.dev";

export const ENDPOINTS = {
  // Bundles
  bundles:        `${BASE_URL}/api/v1/bundles`,
  bundle:         (id) => `${BASE_URL}/api/v1/bundles/${id}`,

  // Recharges
  bundleRecharge: `${BASE_URL}/api/v1/recharges/bundles`,
  airtimeRecharge:`${BASE_URL}/api/v1/recharges/airtime`,
  airtimeCredit:  `${BASE_URL}/api/v1/recharges/airtime-credit`,
  creditOptions:  `${BASE_URL}/api/v1/recharges/airtime-credit/credit-options`,
  creditEligibility:`${BASE_URL}/api/v1/recharges/airtime-credit/credit-eligibility`,
  recharge:       (id) => `${BASE_URL}/api/v1/recharges/${id}`,

  // OTP
  otp:            `${BASE_URL}/api/v1/otp`,
  otpVerify:      `${BASE_URL}/api/v1/otp/verification`,

  // VAS Subscriptions
  vasSubscriptions: `${BASE_URL}/api/v1/vas/subscriptions`,
  vasOffers:        `${BASE_URL}/api/v1/vas/subscriptions/offers`,
};

/**
 * Central fetch wrapper — add auth headers here when needed.
 */
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