export default function ActionButtons({ step, isValid, onContinue, onBack, onDone }) {
  if (step === 3) {
    return (
      <button
        onClick={onDone}
        className="w-full mt-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Done
      </button>
    );
  }

  return (
    <div className="mt-8 space-y-3">
      <button
        onClick={onContinue}
        disabled={!isValid}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          isValid
            ? "bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:from-blue-700 hover:to-blue-600"
            : "bg-gradient-to-r from-indigo-900 to-indigo-200 text-white cursor-not-allowed"
        }`}
      >
        {step === 2 ? "Confirm Recharge" : "Continue"}
      </button>
      
      {step === 2 && (
        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition"
        >
          Back
        </button>
      )}
    </div>
  );
}