const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using the Econet Telecom Lesotho No Funds Portal, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of this service immediately.",
  },
  {
    title: "2. Service Description",
    content:
      "This portal is a zero-rated service provided by Econet Telecom Lesotho (ETL) that allows users who have exhausted their data balance to access essential services including airtime recharge, data bundle purchases, airtime credit services, and value-added services.",
  },
  {
    title: "3. Eligibility",
    content:
      "This service is available to all active Econet Telecom Lesotho prepaid and postpaid subscribers. Certain features such as the Airtime Credit Service may require additional eligibility criteria based on account history and standing.",
  },
  {
    title: "4. Payments & Transactions",
    content:
      "All transactions are processed securely through approved payment partners. Accepted methods include EcoCash, M-Pesa, VISA, and Mastercard. Prices are displayed in Lesotho Loti (M) and are inclusive of applicable taxes. Transactions are final once confirmed unless otherwise stated.",
  },
  {
    title: "5. Airtime Credit Service",
    content:
      "The borrowing service is subject to eligibility assessment. Borrowed amounts plus applicable service fees are automatically deducted from your next recharge. Failure to repay will restrict access to further credit services. ETL reserves the right to modify credit limits and fees.",
  },
  {
    title: "6. Advertising",
    content:
      "This portal displays advertising content from ETL and third-party advertisers. ETL is not responsible for the content, accuracy, or reliability of third-party advertisements. Interaction with advertisements is at your own discretion.",
  },
  {
    title: "7. Privacy",
    content:
      "Your use of this service is also governed by our Privacy Policy. We collect minimal data necessary to provide the service, including your mobile number and transaction history.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content, branding, design elements, and software on this portal are the property of Econet Telecom Lesotho or its licensors and are protected by applicable intellectual property laws.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      'ETL shall not be liable for any indirect, incidental, or consequential damages arising from the use of this portal. Service availability is provided on an "as-is" basis and may be subject to interruptions for maintenance or technical reasons.',
  },
  {
    title: "10. Modifications",
    content:
      "ETL reserves the right to modify these terms at any time. Continued use of the portal after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "11. Contact",
    content:
      "For questions regarding these terms, contact Econet Telecom Lesotho customer support at 0003 or email legal@etl.co.ls.",
  },
];

export default function TermsAndConditionsPage() {
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
