import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import UniversalBanner from "./UniversalBanner";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/recharge":
        return "Recharge";
      case "/bundles":
        return "Data Bundles";
      case "/credit":
        return "Airtime Credit";
      case "/services":
        return "Services";
      case "/offers":
        return "Hot Offers";
      case "/ads":
        return "Advertise With Us";
      case "/tips":
        return "Free Usage Tips";
      case "/emergency":
        return "Emergency";
      case "/no-funds":
        return "About No Funds";
      case "/help":
        return "Help & Support";
      case "/faqs":
        return "FAQs";
      case "/language":
        return "Language";
      case "/opt-out":
        return "Opt Out of Redirects";
      case "/terms":
        return "Terms and Conditions";
      case "/policy":
        return "Privacy Policy";
      default:
        return "ETL No Funds";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Navbar
        title={getTitle()}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Page content with padding bottom to prevent banner overlap */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
       
      <Footer />
      
      {/* Slim banner at bottom */}
      <UniversalBanner />
    </div>
  );
}