import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Navigate",
    links: [
      { label: "Home", to: "/" },
      { label: "Recharge Airtime", to: "/recharge" },
      { label: "Data Bundles", to: "/bundles" },
      { label: "Airtime Credit", to: "/borrow" },
      { label: "Services", to: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free Usage Tips", to: "/tips" },
      { label: "Emergency", to: "/emergency" },
      { label: "Hot Offers", to: "/offers" },
      { label: "About No Funds", to: "/about" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Help & Support", to: "/support" },
      { label: "FAQs", to: "/faqs" },
      { label: "Advertise With Us", to: "/advertise" },
      { label: "Language", to: "/language" },
      { label: "Opt Out of Redirects", to: "/optout" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 pt-8 pb-10">
    

      <div className="mt-2 pt-6  border-gray-100 text-center">
        <img
          src="/etl-logo.png"
          alt="ETL Logo"
          className="h-8 w-auto object-contain opacity-60 mx-auto mb-2"
        />
        <p className="text-xs text-gray-400">Econet Telecom Lesotho</p>
        <p className="text-xs text-gray-300 mt-0.5">Powered by Econet Wireless</p>
      </div>
    </footer>
  );
}
