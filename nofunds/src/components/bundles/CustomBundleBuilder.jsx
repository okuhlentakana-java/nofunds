import { useState } from "react";
import PaymentModal from "../universal/PaymentModal";

// Data options in MB - increments of 50MB
const dataOptions = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000];
// Voice options in minutes - increments of 10
const voiceOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 400, 500];
// SMS options - increments of 5
const smsOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 150, 200, 300, 400, 500];

// Pricing functions
const calculateDataPrice = (mb) => {
  if (mb === 0) return 0;
  return (mb / 50) * 4; // 50MB = M4
};

const calculateVoicePrice = (mins) => {
  if (mins === 0) return 0;
  return (mins / 10) * 4; // 10 mins = M4
};

const calculateSMSPrice = (sms) => {
  if (sms === 0) return 0;
  return (sms / 5) * 1; // 5 SMS = M1
};

const formatData = (v) => {
  if (v === 0) return "0";
  if (v >= 1000) return `${v / 1000}GB`;
  return `${v}MB`;
};

const formatVoice = (v) => v === 0 ? "0" : `${v}m`;
const formatSMS = (v) => String(v);

export default function CustomBundleBuilder() {
  const [data, setData] = useState(0);
  const [voice, setVoice] = useState(0);
  const [sms, setSms] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const dataPrice = calculateDataPrice(data);
  const voicePrice = calculateVoicePrice(voice);
  const smsPrice = calculateSMSPrice(sms);
  const total = dataPrice + voicePrice + smsPrice;
  const hasSelection = data > 0 || voice > 0 || sms > 0;

  const dataLabel = data === 0 ? "0 MB" : data >= 1000 ? `${data / 1000} GB` : `${data} MB`;
  const voiceLabel = voice === 0 ? "0 min" : `${voice} min`;
  const smsLabel = sms === 0 ? "0 SMS" : `${sms} SMS`;

  const customItem = {
    name: "Custom Bundle",
    description: `${dataLabel} Data + ${voiceLabel} Voice + ${smsLabel} SMS`,
    price: `M${total}.00`,
    validity: "Custom validity",
  };

  // Find the index for the current value
  const getDataIndex = () => dataOptions.indexOf(data);
  const getVoiceIndex = () => voiceOptions.indexOf(voice);
  const getSmsIndex = () => smsOptions.indexOf(sms);

  return (
    <>
      {/* Main card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base">Custom Mix</p>
            <p className="text-xs text-gray-400">Build your own bundle</p>
          </div>
        </div>

        {/* Data Slider */}
        <SliderRow
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          }
          label="Data"
          value={data}
          displayValue={dataLabel}
          options={dataOptions}
          formatTick={formatData}
          currentIndex={getDataIndex()}
          totalOptions={dataOptions.length}
          onChange={(index) => setData(dataOptions[index])}
          price={dataPrice}
        />

        {/* Voice Slider */}
        <SliderRow
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
          label="Voice"
          value={voice}
          displayValue={voiceLabel}
          options={voiceOptions}
          formatTick={formatVoice}
          currentIndex={getVoiceIndex()}
          totalOptions={voiceOptions.length}
          onChange={(index) => setVoice(voiceOptions[index])}
          price={voicePrice}
        />

        {/* SMS Slider */}
        <SliderRow
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
          label="SMS"
          value={sms}
          displayValue={smsLabel}
          options={smsOptions}
          formatTick={formatSMS}
          currentIndex={getSmsIndex()}
          totalOptions={smsOptions.length}
          onChange={(index) => setSms(smsOptions[index])}
          price={smsPrice}
          noBorder
        />
      </div>

      {/* Estimated Total card */}
      <div className="bg-white rounded-2xl px-5 py-4 shadow-sm mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">Estimated Total</p>
          <p className="text-xs text-gray-400">Based on your selections</p>
        </div>
        <p className="text-2xl font-black text-blue-700">M{total}.00</p>
      </div>

      {/* Proceed button */}
      <button
        onClick={() => hasSelection && setShowPaymentModal(true)}
        disabled={!hasSelection}
        className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition ${
          hasSelection
            ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white hover:opacity-90"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Proceed to Payment
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        item={customItem}
        type="bundle"
      />
    </>
  );
}

function SliderRow({ icon, label, value, displayValue, options, formatTick, currentIndex, totalOptions, onChange, price, noBorder }) {
  return (
    <div className={`pb-5 mb-5 ${!noBorder ? "border-b border-gray-100" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-600">
          {icon}
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-blue-700">{displayValue}</span>
          {price > 0 && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +M{price}
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={totalOptions - 1}
        step={1}
        value={currentIndex}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-blue-700"
        style={{ 
          background: `linear-gradient(to right, #1d4ed8 ${(currentIndex / (totalOptions - 1)) * 100}%, #e5e7eb ${(currentIndex / (totalOptions - 1)) * 100}%)` 
        }}
      />

      <div className="flex justify-between mt-2">
        {options.map((opt, i) => {
          // Show only key points to avoid clutter
          if (opt === 0 || opt === 50 || opt === 100 || opt === 200 || opt === 500 || opt === 1000 || opt === 2000) {
            return (
              <span key={i} className="text-xs text-gray-400">
                {formatTick(opt)}
              </span>
            );
          }
          // Show every 5th option for better spacing
          if (i % 5 === 0 && opt !== 0) {
            return (
              <span key={i} className="text-xs text-gray-300">
                {formatTick(opt)}
              </span>
            );
          }
          return null;
        })}
      </div>
      
      
    </div>
  );
}