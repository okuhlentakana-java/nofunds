import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSpinner, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { LuHandCoins } from "react-icons/lu";
import CreditTabs from "../components/credit/CreditTabs";
import OptionCard from "../components/credit/OptionCard";
import ConfirmScreen from "../components/credit/ConfirmScreen";
import SuccessScreen from "../components/credit/SuccessScreen";
import { ENDPOINTS } from "../api";

const CURRENCY = "LSL";

// ── Step 1: Phone input + intro ───────────────────────────────────────────────
function IntroScreen({ phone, onPhoneChange, onCheckEligibility, loading, error }) {
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
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+266 5000 0000"
            className={`w-full px-4 py-3 rounded-xl border ${
              error ? "border-red-400" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm`}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <FaExclamationTriangle className="shrink-0" /> {error}
            </p>
          )}
        </div>

        <button
          onClick={onCheckEligibility}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition text-white ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-900 to-blue-500 hover:opacity-90"
          }`}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <><FaArrowRight /> Check My Eligibility</>}
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
function CreditScoreCard({ phone }) {
  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Available Credit</p>
      <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full truncate max-w-[160px]">
        {phone}
      </span>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AirtimeCreditPage() {
  const navigate = useNavigate();

  const [step, setStep]                   = useState(1);   // 1=intro 2=checking 3=qualify 4=options 5=confirm 6=submitting 7=success 8=notEligible
  const [phone, setPhone]                 = useState("");
  const [phoneError, setPhoneError]       = useState("");
  const [apiError, setApiError]           = useState("");
  const [creditOptions, setCreditOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeTab, setActiveTab]         = useState("all");

  // ── 1. Check eligibility then fetch options ────────────────────────────────
  const handleCheckEligibility = async () => {
    const cleaned = phone.trim();
    if (!cleaned) {
      setPhoneError("Please enter your phone number.");
      return;
    }
    setPhoneError("");
    setApiError("");
    setStep(2);

    try {
      // Step A — eligibility
      const eligRes = await fetch(ENDPOINTS.creditEligibility, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: cleaned, currency: CURRENCY }),
      });
      const eligData = await eligRes.json();

      // Treat any non-success status or explicit ineligible as not eligible
      const eligible =
        eligRes.ok &&
        eligData?.status !== "error" &&
        eligData?.data?.eligible !== false;

      if (!eligible) {
        setStep(8);
        return;
      }

      // Step B — fetch available options
      const optRes = await fetch(ENDPOINTS.creditOptions, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: cleaned, currency: CURRENCY }),
      });
      const optData = await optRes.json();
      const options = Array.isArray(optData?.data) ? optData.data : [];

      setCreditOptions(options);

      // Flash the qualify screen then move to options
      setStep(3);
      setTimeout(() => setStep(4), 1500);

    } catch (err) {
      setApiError("Could not reach the server. Please try again.");
      setStep(1);
    }
  };

  // ── 2. Submit the credit request ───────────────────────────────────────────
  const handleConfirmBorrow = async () => {
    if (!selectedOption) return;
    setStep(6);

    try {
      const res = await fetch(ENDPOINTS.airtimeCredit, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phone.trim(),
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
      setStep(5);   // send back to confirm so user sees the error
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setStep(5);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setApiError("");
    setStep(4);
  };

  // ── Tab filtering — falls back to full list if API returns flat array ───────
  const getFilteredOptions = () => {
    if (!creditOptions.length) return [];
    if (activeTab === "all") return creditOptions;
    return creditOptions.filter(
      (o) => (o.type ?? o.category ?? "").toLowerCase() === activeTab
    );
  };

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">

      {/* Global API error banner (shown on step 1 after a failed attempt) */}
      {apiError && step === 1 && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2 text-xs text-red-700">
          <FaExclamationTriangle className="shrink-0 mt-0.5" /> {apiError}
        </div>
      )}

      {step === 1 && (
        <IntroScreen
          phone={phone}
          onPhoneChange={setPhone}
          onCheckEligibility={handleCheckEligibility}
          error={phoneError}
        />
      )}

      {step === 2 && <CheckingScreen />}

      {step === 3 && <QualifyScreen />}

      {step === 4 && (
        <div className="space-y-5">
          <CreditScoreCard phone={phone} />
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
            onConfirm={handleConfirmBorrow}
            onBack={handleBack}
          />
        </>
      )}

      {step === 6 && <CheckingScreen message="Processing your credit request..." />}

      {step === 7 && (
        <SuccessScreen selectedOption={selectedOption} onDone={() => navigate("/")} />
      )}

      {step === 8 && <NotEligibleScreen onBack={() => setStep(1)} />}
    </div>
  );
}