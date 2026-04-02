import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const faqGroups = [
  {
    category: "Data & Bundles",
    faqs: [
      { q: "How do I buy a data bundle?", a: "Go to the Bundles section on the home page, select your preferred bundle, and proceed to payment using EcoCash, M-Pesa, VISA, or Mastercard." },
      { q: "Can I buy a bundle for someone else?", a: "Yes. During the purchase flow, you can enter a different Econet number to gift a bundle to another subscriber." },
      { q: "What happens when my bundle expires?", a: "Unused data from an expired bundle is forfeited. You will need to purchase a new bundle to continue using data services." },
      { q: "How do I check my remaining data balance?", a: "Dial *134# or visit the My Account section in the ETL app to check your current data balance." },
    ],
  },
  {
    category: "Recharge & Payments",
    faqs: [
      { q: "What payment methods are accepted?", a: "We accept EcoCash, M-Pesa, VISA, and Mastercard for all purchases on this platform." },
      { q: "Is my payment information secure?", a: "Yes. All transactions are encrypted using TLS/SSL protocols. We do not store card details on our servers." },
      { q: "Can I get a refund for a purchase?", a: "Refunds are subject to ETL's refund policy. Contact customer support at 0003 within 24 hours of a failed or erroneous transaction." },
    ],
  },
  {
    category: "Airtime Credit (Borrow)",
    faqs: [
      { q: "How does the borrow service work?", a: "The Airtime Credit Service lets you borrow airtime, data, voice minutes, or SMS when your balance is zero. The borrowed amount plus a small service fee is automatically deducted from your next recharge." },
      { q: "How is my eligibility determined?", a: "Eligibility is based on your recharge history, account standing, and usage patterns. The longer and more consistently you've been a subscriber, the higher your credit score." },
      { q: "What if I cannot repay the borrowed amount?", a: "If you do not recharge, the borrowed amount remains outstanding. Continued non-repayment may restrict your access to future credit services." },
    ],
  },
  {
    category: "General",
    faqs: [
      { q: "Why am I seeing this page?", a: "You are seeing this page because your data balance has reached zero. This is a zero-rated portal that allows you to purchase data, recharge, or access services without using any data." },
      { q: "How do I opt out of this redirect?", a: "Go to More → Opt Out of Redirects in the menu, and follow the steps to stop being redirected to this portal when your data runs out." },
      { q: "How do I contact customer support?", a: "You can call us at 0003 (available 24/7) or email support@etl.co.ls. Response time for emails is within 24 hours." },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle, isLast }) {
  return (
    <div className={!isLast ? "border-b border-gray-100" : ""}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition hover:bg-gray-50 ${isOpen ? "border-l-2 border-blue-700" : ""}`}
      >
        <span className={`text-sm font-medium pr-4 ${isOpen ? "text-gray-900" : "text-gray-700"}`}>{q}</span>
        {isOpen
          ? <MdExpandLess className="w-5 h-5 text-gray-400 flex-shrink-0" />
          : <MdExpandMore className="w-5 h-5 text-gray-400 flex-shrink-0" />
        }
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQsPage() {
  const [openKey, setOpenKey] = useState(null);

  const toggle = (key) => setOpenKey(openKey === key ? null : key);

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">
      <p className="text-sm text-gray-400 mb-6">
        Find answers to common questions about our services, payments, and features.
      </p>

      <div className="space-y-6">
        {faqGroups.map((group) => (
          <div key={group.category}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">
              {group.category}
            </p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.faqs.map((faq, i) => {
                const key = `${group.category}-${i}`;
                return (
                  <AccordionItem
                    key={key}
                    q={faq.q}
                    a={faq.a}
                    isOpen={openKey === key}
                    onToggle={() => toggle(key)}
                    isLast={i === group.faqs.length - 1}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}