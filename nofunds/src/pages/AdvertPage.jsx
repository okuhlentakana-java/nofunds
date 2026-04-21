import { useState } from "react";
import { BACKEND_URL } from "../api";

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3730a3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);

export default function AdvertPage() {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    campaign: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.companyName.trim()) e.companyName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

const handleSubmit = async () => {
  const e = validate();
  if (Object.keys(e).length) {
    setErrors(e);
    return;
  }
  setLoading(true);
  try {
    const res = await fetch(`${BACKEND_URL}/api/adverts/enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        fullName:    form.fullName,
        companyName: form.companyName,
        email:       form.email,
        phone:       form.phone,
        campaign:    form.campaign,
      }),
    });
    if (!res.ok) throw new Error("Server error");
    setSubmitted(true);
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    setErrors({ submit: "Failed to submit. Please try again." });
  } finally {
    setLoading(false);
  }
};

  const handleDone = () => {
    setSubmitted(false);
    setForm({ fullName: "", companyName: "", email: "", phone: "", campaign: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        {!submitted ? (
          <>
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700 p-6 mb-6 text-white">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5" />
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                <MegaphoneIcon />
              </div>
              <h2 className="text-2xl font-extrabold mb-2">Reach Thousands of Users</h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Place your brand on the ETL No Funds Portal. Reach active mobile users at the moment they need connectivity most.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                <PhoneIcon />
                <div className="text-xs text-gray-400 mt-2">Call Us</div>
                <div className="font-bold text-indigo-700 text-lg">0003</div>
              </div>
              <div className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
                <MailIcon />
                <div className="text-xs text-gray-400 mt-2">Email Us</div>
                <div className="font-semibold text-indigo-700 text-xs break-all">adzone@nofundsetl.ls.co</div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-5">Submit an Enquiry</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    placeholder="Your full name"
                    className={`w-full px-4 py-2.5 rounded-xl border ${
                      errors.fullName ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={handleChange("companyName")}
                    placeholder="Your company"
                    className={`w-full px-4 py-2.5 rounded-xl border ${
                      errors.companyName ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+266 ..."
                    className={`w-full px-4 py-2.5 rounded-xl border ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Campaign Interest
                  </label>
                  <textarea
                    value={form.campaign}
                    onChange={handleChange("campaign")}
                    placeholder="Tell us about your advertising goals..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-y"
                  />
                </div>
                {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition ${
                    loading
                      ? "bg-gradient-to-r from-indigo-300 to-blue-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-800 to-blue-600 hover:opacity-90"
                  }`}
                >
                  {loading ? (
                    "Submitting…"
                  ) : (
                    <>
                      <SendIcon /> Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckIcon />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Enquiry Submitted</h2>
            <p className="text-gray-500 max-w-xs mb-6">
              Our team will contact you within 24 hours to discuss your advertising needs.
            </p>
            
            <button
              onClick={handleDone}
              className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}