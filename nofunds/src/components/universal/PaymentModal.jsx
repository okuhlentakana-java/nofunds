import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { ENDPOINTS, generateReference } from "../../api/index";

const LESOTHO = { code: "LS", dial: "+266" };
const MAX_PHONE_DIGITS = 8;

const paymentMethods = [
  {
    id: "ecocash",
    label: "EcoCash",
    desc: "Pay from mobile wallet",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    bg: "#16a34a",
  },
  {
    id: "card",
    label: "Card (PayFast)",
    desc: "Debit or credit card",
    icon: <CiCreditCard1 className="w-5 h-5 text-white" />,
    bg: "#1a237e",
  },
];

function parseAmount(priceStr) {
  if (!priceStr) return 0;
  return parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
}

function loadPayFastEngine() {
  return new Promise((resolve) => {
    if (window.payfast_do_onsite_payment) return resolve();
    const script = document.createElement("script");
    script.src = "https://www.payfast.co.za/onsite/engine.js";
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

/**
 * Props:
 *   isOpen       – boolean
 *   onClose      – fn
 *   onSuccess    – fn
 *   item         – { name, description, price, validity }
 *   type         – "bundle" | "airtime"   (default: "bundle")
 *   bundleCode   – string  (required when type="bundle")
 */
export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  item,
  type = "bundle",
  bundleCode,
}) {
  const [method,      setMethod]      = useState("ecocash");
  const [methodOpen,  setMethodOpen]  = useState(false);
  const [localPhone,  setLocalPhone]  = useState("");
  const [email,       setEmail]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [error,       setError]       = useState("");

  if ((!isOpen && !success && !error) || !item) return null;

  const selected     = paymentMethods.find((m) => m.id === method);
  const isMobile     = method === "ecocash";
  const isCard       = method === "card";
  const localDigits  = localPhone.replace(/\D/g, "");

  const buildFullPhone = (raw) => `${LESOTHO.dial}${raw.replace(/\D/g, "")}`;
  const canSubmit      = () => localDigits.length >= 7 && localDigits.length <= MAX_PHONE_DIGITS;

  const handlePhoneChange = (e) => {
    const raw    = e.target.value.replace(/[^\d\s-]/g, "");
    const digits = raw.replace(/\D/g, "");
    if (digits.length > MAX_PHONE_DIGITS) return;
    setLocalPhone(raw);
  };

  // ── EcoCash recharge call ──────────────────────────────────────────────
  const doEcocashRecharge = async (fullPhone) => {
    const reference = generateReference();
    const body      = type === "airtime"
      ? {
          sponsor_phone_number:      fullPhone,
          beneficiary_phone_number:  fullPhone,
          reference,
          currency:                  "LSL",
          amount:                    parseAmount(item.price),
          payment_method:            "ecocash",
        }
      : {
          sponsor_phone_number:      fullPhone,
          beneficiary_phone_number:  fullPhone,
          reference,
          bundle_code:               bundleCode ?? item.code ?? "",
          payment_method:            "ecocash",
        };

    const endpoint = type === "airtime"
      ? ENDPOINTS.airtimeRecharge
      : ENDPOINTS.bundleRecharge;

    const res = await fetch(endpoint, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message || `Server error ${res.status}`);
    }
    return res.json();
  };

  // ── PayFast card initiation ────────────────────────────────────────────
  const doCardPayment = async (fullPhone) => {
    await loadPayFastEngine();
    const res = await fetch(ENDPOINTS.payfastInitiate, {
      method:  "POST",
      headers: {
        "Content-Type":              "application/json",
        "ngrok-skip-browser-warning":"true",
      },
      body: JSON.stringify({
        itemName: item.name,
        amount:   parseAmount(item.price),
        phone:    fullPhone,
        email:    email.trim() || undefined,
      }),
    });
    if (!res.ok) throw new Error("Server error — could not initiate payment.");
    const data = await res.json();
    if (!data.uuid) throw new Error("No payment identifier returned from server.");
    return data.uuid;
  };

  const handleConfirm = async () => {
    if (!canSubmit()) return;
    setLoading(true);
    setError("");

    const fullPhone = buildFullPhone(localPhone);

    try {
      if (isMobile) {
        await doEcocashRecharge(fullPhone);
        setLoading(false);
        setSuccess(true);
      } else {
        const uuid = await doCardPayment(fullPhone);
        setLoading(false);
        onClose(); // give PayFast the full screen

        window.payfast_do_onsite_payment({ uuid }, (result) => {
          if (result === true || result === "true" || result === 1) {
            setSuccess(true);
          } else {
            setError(
              result === false || result === null
                ? "Payment was cancelled. Please try again."
                : "Payment failed. Please try again."
            );
          }
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setMethod("ecocash"); setMethodOpen(false);
    setLocalPhone("");    setEmail("");
    setLoading(false);    setSuccess(false); setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">

        {/* ── SUCCESS ──────────────────────────────────────────────────── */}
        {success && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-1">
              {type === "airtime" ? "Recharge Successful!" : "Bundle Activated!"}
            </h3>
            <p className="text-gray-500 mb-4">
              {type === "airtime"
                ? `M${parseAmount(item.price).toFixed(2)} airtime has been added to your account.`
                : `Your ${item.name} bundle has been activated.`}
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left mb-5 space-y-2">
              {[
                [type === "airtime" ? "Amount"  : "Bundle", item.name],
                ["Paid",    item.price],
                ["Method",  selected?.label],
                ["Phone",   buildFullPhone(localPhone)],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="font-semibold text-gray-800 text-sm">{val}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { if (onSuccess) onSuccess(); handleClose(); }}
              className="w-full py-3 bg-gradient-to-r from-indigo-800 to-blue-600 text-white rounded-xl font-bold"
            >
              Done
            </button>
          </div>
        )}

        {/* ── ERROR ────────────────────────────────────────────────────── */}
        {error && !success && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8"  x2="12"    y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-1">Payment Unsuccessful</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <div className="flex gap-3">
              <button onClick={handleClose}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition">
                Close
              </button>
              <button onClick={() => setError("")}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-800 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── PAYMENT FORM ─────────────────────────────────────────────── */}
        {!success && !error && (
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {type === "airtime" ? "Airtime Recharge" : "Buy Bundle"}
              </h2>
              <button onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <FaTimes size={14} />
              </button>
            </div>

            {/* Item summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.validity}</p>
                </div>
                <p className="font-extrabold text-indigo-700">{item.price}</p>
              </div>
              {item.description && (
                <p className="text-xs text-gray-500 mt-2">{item.description}</p>
              )}
            </div>

            {/* Payment method picker */}
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Payment Method</p>
            <div className="relative mb-5">
              <button
                onClick={() => setMethodOpen(!methodOpen)}
                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:border-indigo-300 transition"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: selected?.bg }}>
                  {selected?.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-800">{selected?.label}</div>
                  <div className="text-xs text-gray-400">{selected?.desc}</div>
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${methodOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {methodOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {paymentMethods.map((m) => (
                    <button key={m.id}
                      onClick={() => { setMethod(m.id); setMethodOpen(false); setLocalPhone(""); setEmail(""); setError(""); }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-indigo-50 transition ${method === m.id ? "bg-indigo-50" : ""}`}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: m.bg }}>
                        {m.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-800">{m.label}</div>
                        <div className="text-xs text-gray-400">{m.desc}</div>
                      </div>
                      {method === m.id && (
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone number */}
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
              {isMobile ? "EcoCash Number" : "Mobile Number"}
            </p>
            <input
              type="tel"
              placeholder="57 123 456"
              value={localPhone}
              onChange={handlePhoneChange}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-gray-800 text-sm mb-1"
            />
            {localDigits.length > 0 && (
              <p className="text-xs text-gray-400 mb-1">
                Full number:{" "}
                <span className="font-bold text-indigo-600 font-mono">{buildFullPhone(localPhone)}</span>
              </p>
            )}

            {/* Email — card only */}
            {isCard && (
              <>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1 mt-3">
                  Email Address{" "}
                  <span className="font-normal normal-case text-gray-400">(optional)</span>
                </p>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none mb-3"
                />
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-2 flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  <p className="text-xs text-blue-700">
                    {email.trim() ? "A receipt will be sent to your email." : "Add an email above to receive a receipt."}
                  </p>
                </div>
              </>
            )}

            <p className="text-xs text-gray-400 mb-4">
              {isMobile
                ? "A payment prompt will be sent to this number."
                : "Complete your card payment in the secure overlay."}
            </p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="text-xl font-extrabold text-indigo-700">{item.price}</span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!canSubmit() || loading}
              className={`w-full py-3 rounded-xl font-bold transition ${
                canSubmit() && !loading
                  ? "bg-gradient-to-r from-indigo-800 to-blue-600 text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading
                ? (isCard ? "Loading PayFast..." : "Processing...")
                : (isCard ? "Pay with Card →" : "Confirm Purchase")}
            </button>

            {isCard && (
              <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 11c0-1.1.9-2 2-2s2 .9 2 2v2H10v-2c0-1.1.9-2 2-2zm-6 9V10a6 6 0 1112 0v10H6z" />
                </svg>
                Secured by PayFast · PCI DSS Compliant
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}