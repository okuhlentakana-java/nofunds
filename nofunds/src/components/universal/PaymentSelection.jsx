import { useState } from "react";

const paymentMethods = [
  {
    id: "ecocash",
    label: "EcoCash",
    desc: "Pay from mobile wallet",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
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
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    bg: "#e53935",
  },
  {
    id: "visa",
    label: "VISA",
    desc: "Debit or credit card",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    bg: "#1a237e",
  },
  {
    id: "mastercard",
    label: "Mastercard",
    desc: "Debit or credit card",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    bg: "#f59e0b",
  },
];

export default function PaymentSelection({
  amount,
  paymentMethod,
  onPaymentMethodSelect,
  mpesaNumber,
  onMpesaNumberChange,
  ecocashNumber,
  onEcocashNumberChange,
  cardDetails,
  onCardDetailsChange,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);
  const isMobile = paymentMethod === "mpesa" || paymentMethod === "ecocash";
  const isCard = paymentMethod === "visa" || paymentMethod === "mastercard";

  // Phone number formatting & validation (Lesotho: 266 + 8 digits)
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  };

  const handlePhoneChange = (value, onChange) => {
    const formatted = formatPhone(value);
    onChange(formatted);
    const digits = value.replace(/\D/g, "");
    if (digits.length && digits.length !== 11) {
      setErrors((prev) => ({ ...prev, phone: "Enter 11-digit number (266XXXXXXXX)" }));
    } else if (digits.length === 11 && !/^266\d{8}$/.test(digits)) {
      setErrors((prev) => ({ ...prev, phone: "Number must start with 266" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  // Card formatting & validation
  const formatCardNumber = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (value) => {
    const formatted = formatCardNumber(value);
    onCardDetailsChange({ ...cardDetails, number: formatted });
    const digits = value.replace(/\D/g, "");
    if (digits.length && digits.length !== 16) {
      setErrors((prev) => ({ ...prev, cardNumber: "Card number must be 16 digits" }));
    } else {
      setErrors((prev) => ({ ...prev, cardNumber: null }));
    }
  };

  const formatExpiry = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handleExpiryChange = (value) => {
    const formatted = formatExpiry(value);
    onCardDetailsChange({ ...cardDetails, expiry: formatted });
    if (formatted.length === 5 && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formatted)) {
      setErrors((prev) => ({ ...prev, expiry: "Invalid expiry (MM/YY)" }));
    } else {
      setErrors((prev) => ({ ...prev, expiry: null }));
    }
  };

  const handleCVVChange = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 4);
    onCardDetailsChange({ ...cardDetails, cvv: digits });
    if (digits.length && (digits.length < 3 || digits.length > 4)) {
      setErrors((prev) => ({ ...prev, cvv: "CVV must be 3 or 4 digits" }));
    } else {
      setErrors((prev) => ({ ...prev, cvv: null }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Recharge Amount – kept for RechargePage compatibility */}
      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
        <p className="text-sm text-blue-600 font-medium">Recharge Amount</p>
        <p className="text-3xl font-bold text-blue-700">M{amount}</p>
      </div>

      {/* Payment Method Dropdown */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
          Payment Method
        </label>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white hover:border-indigo-300 transition"
          >
            {selectedMethod ? (
              <>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: selectedMethod.bg }}
                >
                  {selectedMethod.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-800">{selectedMethod.label}</div>
                  <div className="text-xs text-gray-400">{selectedMethod.desc}</div>
                </div>
              </>
            ) : (
              <span className="text-gray-400">Select payment method</span>
            )}
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
                    onPaymentMethodSelect(m.id);
                    setDropdownOpen(false);
                    setErrors({});
                    // Clear fields when switching method
                    if (m.id === "mpesa") onMpesaNumberChange("");
                    if (m.id === "ecocash") onEcocashNumberChange("");
                    if (m.id === "visa" || m.id === "mastercard") {
                      onCardDetailsChange({ number: "", expiry: "", cvv: "" });
                    }
                  }}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-indigo-50 transition ${
                    paymentMethod === m.id ? "bg-indigo-50" : ""
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
                  {paymentMethod === m.id && (
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Input Fields */}
      {isMobile && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
            {selectedMethod?.label} Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 266 5X XXX XXXX"
            value={paymentMethod === "mpesa" ? mpesaNumber : ecocashNumber}
            onChange={(e) =>
              handlePhoneChange(
                e.target.value,
                paymentMethod === "mpesa" ? onMpesaNumberChange : onEcocashNumberChange
              )
            }
            className={`w-full p-3 border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition ${
              errors.phone ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      )}

      {isCard && (
        <>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardDetails.number}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              className={`w-full p-3 border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition ${
                errors.cardNumber ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                Expiry
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
                className={`w-full p-3 border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition ${
                  errors.expiry ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">
                CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                value={cardDetails.cvv}
                onChange={(e) => handleCVVChange(e.target.value)}
                className={`w-full p-3 border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition ${
                  errors.cvv ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}