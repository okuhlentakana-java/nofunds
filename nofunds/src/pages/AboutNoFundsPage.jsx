import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: "Recharge Airtime",
    sub: "Top up your balance via EcoCash, M-Pesa, VISA, or Mastercard",
    to: "/recharge",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#3730a3" stroke="none"/>
      </svg>
    ),
    title: "Buy Data Bundles",
    sub: "Choose from daily, weekly, monthly, social, and night bundles",
    to: "/bundles",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
        <line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/>
      </svg>
    ),
    title: "Borrow Credit",
    sub: "Get emergency airtime, data, voice, or SMS on credit",
    to: "/credit",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Access Services",
    sub: "Use Sasai, EcoCash, EcoSure, and other digital services",
    to: "/services",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Stay Protected",
    sub: "Subscribe to EcoSure insurance and other protective services",
    to: "/services",
  },
];

export default function AboutNoFunds() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "100%",
      background: "#f1f4f9",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      boxSizing: "border-box",
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "16px 16px 32px",
        boxSizing: "border-box",
      }}>

        {/* Hero Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1a237e 0%, #283593 40%, #1976d2 100%)",
          borderRadius: "18px",
          padding: "32px 20px 28px",
          marginBottom: "16px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "140px", height: "140px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "50%",
          }} />
          <div style={{
            width: "52px", height: "52px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/>
            </svg>
          </div>
          <div style={{ fontWeight: "800", fontSize: "22px", color: "#fff", marginBottom: "8px" }}>
            No Funds Portal
          </div>
          <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, maxWidth: "280px", margin: "0 auto" }}>
            Your free gateway to stay connected when your data runs out
          </div>
        </div>

        {/* What is it */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px 18px",
          marginBottom: "20px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontWeight: "700", fontSize: "16px", color: "#1e293b", marginBottom: "12px" }}>
            What is the No Funds Portal?
          </div>
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.65, margin: "0 0 12px" }}>
            The No Funds Portal is a free, zero-rated service from Econet Telecom Lesotho. When your mobile data balance reaches zero, you are automatically redirected to this portal where you can access essential services without any data charges.
          </p>
          <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.65, margin: 0 }}>
            This means you are never truly disconnected. Even with zero balance, you can purchase new bundles, recharge your airtime, borrow emergency credit, or access key digital services — all for free.
          </p>
        </div>

        {/* What You Can Do */}
        <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>
          What You Can Do
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {actions.map((a, i) => (
            <div
              key={i}
              onClick={() => navigate(a.to)}
              style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <div style={{
                width: "42px", height: "42px", flexShrink: 0,
                background: "#eef0fb",
                borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {a.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>{a.title}</div>
                <div style={{ fontSize: "12.5px", color: "#94a3b8", marginTop: "2px" }}>{a.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "15px",
            background: "linear-gradient(135deg, #1a237e 0%, #1976d2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          Get Started
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", margin: 0 }}>
          Powered by Econet Telecom Lesotho. This portal is completely free to use.
        </p>

      </div>
    </div>
  );
}