const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect your mobile phone number (automatically detected from your network session), transaction history for purchases made through this portal, device type and browser information for service optimisation, and interaction data with advertisements for reporting purposes.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information is used to process transactions and deliver purchased services, assess eligibility for the Airtime Credit Service, personalise bundle recommendations, generate anonymised advertising performance reports, and improve our services and user experience.",
  },
  {
    title: "3. Information Sharing",
    content:
      "We do not sell your personal information. We may share anonymised, aggregated data with advertising partners for campaign performance reporting. Transaction data is shared with payment processors (EcoCash, M-Pesa, VISA, Mastercard) solely for payment processing.",
  },
  {
    title: "4. Data Security",
    content:
      "We implement industry-standard security measures to protect your information. All payment transactions are encrypted using TLS/SSL protocols. We do not store card details on our servers.",
  },
  {
    title: "5. Data Retention",
    content:
      "Transaction records are retained for the period required by applicable Lesotho financial regulations. Session data is retained for a maximum of 30 days for service improvement purposes. You may request deletion of your data by contacting customer support.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access your personal data held by ETL, request correction of inaccurate data, request deletion of your data (subject to legal retention requirements), opt out of No Funds Page redirects, and withdraw consent for non-essential data processing.",
  },
  {
    title: "7. Cookies & Tracking",
    content:
      "This portal uses minimal session-based cookies necessary for service operation. We do not use third-party tracking cookies. Advertising impression data is collected for campaign reporting.",
  },
  {
    title: "8. Contact",
    content:
      "For privacy-related enquiries, contact our Data Protection Officer at privacy@etl.co.ls or call 0003.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <p className="text-xs text-gray-400 mb-6">Last updated: March 2026</p>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-bold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
