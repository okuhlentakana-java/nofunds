import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/universal/PaymentModal";
import { useBundlesByCategory } from "../hooks/useBundles";

// ── Icons ────────────────────────────────────────────────────────────────────
const BoltIcon = ({ size = 16, color = "#3730a3" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

// ── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ children, noMargin }) {
  return (
    <div className={`text-[11px] font-bold tracking-wider text-gray-400 uppercase ${noMargin ? "mb-0" : "mb-2"}`}>
      {children}
    </div>
  );
}

function CardSkeleton({ count, className }) {
  return Array.from({ length: count }).map((_, i) => (
    <div key={i} className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  ));
}

function parsePrice(priceStr = "") {
  return parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function HotOffers() {
  const navigate = useNavigate();
  const [paymentBundle, setPaymentBundle] = useState(null);

  const { bundles: dataBundles,   loading: loadingData   } = useBundlesByCategory("data");
  const { bundles: nightBundles,  loading: loadingNight  } = useBundlesByCategory("night");
  const { bundles: socialBundles, loading: loadingSocial } = useBundlesByCategory("social");

  // Best Value section — "Best Value" labelled first, fill to 4
  const bestValue = [
    ...dataBundles.filter(b => b.label === "Best Value"),
    ...dataBundles.filter(b => b.label !== "Best Value"),
  ].slice(0, 4);

  // Night section — cheapest first, max 3
  const nightDeals = [...nightBundles]
    .sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    .slice(0, 3);

  // Social section — one per duration to show progression
  const socialDeals = [
    socialBundles.find(b => b.subCategory === "daily"),
    socialBundles.find(b => b.subCategory === "weekly"),
    socialBundles.find(b => b.subCategory === "monthly"),
  ].filter(Boolean);

  const quickBuy = (bundle) => {
    setPaymentBundle({
      name:        bundle.name,
      description: bundle.description,
      price:       bundle.price,
      validity:    bundle.validity,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Hero Banner ─────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-700 p-5 mb-6 text-white">
          <div className="absolute -top-5 right-5 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <polygon points="50 5 95 95 5 95" fill="white" />
            </svg>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <GiftIcon />
            <span className="text-[11px] font-bold tracking-wider text-yellow-300 uppercase">
              Featured Promotion
            </span>
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Hoa Khonahala</h2>
          <p className="text-sm text-white/80 mb-4">
            Recharge M5 or more for a chance to win a brand new car, shopping vouchers, and airtime prizes.
          </p>
          <button
            onClick={() => navigate("/recharge")}
            className="bg-white text-indigo-800 px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition"
          >
            Recharge Now →
          </button>
        </div>

        {/* ── Best Value Deals ─────────────────────────────────────────────── */}
        <SectionLabel>Best Value Deals</SectionLabel>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {loadingData ? (
            <CardSkeleton count={4} className="h-24" />
          ) : bestValue.length === 0 ? (
            <p className="col-span-2 text-center text-xs text-gray-400 py-4">No data bundles available</p>
          ) : (
            bestValue.map(b => (
              <div
                key={b.id}
                onClick={() => quickBuy(b)}
                className="relative bg-white rounded-xl p-3 cursor-pointer shadow-sm hover:shadow-md transition"
              >
                {b.label === "Best Value" && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <BoltIcon size={12} color="#94a3b8" />
                  <span>{b.validity}</span>
                </div>
                <div className="font-black text-2xl text-gray-800">{b.name}</div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{b.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-blue-900">{b.price}</span>
                  <button
                    onClick={e => { e.stopPropagation(); quickBuy(b); }}
                    className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full font-bold hover:bg-indigo-700 transition"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Night Deals ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-2">
          <SectionLabel noMargin>Night Deals (11pm–5am)</SectionLabel>
          <button
            onClick={() => navigate("/bundles")}
            className="text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition"
          >
            See All →
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {loadingNight ? (
            <CardSkeleton count={3} className="h-24" />
          ) : nightDeals.length === 0 ? (
            <p className="col-span-3 text-center text-xs text-gray-400 py-4">No night bundles available</p>
          ) : (
            nightDeals.map(b => (
              <div
                key={b.id}
                onClick={() => quickBuy(b)}
                className="bg-gray-800 rounded-xl p-3 cursor-pointer hover:bg-gray-700 transition"
              >
                <StarIcon />
                <div className="font-black text-xl text-white mt-1">{b.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{b.validity}</div>
                <div className="font-bold text-yellow-500 text-sm mt-2">{b.price}</div>
                <button
                  onClick={e => { e.stopPropagation(); quickBuy(b); }}
                  className="mt-2 w-full bg-yellow-500 text-gray-900 text-[10px] font-bold py-1 rounded-full hover:bg-yellow-400 transition"
                >
                  Buy
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Social Media Deals ───────────────────────────────────────────── */}
        <SectionLabel>Social Media Deals</SectionLabel>
        <div className="space-y-3">
          {loadingSocial ? (
            <CardSkeleton count={3} className="h-16" />
          ) : socialDeals.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-4">No social bundles available</p>
          ) : (
            socialDeals.map(b => (
              <div
                key={b.id}
                onClick={() => quickBuy(b)}
                className="bg-white rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <BoltIcon size={18} color="#16a34a" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-800">{b.name}</div>
                  <div className="text-xs text-gray-500 truncate">{b.description}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{b.validity}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-blue-900">{b.price}</div>
                  <button
                    onClick={e => { e.stopPropagation(); quickBuy(b); }}
                    className="bg-green-600 text-white text-[11px] px-3 py-1 rounded-full font-bold mt-1 hover:bg-green-700 transition"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* ── Payment Modal ────────────────────────────────────────────────────── */}
      <PaymentModal
        isOpen={!!paymentBundle}
        onClose={() => setPaymentBundle(null)}
        item={paymentBundle}
        type="bundle"
        bundleCode={paymentBundle.code}
        onSuccess={() => setPaymentBundle(null)}
      />
    </div>
  );
}