import { useState } from "react";
import PaymentModal from "../components/universal/PaymentModal";
import { useNavigate } from "react-router-dom";

// Icons
const BoltIcon = ({ size = 16, color = "#3730a3" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const StarIcon = ({ color = "#f59e0b" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={color} stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const GiftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const bestValueDeals = [
  { id: 1, validity: "Until midnight", amount: "200", unit: "MB", price: "M8.00", badge: null },
  { id: 2, validity: "24 hours", amount: "1", unit: "GB", price: "M20.00", badge: "BEST VALUE", badgeColor: "#16a34a" },
  { id: 3, validity: "3 days", amount: "6", unit: "GB", price: "M120.00", badge: "HOT", badgeColor: "#e53935" },
  { id: 4, validity: "7 days", amount: "2", unit: "GB", price: "M50.00", badge: "RECOMMENDED", badgeColor: "#1a237e" },
];

const nightDeals = [
  { id: 5, amount: "50", unit: "MB", price: "M2.00", time: "11pm - 5am" },
  { id: 6, amount: "500", unit: "MB", price: "M3.00", time: "11pm - 5am" },
  { id: 7, amount: "1.5", unit: "GB", price: "M10.00", time: "11pm - 5am" },
];

const socialDeals = [
  { id: 8, name: "Daily Social", desc: "500MB + 500MB SASAI — Until midnight", price: "M6.00" },
  { id: 9, name: "Weekly Social", desc: "3.5GB + 3.5GB SASAI — 7 days", price: "M30.00" },
  { id: 10, name: "Monthly Social", desc: "15GB + 15GB SASAI — 30 days", price: "M100.00" },
];

// Helper component for section label
function SectionLabel({ children, noMargin }) {
  return (
    <div className={`text-[11px] font-bold tracking-wider text-gray-400 uppercase ${noMargin ? "mb-0" : "mb-2"}`}>
      {children}
    </div>
  );
}

export default function HotOffers() {
  const [paymentBundle, setPaymentBundle] = useState(null);
 const navigate = useNavigate();
    const handleRechargeClick = () => {
    navigate("/recharge");
  };
  const quickBuy = (e, bundle) => {
    e.stopPropagation();
    // Convert bundle to the format expected by PaymentModal
    const item = {
      name: bundle.amount ? `${bundle.amount}${bundle.unit}` : bundle.name,
      description: bundle.validity || bundle.time || bundle.desc,
      price: bundle.price,
      validity: bundle.validity || bundle.time || bundle.desc?.split("—")[1]?.trim(),
      features: bundle.features || [
        `${bundle.amount}${bundle.unit} data`,
        `Valid ${bundle.validity || bundle.time || "until used"}`,
        "All networks"
      ]
    };
    setPaymentBundle(item);

  
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-700 p-5 mb-6 text-white">
          <div className="absolute -top-5 right-5 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100"><polygon points="50 5 95 95 5 95" fill="white" /></svg>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <GiftIcon />
            <span className="text-[11px] font-bold tracking-wider text-yellow-300 uppercase">Featured Promotion</span>
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Hoa Khonahala</h2>
          <p className="text-sm text-white/80 mb-4">
            Recharge M5 or more for a chance to win a brand new car, shopping vouchers, and airtime prizes.
          </p>
           <button
            onClick={handleRechargeClick}
            className="bg-white text-indigo-800 px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition"
          >
            Recharge Now →
          </button>
        </div>

        {/* Best Value Deals */}
        <SectionLabel>Best Value Deals</SectionLabel>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {bestValueDeals.map(b => (
            <div
              key={b.id}
              onClick={() => quickBuy({ stopPropagation: () => {} }, b)}
              className="relative bg-white rounded-xl p-3 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              {b.badge && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {b.badge}
                </div>
              )}
              <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                <BoltIcon size={12} color="#94a3b8" />
                <span>{b.validity}</span>
              </div>
              <div className="font-black text-2xl text-gray-800">
                {b.amount}<span className="text-sm font-semibold text-gray-500"> {b.unit}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-blue-900">{b.price}</span>
                <button
                  onClick={e => quickBuy(e, b)}
                  className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full font-bold hover:bg-indigo-700"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Night Deals */}
        <div className="flex items-center justify-between mb-2">
          <SectionLabel noMargin>Night Deals (11pm–5am)</SectionLabel>
          <button className="text-indigo-600 text-sm font-semibold">See All →</button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {nightDeals.map(b => (
            <div
              key={b.id}
              onClick={() => quickBuy({ stopPropagation: () => {} }, b)}
              className="bg-gray-800 rounded-xl p-3 cursor-pointer hover:bg-gray-700 transition"
            >
              <StarIcon />
              <div className="font-black text-xl text-white mt-1">
                {b.amount}<span className="text-xs text-gray-400">{b.unit}</span>
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">{b.time}</div>
              <div className="font-bold text-yellow-500 text-sm mt-1">{b.price}</div>
            </div>
          ))}
        </div>

        {/* Social Media Deals */}
        <SectionLabel>Social Media Deals</SectionLabel>
        <div className="space-y-3">
          {socialDeals.map(b => (
            <div
              key={b.id}
              onClick={() => quickBuy({ stopPropagation: () => {} }, b)}
              className="bg-white rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <BoltIcon size={18} color="#16a34a" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800">{b.name}</div>
                <div className="text-xs text-gray-500 truncate">{b.desc}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-900">{b.price}</div>
                <button
                  onClick={e => quickBuy(e, b)}
                  className="bg-green-600 text-white text-[11px] px-3 py-1 rounded-full font-bold mt-1 hover:bg-green-700"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal
        isOpen={!!paymentBundle}
        onClose={() => setPaymentBundle(null)}
        item={paymentBundle}
        type="bundle"
      />
    </div>
  );
}