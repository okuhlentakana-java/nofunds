import { useNavigate } from "react-router-dom";

const tips = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="#3730a3" stroke="none" />
      </svg>
    ),
    title: "Connect to Wi-Fi When Available",
    body: "Save your mobile data by connecting to trusted Wi-Fi networks at home, work, or public hotspots. Download large files and updates over Wi-Fi only.",
    cta: "View Data Bundles",
    to: "/bundles",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Disable Background App Refresh",
    body: "Many apps consume data in the background. Go to your phone settings and disable background data for apps you do not use frequently.",
    cta: "Buy Data Now",
    to: "/bundles",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8" />
      </svg>
    ),
    title: "Use Data Saver Mode",
    body: "Most browsers and apps have a data saver or lite mode. Enable this to reduce data consumption by up to 60% while browsing.",
    cta: "Explore Bundles",
    to: "/bundles",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Choose the Right Bundle",
    body: "Match your bundle to your usage. Social media users benefit from our Social Bundles with Sasai bonus data. Night owls can save with Night Bundles from M2.",
    cta: "View All Bundles",
    to: "/bundles",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="6" /><path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
        <line x1="12" y1="18" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      </svg>
    ),
    title: "Use Sasai for Free Messaging",
    body: "Sasai offers free messaging between users. Download the app and stay connected with friends and family without using your main data allocation.",
    cta: "Access Sasai",
    to: "/services",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: "Track Your Usage",
    body: "Monitor your data usage regularly through the My Econet Lesotho app. Set usage alerts to avoid running out of data unexpectedly.",
    cta: "Recharge Now",
    to: "/recharge",
  },
];

export default function UsageTips() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "100%",
      minHeight: "100%",
      background: "#f1f4f9",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px 16px 32px",
        boxSizing: "border-box",
      }}>
        {/* Subtitle */}
        <p style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "14px",
          marginBottom: "20px",
          lineHeight: 1.5,
        }}>
          Get the most out of your Econet data with these practical tips.
        </p>

        {/* Tip Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {tips.map((tip, i) => (
            <div key={i} style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "18px 16px 14px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              {/* Icon + Title row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "10px" }}>
                <div style={{
                  width: "44px", height: "44px", flexShrink: 0,
                  background: "#eef0fb",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {tip.icon}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px", color: "#1e293b", marginBottom: "4px" }}>
                    {tip.title}
                  </div>
                  <div style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.55 }}>
                    {tip.body}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => navigate(tip.to)}
                style={{
                  width: "100%",
                  padding: "11px",
                  background: "#eef0fb",
                  color: "#3730a3",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#dde1f8"}
                onMouseOut={(e) => e.currentTarget.style.background = "#eef0fb"}
              >
                {tip.cta}
                <span style={{ fontSize: "15px" }}>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}