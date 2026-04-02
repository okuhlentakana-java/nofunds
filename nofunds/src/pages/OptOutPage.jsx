import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCheck, MdWarningAmber, MdInfo } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { LuShieldOff } from "react-icons/lu";

const benefits = [
  "Purchase data bundles without needing existing data",
  "Recharge your airtime instantly",
  "Borrow emergency airtime, data, or minutes",
  "Access value-added services like EcoCash and Sasai",
  "View exclusive promotions and offers",
];

const losses = [
  "Free access to bundle purchases when out of data",
  "Emergency airtime credit services",
  "Free recharge access when data is depleted",
  "Exclusive promotional offers and deals",
  "Zero-rated browsing on this portal",
];

// Step 1 — Info screen
function IntroScreen({ onOptOut, onExplore }) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <LuShieldOff className="w-8 h-8 text-blue-700" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">No Funds Portal Redirects</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          When your data balance reaches zero, Econet Telecom Lesotho automatically redirects
          you to this free, zero-rated portal. Here you can:
        </p>
        <div className="text-left space-y-3 mb-2">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <MdCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explore button */}
      <button
        onClick={onExplore}
        className="relative overflow-hidden w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-900/30 ring-1 ring-white/10 after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none hover:opacity-90 transition"
      >
        <LuShieldOff className="w-4 h-4" />
        Explore the Portal
      </button>

      {/* Opt out button */}
      <button
        onClick={onOptOut}
        className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition"
      >
        I want to Opt Out <FaArrowRight className="w-3 h-3" />
      </button>

      <p className="text-xs text-gray-400 text-center">
        You can always opt back in by contacting Econet customer support at 0003.
      </p>
    </div>
  );
}

// Step 2 — Confirm screen
function ConfirmScreen({ onConfirm, onCancel }) {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <MdWarningAmber className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-bold text-yellow-800">Are you sure you want to opt out?</p>
        </div>
        <p className="text-sm text-yellow-700 leading-relaxed mb-4">
          By opting out, you will no longer be redirected to this free portal when your data
          runs out. You will lose access to:
        </p>
        <div className="space-y-2">
          {losses.map((l, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5" />
              <span className="text-sm text-yellow-700">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm opt out — red */}
      <button
        onClick={onConfirm}
        className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-red-700 transition"
      >
        Confirm Opt Out
      </button>

      {/* Cancel — dark blue */}
      <button
        onClick={onCancel}
        className="relative overflow-hidden w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-md shadow-blue-900/30 ring-1 ring-white/10 after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none hover:opacity-90 transition"
      >
        Cancel — Keep Me Connected
      </button>

      <button className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition py-1">
        <MdInfo className="w-4 h-4" /> Learn more about this portal
      </button>
    </div>
  );
}

// Step 3 — Success screen
function SuccessScreen({ onHome }) {
  return (
    <div className="text-center py-16 space-y-5">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <MdCheck className="w-10 h-10 text-green-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Opt-Out Confirmed</h2>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed max-w-xs mx-auto">
          You have been opted out of No Funds Page redirects. This change may take up to 24
          hours to take effect.
        </p>
      </div>
      <button
        onClick={onHome}
        className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition"
      >
        Return Home
      </button>
    </div>
  );
}

export default function OptOutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">
      {step === 1 && (
        <IntroScreen
          onOptOut={() => setStep(2)}
          onExplore={() => navigate("/")}
        />
      )}
      {step === 2 && (
        <ConfirmScreen
          onConfirm={() => setStep(3)}
          onCancel={() => setStep(1)}
        />
      )}
      {step === 3 && <SuccessScreen onHome={() => navigate("/")} />}
    </div>
  );
}