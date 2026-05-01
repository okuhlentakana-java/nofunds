import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSpinner, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { LuHandCoins } from "react-icons/lu";
import CreditTabs from "../components/credit/CreditTabs";
import OptionCard from "../components/credit/OptionCard";
import ConfirmScreen from "../components/credit/ConfirmScreen";
import SuccessScreen from "../components/credit/SuccessScreen";
import { ENDPOINTS } from "../api";

const CURRENCY        = "LSL";
const DIAL_CODE       = "+266";
const MAX_DIGITS      = 8;

// Strips non-digits, enforces max 8
function sanitiseDigits(raw) {
  return raw.replace(/\D/g, "").slice(0, MAX_DIGITS);
}

function buildFullPhone(digits) {
  return `${DIAL_CODE}${digits}`;
}

// ── Step 1: Phone input + intro ───────────────────────────────────────────────
function IntroScreen({ digits, onDigitsChange, onCheckEligibility, loading, error }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <LuHandCoins className="w-8 h-8 text-blue-700" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Airtime Credit Service</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Borrow airtime, data, voice minutes, or SMS when you run out.
          Enter your phone number to check eligibility.
        </p>

        <div className="text-left mb-4">
          <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
            Phone Number
          </label>

          {/* Dial code prefix + input — mirrors PaymentModal */}
          <div className={`flex items-center border rounded-xl overflow-hidden transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent ${
            error ? "border-red-400" : "border-gray-200"
          }`}>
            <span className="px-3 py-3 bg-gray-50 text-sm font-semibold text-gray-600 border-r border-gray-200 select-none whitespace-nowrap">
              {DIAL_CODE}
            </span>
            <input
              type="tel"
              value={digits}
              onChange={(e) => onDigitsChange(sanitiseDigits(e.target.value))}
              placeholder="57 123 456"
              maxLength={MAX_DIGITS}
              className="flex-1 px-3 py-3 text-sm outline-none bg-white text-gray-800"
            />
          </div>

          {/* Live preview */}
          {digits.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              Full number:{" "}
              <span className="font-bold text-blue-600 font-mono">
                {buildFullPhone(digits)}
              </span>
            </p>
          )}

          {error && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <FaExclamationTriangle className="shrink-0" /> {error}
            </p>
          )}
        </div>

        <button
          onClick={onCheckEligibility}
          disabled={loading || digits.length < MAX_DIGITS}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition text-white ${
            loading || digits.length < MAX_DIGITS
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-900 to-blue-500 hover:opacity-90"
          }`}
        >
          {loading
            ? <FaSpinner className="animate-spin" />
            : <><FaArrowRight /> Check My Eligibility</>}
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
        <span className="text-yellow-500 mt-0.5">⚠️</span>
        <p className="text-xs text-yellow-700 leading-relaxed">
          Eligibility is based on your recharge history and account standing.
          Borrowed credit is automatically repaid on your next recharge.
        </p>
      </div>
    </div>
  );
}

// ── Checking spinner ──────────────────────────────────────────────────────────
function CheckingScreen({ message = "Analysing your account activity..." }) {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <FaSpinner className="text-blue-600 text-3xl animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Checking Eligibility</h2>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

// ── Not eligible ──────────────────────────────────────────────────────────────
function NotEligibleScreen({ onBack }) {
  return (
    <div className="text-center py-16 space-y-4 px-4">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <FaExclamationTriangle className="text-red-500 text-3xl" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Not Eligible</h2>
      <p className="text-gray-500 text-sm max-w-xs mx-auto">
        Unfortunately your account doesn't qualify for airtime credit at this time.
        Keep recharging regularly to improve your eligibility.
      </p>
      <button
        onClick={onBack}
        className="mt-4 bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition"
      >
        Go Back
      </button>
    </div>
  );
}

// ── Qualify flash ─────────────────────────────────────────────────────────────
function QualifyScreen() {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FaCheck className="text-green-600 text-3xl" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">You Qualify!</h2>
      <p className="text-xs text-gray-400">Loading your available options...</p>
    </div>
  );
}

// ── Credit score pill ─────────────────────────────────────────────────────────
function CreditScoreCard({ digits }) {
  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Available Credit</p>
      <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-mono">
        {buildFullPhone(digits)}
      </span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AirtimeCreditPage() {
  const navigate = useNavigate();

  const [step,            setStep]            = useState(1);
  const [digits,          setDigits]          = useState("");   // raw 8-digit local number
  const [phoneError,      setPhoneError]      = useState("");
  const [apiError,        setApiError]        = useState("");
  const [creditOptions,   setCreditOptions]   = useState([]);
  const [selectedOption,  setSelectedOption]  = useState(null);
  const [activeTab,       setActiveTab]       = useState("all");

  const fullPhone = buildFullPhone(digits);

  // ── 1. Check eligibility then fetch options ──────────────────────────────
  const handleCheckEligibility = async () => {
    if (digits.length < MAX_DIGITS) {
      setPhoneError(`Please enter all ${MAX_DIGITS} digits.`);
      return;
    }
    setPhoneError("");
    setApiError("");
    setStep(2);

    try {
      const eligRes  = await fetch(ENDPOINTS.creditEligibility, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone_number: fullPhone, currency: CURRENCY }),
      });
      const eligData = await eligRes.json();

      const eligible =
        eligRes.ok &&
        eligData?.status !== "error" &&
        eligData?.data?.eligible !== false;

      if (!eligible) { setStep(8); return; }

      const optRes  = await fetch(ENDPOINTS.creditOptions, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ phone_number: fullPhone, currency: CURRENCY }),
      });
      const optData = await optRes.json();
      setCreditOptions(Array.isArray(optData?.data) ? optData.data : []);

      setStep(3);
      setTimeout(() => setStep(4), 1500);
    } catch {
      setApiError("Could not reach the server. Please try again.");
      setStep(1);
    }
  };

  // ── 2. Submit credit request ─────────────────────────────────────────────
  const handleConfirmBorrow = async () => {
    if (!selectedOption) return;
    setStep(6);

    try {
      const res = await fetch(ENDPOINTS.airtimeCredit, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          phone_number: fullPhone,
          reference:    `CREDIT-${Date.now()}`,
          currency:     CURRENCY,
          amount:       selectedOption.amount ?? selectedOption.price,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.description || "Credit request failed.");
      }

      setStep(7);
      setTimeout(() => navigate("/"), 3500);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
      setStep(5);
    }
  };

  const handleSelectOption = (option) => { setSelectedOption(option); setStep(5); };
  const handleBack         = ()        => { setSelectedOption(null); setApiError(""); setStep(4); };

  const getFilteredOptions = () => {
    if (!creditOptions.length) return [];
    if (activeTab === "all")   return creditOptions;
    return creditOptions.filter(
      (o) => (o.type ?? o.category ?? "").toLowerCase() === activeTab
    );
  };

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">

      {apiError && step === 1 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2 text-xs text-red-700">
          <FaExclamationTriangle className="shrink-0 mt-0.5" /> {apiError}
        </div>
      )}

      {step === 1 && (
        <IntroScreen
          digits={digits}
          onDigitsChange={setDigits}
          onCheckEligibility={handleCheckEligibility}
          loading={false}
          error={phoneError}
        />
      )}

      {step === 2 && <CheckingScreen />}
      {step === 3 && <QualifyScreen />}

      {step === 4 && (
        <div className="space-y-5">
          <CreditScoreCard digits={digits} />
          <CreditTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {getFilteredOptions().length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-8">
              No options available for this category.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {getFilteredOptions().map((option, i) => (
                <OptionCard key={option.id ?? i} option={option} onSelect={handleSelectOption} />
              ))}
            </div>
          )}
        </div>
      )}

      {step === 5 && (
        <>
          {apiError && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2 text-xs text-red-700">
              <FaExclamationTriangle className="shrink-0 mt-0.5" /> {apiError}
            </div>
          )}
          <ConfirmScreen
            selectedOption={selectedOption}
            phoneNumber={fullPhone}    
            onConfirm={handleConfirmBorrow}
            onBack={handleBack}
          />
        </>
      )}

      {step === 6 && <CheckingScreen message="Processing your credit request..." />}
      {step === 7 && <SuccessScreen selectedOption={selectedOption} onDone={() => navigate("/")} />}
      {step === 8 && <NotEligibleScreen onBack={() => setStep(1)} />}
    </div>
  );
}