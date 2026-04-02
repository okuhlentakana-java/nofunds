import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";

const paymentMethods = [
  {
    id: "ecocash",
    label: "EcoCash",
    desc: "Pay from mobile wallet",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    bg: "#16a34a",
  },
  {
    id: "mpesa",
    label: "M-Pesa",
    desc: "Mobile money transfer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    bg: "#e53935",
  },
  {
    id: "visa",
    label: "VISA",
    desc: "Debit or credit card",
    icon: <SiVisa className="w-5 h-5 text-white" />,
    bg: "#1a237e",
  },
  {
    id: "mastercard",
    label: "Mastercard",
    desc: "Debit or credit card",
    icon: <SiMastercard className="w-5 h-5 text-white" />,
    bg: "#f59e0b",
  },
];

export default function PaymentModal({ isOpen, onClose, item, onSuccess }) {
  const [method, setMethod] = useState("ecocash");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const selected = paymentMethods.find(m => m.id === method);
  const isMobile = method === "mpesa" || method === "ecocash";
  const isCard = method === "visa" || method === "mastercard";

  const canSubmit = () => {
    if (isMobile) return phone.replace(/\D/g, "").length >= 8;
    if (isCard) {
      const cardDigits = card.number.replace(/\s/g, "");
      return cardDigits.length === 16 && card.expiry.length === 5 && card.cvv.length >= 3;
    }
    return false;
  };

  const formatPhone = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
    return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  };

  const formatCardNumber = (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleConfirm = () => {
    if (!canSubmit()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const handleClose = () => {
    setMethod("ecocash");
    setPhone("");
    setCard({ number: "", expiry: "", cvv: "" });
    setDropdownOpen(false);
    setLoading(false);
    setSuccess(false);
    onClose();
  };

  const handleDone = () => {
    if (onSuccess) onSuccess();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {success ? (
          // Success Screen
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">Payment Successful!</h3>
            <p className="text-gray-500 mb-4">
              Your {item.name} has been activated.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Bundle</span>
                <span className="font-semibold text-gray-800">{item.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-sm">Amount Paid</span>
                <span className="font-bold text-indigo-700">{item.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Method</span>
                <span className="font-semibold text-gray-800">{selected?.label}</span>
              </div>
            </div>
            <button
              onClick={handleDone}
              className="w-full py-3 bg-gradient-to-r from-indigo-800 to-blue-600 text-white rounded-xl font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          // Payment Form
          <div className="p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Payment</h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Bundle Summary Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 mb-6">
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

            {/* Payment Method Label */}
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
              Payment Method
            </p>

            {/* Dropdown */}
            <div className="relative mb-4">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:border-indigo-300 transition"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: selected?.bg }}
                >
                  {selected?.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-800">{selected?.label}</div>
                  <div className="text-xs text-gray-400">{selected?.desc}</div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {paymentMethods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setMethod(m.id);
                        setDropdownOpen(false);
                        setPhone("");
                        setCard({ number: "", expiry: "", cvv: "" });
                      }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-indigo-50 transition ${
                        method === m.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: m.bg }}
                      >
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

            {/* Dynamic Inputs */}
            {isMobile && (
              <>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                  {selected?.label} Number
                </p>
                <input
                  type="tel"
                  placeholder="e.g. 266 5X XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none mb-4"
                />
              </>
            )}

            {isCard && (
              <>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                  Card Number
                </p>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={formatCardNumber(card.number)}
                  onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\s/g, "") })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none mb-3"
                />
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                      Expiry
                    </p>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formatExpiry(card.expiry)}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                      CVV
                    </p>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Total & Confirm */}
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
              {loading ? "Processing..." : "Confirm Purchase"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}