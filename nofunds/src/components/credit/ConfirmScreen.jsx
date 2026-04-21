import { useState, useRef, useEffect } from "react";
import { ENDPOINTS, apiFetch } from "../../api";

export default function ConfirmScreen({ selectedOption, phoneNumber, onConfirm, onBack }) {
  const [step,        setStep]        = useState("confirm");
  const [otp,         setOtp]         = useState(["", "", "", ""]);
  const [otpError,    setOtpError]    = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [verifying,   setVerifying]   = useState(false);
  const [sending,     setSending]     = useState(false);   // OTP send in-flight
  const [sendError,   setSendError]   = useState("");      // OTP send failure
  const [otpId,       setOtpId]       = useState(null);    // id from POST /otp response
  const inputsRef = useRef([]);

  // Countdown timer for resend
  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer, step]);

  if (!selectedOption) return null;

  // ── OTP input handlers ───────────────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setOtpError("");
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
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

  // ── Send OTP ─────────────────────────────────────────────────────────────
  const sendOtp = async () => {
    setSending(true);
    setSendError("");
    try {
      const res = await apiFetch(ENDPOINTS.otp, {
        method: "POST",
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
      // res.data.id is used during verification to identify the OTP session
      setOtpId(res?.data?.id ?? null);
      setStep("otp");
      setResendTimer(30);
      setOtp(["", "", "", ""]);
      setOtpError("");
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    } catch (err) {
      setSendError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // ── Resend OTP ───────────────────────────────────────────────────────────
  const handleResend = async () => {
    setOtp(["", "", "", ""]);
    setOtpError("");
    await sendOtp();
  };

  // ── Verify OTP ───────────────────────────────────────────────────────────
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 4) {
      setOtpError("Please enter the 4-digit code.");
      return;
    }
    setVerifying(true);
    setOtpError("");
    try {
      await apiFetch(ENDPOINTS.otpVerify, {
        method: "POST",
        body: JSON.stringify({
          phone_number: phoneNumber,
          otp:          code,
        }),
      });
      onConfirm(); // OTP verified — proceed to success
    } catch (err) {
      setOtpError(err.message || "Invalid code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  // ── STEP: Confirm ────────────────────────────────────────────────────────
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
          <Row label="Credit Amount"    value={selectedOption.amount} />
          <Row label="Service Fee"      value={`${selectedOption.serviceFee} service fee`} />
          <Row label="Total Repayment"  value={`${selectedOption.totalRepayment} deducted on next recharge`} bold />
          <Row label="Validity"         value={selectedOption.validity} last />
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-700 leading-relaxed">
            By proceeding, you agree that {selectedOption.totalRepayment} will be automatically
            deducted from your next recharge.
          </p>
        </div>

        {/* Send error */}
        {sendError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-sm text-red-600 text-center">{sendError}</p>
          </div>
        )}

        {/* Confirm → triggers OTP send */}
        <button
          onClick={sendOtp}
          disabled={sending}
          className={`w-full py-4 rounded-2xl font-bold text-base text-white transition ${
            sending
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-90"
          }`}
        >
          {sending ? "Sending Code…" : "Confirm Borrow"}
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

  // ── STEP: OTP ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="text-center space-y-1 pt-2">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800">Verify It's You</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          We sent a 4-digit code to{" "}
          <span className="font-semibold text-gray-600">{phoneNumber ?? "your registered number"}</span>.
          <br />Enter it below to complete your borrow request.
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
              ${digit         ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-800"}
              ${otpError      ? "border-red-400 bg-red-50" : ""}
              focus:border-blue-500 focus:bg-blue-50`}
          />
        ))}
      </div>

      {otpError && (
        <p className="text-center text-sm text-red-500">{otpError}</p>
      )}

      {/* Resend */}
      <div className="text-center">
        {resendTimer > 0 ? (
          <p className="text-xs text-gray-400">
            Resend code in{" "}
            <span className="font-semibold text-gray-600">{resendTimer}s</span>
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

      {/* Verify */}
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