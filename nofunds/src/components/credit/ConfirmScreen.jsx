import { useState, useRef, useEffect } from "react";

export default function ConfirmScreen({ selectedOption, onConfirm, onBack }) {
  const [step, setStep] = useState("confirm"); // "confirm" | "otp"
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const inputsRef = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (step !== "otp") return;
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer, step]);

  if (!selectedOption) return null;

  // ── OTP input handlers ──────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // digits only
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setOtpError("");
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted.length === 4) {
      setOtp(pasted.split(""));
      inputsRef.current[3]?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 4) {
      setOtpError("Please enter the 4-digit code.");
      return;
    }
    setVerifying(true);
    // Simulate verify — replace with real API call
    setTimeout(() => {
      setVerifying(false);
      onConfirm(); // proceed to success
    }, 900);
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setOtpError("");
    setResendTimer(30);
    inputsRef.current[0]?.focus();
  };

  // ── STEP: Confirm ───────────────────────────────────────────
  if (step === "confirm") {
    return (
      <div className="space-y-4">
        {/* Hero card */}
        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <p className="text-base font-bold text-gray-800 mb-2">Borrow {selectedOption.name}</p>
          <p className="text-5xl font-black text-blue-700 leading-none">{selectedOption.amount}</p>
          <p className="text-sm text-gray-400 mt-2">{selectedOption.validity}</p>
        </div>

        {/* Detail rows */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <Row label="Credit Amount" value={selectedOption.amount} />
          <Row label="Service Fee" value={`${selectedOption.serviceFee} service fee`} />
          <Row label="Total Repayment" value={`${selectedOption.totalRepayment} deducted on next recharge`} bold />
          <Row label="Validity" value={selectedOption.validity} last />
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-700 leading-relaxed">
            By proceeding, you agree that {selectedOption.totalRepayment} will be automatically
            deducted from your next recharge.
          </p>
        </div>

        {/* Confirm button → goes to OTP step */}
        <button
          onClick={() => { setStep("otp"); setResendTimer(30); }}
          className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 rounded-2xl font-bold text-base hover:opacity-90 transition"
        >
          Confirm Borrow
        </button>

        <button
          onClick={onBack}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition py-1"
        >
          Back
        </button>
      </div>
    );
  }

  // ── STEP: OTP ───────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1 pt-2">
        {/* Shield icon */}
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800">Verify It's You</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          We sent a 4-digit code to your registered number.<br />
          Enter it below to complete your borrow request.
        </p>
      </div>

      {/* Summary pill */}
      <div className="flex items-center justify-center gap-2 bg-blue-50 rounded-xl px-4 py-2.5">
        <span className="text-blue-700 font-black text-base">{selectedOption.amount}</span>
        <span className="text-gray-300">·</span>
        <span className="text-xs text-gray-500">{selectedOption.totalRepayment} repayment</span>
      </div>

      {/* OTP inputs */}
      <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(i, e)}
            className={`w-14 h-14 text-center text-2xl font-black rounded-2xl border-2 outline-none transition-all
              ${digit ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-800"}
              ${otpError ? "border-red-400 bg-red-50" : ""}
              focus:border-blue-500 focus:bg-blue-50`}
          />
        ))}
      </div>

      {/* Error */}
      {otpError && (
        <p className="text-center text-sm text-red-500">{otpError}</p>
      )}

      {/* Resend */}
      <div className="text-center">
        {resendTimer > 0 ? (
          <p className="text-xs text-gray-400">
            Resend code in <span className="font-semibold text-gray-600">{resendTimer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            Resend Code
          </button>
        )}
      </div>

      {/* Verify button */}
      <button
        onClick={handleVerify}
        disabled={verifying || otp.join("").length < 4}
        className={`w-full py-4 rounded-2xl font-bold text-base text-white transition
          ${verifying || otp.join("").length < 4
            ? "bg-blue-200 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-90"
          }`}
      >
        {verifying ? "Verifying…" : "Verify & Confirm"}
      </button>

      {/* Back to confirm */}
      <button
        onClick={() => { setStep("confirm"); setOtp(["", "", "", ""]); setOtpError(""); }}
        className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition py-1"
      >
        Back
      </button>
    </div>
  );
}

function Row({ label, value, bold, last }) {
  return (
    <div className={`flex items-center justify-between px-5 py-4 ${!last ? "border-b border-gray-100" : ""}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm text-right max-w-[55%] ${bold ? "font-bold text-gray-900" : "text-gray-700"}`}>
        {value}
      </span>
    </div>
  );
}