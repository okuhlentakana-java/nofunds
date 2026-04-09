import { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";

const BACKEND_URL = "https://uncurbable-brianne-cruelly.ngrok-free.dev";

const COUNTRIES = [
  { code: "ZA", name: "South Africa",   dial: "+27",  flag: "🇿🇦" },
  { code: "ZW", name: "Zimbabwe",        dial: "+263", flag: "🇿🇼" },
  { code: "ZM", name: "Zambia",          dial: "+260", flag: "🇿🇲" },
  { code: "BW", name: "Botswana",        dial: "+267", flag: "🇧🇼" },
  { code: "MZ", name: "Mozambique",      dial: "+258", flag: "🇲🇿" },
  { code: "NA", name: "Namibia",         dial: "+264", flag: "🇳🇦" },
  { code: "LS", name: "Lesotho",         dial: "+266", flag: "🇱🇸" },
  { code: "SZ", name: "Eswatini",        dial: "+268", flag: "🇸🇿" },
  { code: "MW", name: "Malawi",          dial: "+265", flag: "🇲🇼" },
  { code: "TZ", name: "Tanzania",        dial: "+255", flag: "🇹🇿" },
  { code: "KE", name: "Kenya",           dial: "+254", flag: "🇰🇪" },
  { code: "UG", name: "Uganda",          dial: "+256", flag: "🇺🇬" },
  { code: "NG", name: "Nigeria",         dial: "+234", flag: "🇳🇬" },
  { code: "GH", name: "Ghana",           dial: "+233", flag: "🇬🇭" },
  { code: "ET", name: "Ethiopia",        dial: "+251", flag: "🇪🇹" },
  { code: "EG", name: "Egypt",           dial: "+20",  flag: "🇪🇬" },
  { code: "MA", name: "Morocco",         dial: "+212", flag: "🇲🇦" },
  { code: "SN", name: "Senegal",         dial: "+221", flag: "🇸🇳" },
  { code: "CI", name: "Côte d'Ivoire",   dial: "+225", flag: "🇨🇮" },
  { code: "CM", name: "Cameroon",        dial: "+237", flag: "🇨🇲" },
  { code: "AO", name: "Angola",          dial: "+244", flag: "🇦🇴" },
  { code: "RW", name: "Rwanda",          dial: "+250", flag: "🇷🇼" },
  { code: "GB", name: "United Kingdom",  dial: "+44",  flag: "🇬🇧" },
  { code: "US", name: "United States",   dial: "+1",   flag: "🇺🇸" },
  { code: "CA", name: "Canada",          dial: "+1",   flag: "🇨🇦" },
  { code: "AU", name: "Australia",       dial: "+61",  flag: "🇦🇺" },
  { code: "IN", name: "India",           dial: "+91",  flag: "🇮🇳" },
  { code: "DE", name: "Germany",         dial: "+49",  flag: "🇩🇪" },
  { code: "FR", name: "France",          dial: "+33",  flag: "🇫🇷" },
  { code: "BR", name: "Brazil",          dial: "+55",  flag: "🇧🇷" },
  { code: "AE", name: "UAE",             dial: "+971", flag: "🇦🇪" },
  { code: "PT", name: "Portugal",        dial: "+351", flag: "🇵🇹" },
  { code: "NL", name: "Netherlands",     dial: "+31",  flag: "🇳🇱" },
];

const paymentMethods = [
  {
    id: "ecocash", label: "EcoCash", desc: "Pay from mobile wallet",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    bg: "#16a34a",
  },
  {
    id: "card", label: "Card (PayFast)", desc: "Debit or credit card",
    icon: <CiCreditCard1 className="w-5 h-5 text-white" />,
    bg: "#1a237e",
  },
];

function parseAmount(priceStr) {
  if (!priceStr) return 0;
  return parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
}

// ── Country picker ────────────────────────────────────────────────────────────
function CountryPicker({ selected, onSelect }) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef          = useRef(null);
  const searchRef           = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false); setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button type="button" onClick={() => { setOpen(!open); setSearch(""); }}
        className="flex items-center gap-1.5 px-3 h-full border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 hover:bg-gray-100 transition whitespace-nowrap">
        <span className="text-lg">{selected.flag}</span>
        <span className="text-sm font-semibold text-gray-600">{selected.dial}</span>
        <svg className={`w-3 h-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white rounded-lg border border-gray-200">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input ref={searchRef} type="text" placeholder="Country name or code..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent" />
              {search && <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600"><FaTimes size={10} /></button>}
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0
              ? <p className="text-center text-sm text-gray-400 py-5">No countries found</p>
              : filtered.map((c) => (
                <button key={c.code} type="button"
                  onClick={() => { onSelect(c); setOpen(false); setSearch(""); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 transition ${selected.code === c.code ? "bg-indigo-50" : ""}`}>
                  <span className="text-base">{c.flag}</span>
                  <span className="flex-1 text-sm text-gray-700 text-left truncate">{c.name}</span>
                  <span className="text-xs font-mono font-semibold text-gray-400">{c.dial}</span>
                  {selected.code === c.code && (
                    <svg className="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function PaymentModal({
  isOpen,
  onClose,
  item,
  onSuccess,
  forceSuccess   = false,   // true  → show success screen immediately (PayFast return)
  forceCancelled = false,   // true  → show cancelled screen immediately (PayFast cancel)
  restoredPhone  = "",      // phone number saved before redirect, shown on success screen
}) {
  const [method, setMethod]         = useState("ecocash");
  const [methodOpen, setMethodOpen] = useState(false);
  const [country, setCountry]       = useState(COUNTRIES[0]);
  const [localPhone, setLocalPhone] = useState("");
  const [email, setEmail]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState(forceSuccess);
  const [cancelled, setCancelled]   = useState(forceCancelled);
  const [error, setError]           = useState("");

  if (!isOpen || !item) return null;

  const selected   = paymentMethods.find((m) => m.id === method);
  const isMobile   = method === "ecocash";
  const isCard     = method === "card";
  const digits     = localPhone.replace(/\D/g, "");
  const fullPhone  = restoredPhone || `${country.dial}${digits}`;

  const canSubmit = () => {
    if (isMobile) return digits.length >= 7;
    if (isCard)   return digits.length >= 7 && email.includes("@");
    return false;
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/[^\d\s-]/g, "");
    if (val.startsWith("0")) val = val.slice(1);
    setLocalPhone(val);
  };

  const submitPayFastForm = (actionUrl, fields) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = actionUrl;
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden"; input.name = name; input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  };

  const handleConfirm = async () => {
    if (!canSubmit()) return;
    setLoading(true);
    setError("");
    try {
      if (isCard) {
        // Save details so we can restore them on the return page
        sessionStorage.setItem("pendingPayment", JSON.stringify({
          item, phone: fullPhone, email, amount: parseAmount(item.price),
        }));
        const res = await fetch(`${BACKEND_URL}/api/payment/initiate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemName: item.name,
            amount:   parseAmount(item.price),
            phone:    fullPhone,
            email,
          }),
        });
        if (!res.ok) throw new Error("Server error — could not initiate payment.");
        const data = await res.json();
        submitPayFastForm(data.payfast_url, data.fields);
      } else {
        // EcoCash mock
        await new Promise((r) => setTimeout(r, 1300));
        setLoading(false);
        setSuccess(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setMethod("ecocash"); setMethodOpen(false);
    setCountry(COUNTRIES[0]); setLocalPhone("");
    setEmail(""); setLoading(false);
    setSuccess(false); setCancelled(false); setError("");
    onClose();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">

        {/* ── ✅ SUCCESS ──────────────────────────────────────────────────── */}
        {success && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-1">Payment Successful!</h3>
            <p className="text-gray-500 mb-4">Your {item.name} has been activated.</p>
            <div className="bg-gray-50 rounded-xl p-4 text-left mb-5 space-y-2">
              {[
                ["Bundle",      item.name],
                ["Amount Paid", item.price],
                ["Method",      selected?.label],
                ["Phone",       fullPhone],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="font-semibold text-gray-800 text-sm">{val}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { if (onSuccess) onSuccess(); handleClose(); }}
              className="w-full py-3 bg-gradient-to-r from-indigo-800 to-blue-600 text-white rounded-xl font-bold">
              Done
            </button>
          </div>
        )}

        {/* ── ❌ CANCELLED ────────────────────────────────────────────────── */}
        {cancelled && !success && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-1">Payment Cancelled</h3>
            <p className="text-gray-500 mb-2">You cancelled the payment on PayFast.</p>
            <p className="text-sm text-gray-400 mb-6">No money was deducted. You can try again whenever you're ready.</p>
            <div className="flex gap-3">
              <button onClick={handleClose}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition">
                Close
              </button>
              <button onClick={() => { setCancelled(false); setError(""); }}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-800 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ── 💳 PAYMENT FORM ─────────────────────────────────────────────── */}
        {!success && !cancelled && (
          <div className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Payment</h2>
              <button onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <FaTimes size={14} />
              </button>
            </div>

            {/* Bundle summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.validity}</p>
                </div>
                <p className="font-extrabold text-indigo-700">{item.price}</p>
              </div>
              {item.description && <p className="text-xs text-gray-500 mt-2">{item.description}</p>}
            </div>

            {/* Payment method */}
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Payment Method</p>
            <div className="relative mb-5">
              <button onClick={() => setMethodOpen(!methodOpen)}
                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:border-indigo-300 transition">
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
                      className={`w-full flex items-center gap-3 p-3 hover:bg-indigo-50 transition ${method === m.id ? "bg-indigo-50" : ""}`}>
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

            {/* Phone */}
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
              {isMobile ? "EcoCash Number" : "Mobile Number"}
            </p>
            <div className="flex rounded-xl border border-gray-200 overflow-visible focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 mb-1">
              <CountryPicker selected={country} onSelect={(c) => { setCountry(c); setLocalPhone(""); }} />
              <input type="tel" placeholder="81 234 5678" value={localPhone} onChange={handlePhoneChange}
                className="flex-1 px-3 py-3 outline-none text-gray-800 bg-transparent rounded-r-xl text-sm" />
            </div>
            {digits.length > 0 && (
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs text-gray-400">Full number:</span>
                <span className="text-xs font-bold text-indigo-600 font-mono">{fullPhone}</span>
              </div>
            )}

            {/* Email — card only */}
            {isCard && (
              <>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1 mt-3">Email Address</p>
                <input type="email" placeholder="you@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none mb-3" />
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-2 flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                  </svg>
                  <p className="text-xs text-blue-700">
                    You'll be securely redirected to <strong>PayFast</strong> to complete your payment.
                    You'll return here automatically afterwards.
                  </p>
                </div>
              </>
            )}

            <p className="text-xs text-gray-400 mb-4">
              {isMobile
                ? "A payment prompt will be sent to this number."
                : "Your receipt will be sent to your email address."}
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-4">{error}</div>
            )}

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="text-xl font-extrabold text-indigo-700">{item.price}</span>
            </div>

            <button onClick={handleConfirm} disabled={!canSubmit() || loading}
              className={`w-full py-3 rounded-xl font-bold transition ${
                canSubmit() && !loading
                  ? "bg-gradient-to-r from-indigo-800 to-blue-600 text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}>
              {loading
                ? (isCard ? "Redirecting to PayFast..." : "Processing...")
                : (isCard ? "Pay with PayFast →" : "Confirm Purchase")}
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