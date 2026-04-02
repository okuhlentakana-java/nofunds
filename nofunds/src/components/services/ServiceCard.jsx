import { useState } from "react";

// SVG icons per service type (same as before)
const TypeIcon = ({ type }) => {
  const cls = "w-5 h-5";
  if (type === "digital") return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
  if (type === "finance") return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
  if (type === "lifestyle") return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
};

const iconBg = {
  digital: "bg-blue-50 text-blue-600",
  finance: "bg-green-50 text-green-600",
  lifestyle: "bg-red-50 text-red-500",
  content: "bg-purple-50 text-purple-600",
};

export default function ServiceCard({ service, isActive, onActivate }) {
  const [expanded, setExpanded] = useState(false);

  const isSubscribe = service.action === "subscribe" || service.action === "insurance";
  const originalBtnLabel = isSubscribe ? "Subscribe" : "Access";

  const btnLabel = isActive ? "Active" : originalBtnLabel;
  const btnColor = isActive
    ? "bg-green-600 hover:bg-green-700 text-white"
    : isSubscribe
    ? "bg-blue-900 hover:bg-blue-700 text-white"
    : "bg-green-600 hover:bg-green-600 text-white";

  const actionBtnLabel = service.action === "access" ? `Access ${service.name}` : originalBtnLabel;

  const handleActivate = () => {
    if (!isActive) onActivate();
  };

  return (
    <div className={`rounded-2xl overflow-hidden shadow-sm transition-all duration-200 ${expanded ? "border-2 border-gray-800" : "border border-gray-100"} bg-white`}>
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-4"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg[service.type] || "bg-gray-100 text-gray-500"}`}>
          <TypeIcon type={service.type} />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="font-bold text-gray-900 text-sm leading-tight">{service.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{service.description}</p>
        </div>
        <span className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold ${btnColor}`}>
          {btnLabel}
        </span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 pt-1">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {service.fullDescription}
          </p>

          {service.features && (
            <div className="space-y-2 mb-5">
              {service.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          )}

          {isActive ? (
            <div className="w-full py-3 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-sm font-semibold text-green-600">Activated Successfully</span>
            </div>
          ) : service.plans ? (
            <div className="flex gap-2">
              {service.plans.map((plan) => (
                <button
                  key={plan}
                  onClick={handleActivate}
                  className="flex-1 bg-gradient-to-r from-blue-900 to-blue-500 text-white py-3 rounded-xl text-sm font-bold hover:opacity-90 transition"
                >
                  {plan}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={handleActivate}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white py-3 rounded-xl text-sm font-bold hover:opacity-90 transition"
            >
              {actionBtnLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}