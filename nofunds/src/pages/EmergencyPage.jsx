import { useNavigate } from "react-router-dom";

const emergencyContacts = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    bg: "#e53935",
    title: "Lesotho Emergency Services",
    sub: "General emergency line",
    number: "112",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    bg: "#e53935",
    title: "Ambulance Services",
    sub: "Medical emergencies",
    number: "121",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.5 2 6 5 6 8c0 5 6 14 6 14s6-9 6-14c0-3-2.5-6-6-6z"/><circle cx="12" cy="8" r="2"/>
      </svg>
    ),
    bg: "#f97316",
    title: "Fire Brigade",
    sub: "Fire emergencies",
    number: "122",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    bg: "#1d4ed8",
    title: "Police",
    sub: "Lesotho Mounted Police",
    number: "123 / 124",
  },
];

export default function Emergency() {
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

        {/* Alert Banner */}
        <div style={{
          background: "#fff5f5",
          border: "1.5px solid #fecaca",
          borderRadius: "14px",
          padding: "16px 16px",
          marginBottom: "24px",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div>
            <div style={{ fontWeight: "700", fontSize: "14px", color: "#e53935", marginBottom: "4px" }}>Emergency Services</div>
            <div style={{ fontSize: "13px", color: "#e53935", lineHeight: 1.55 }}>
              If you are in immediate danger, call emergency services directly. These calls are free from any Econet line, even without airtime.
            </div>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>
          Emergency Contacts
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {emergencyContacts.map((c, i) => (
            <a key={i} href={`tel:${c.number.replace(/\s\/\s.*/, "")}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff",
                borderRadius: "14px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}>
                <div style={{
                  width: "44px", height: "44px", flexShrink: 0,
                  background: c.bg,
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: "700", fontSize: "14.5px", color: "#1e293b" }}>{c.title}</div>
                  <div style={{ fontSize: "12.5px", color: "#94a3b8", marginTop: "2px" }}>{c.sub}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "#1a237e" }}>{c.number}</div>
                  <div style={{ fontSize: "12px", color: "#3730a3", fontWeight: "600" }}>Call Now</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Econet Support Section */}
        <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>
          Econet Support
        </div>

        <div style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "14px 16px 14px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          marginBottom: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
            <div style={{
              width: "44px", height: "44px", flexShrink: 0,
              background: "#eef0fb",
              borderRadius: "12px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "14.5px", color: "#1e293b" }}>ETL Customer Support</div>
              <div style={{ fontSize: "12.5px", color: "#94a3b8", marginTop: "2px" }}>Available 24/7</div>
            </div>
            <div style={{ fontWeight: "800", fontSize: "17px", color: "#1a237e", flexShrink: 0 }}>0003</div>
          </div>
          <button
            onClick={() => navigate("/help")}
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
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#dde1f8"}
            onMouseOut={(e) => e.currentTarget.style.background = "#eef0fb"}
          >
            Chat with Support <span style={{ fontSize: "15px" }}>→</span>
          </button>
        </div>

        {/* Emergency Credit Card */}
        <div style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: "44px", height: "44px", flexShrink: 0,
            background: "#eef0fb",
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: "700", fontSize: "14.5px", color: "#1e293b" }}>Need Emergency Credit?</div>
            <div style={{ fontSize: "12.5px", color: "#94a3b8", marginTop: "2px" }}>Borrow airtime or data instantly</div>
          </div>
          <button
            onClick={() => navigate("/credit")}
            style={{
              padding: "9px 20px",
              background: "linear-gradient(135deg, #1a237e, #1976d2)",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            Borrow
          </button>
        </div>

      </div>
    </div>
  );
}