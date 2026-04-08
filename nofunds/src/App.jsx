import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/universal/Layout";
import HomePage from "./pages/HomePage";
import RechargePage from "./pages/RechargePage";
import BundlesPage from "./pages/BundlesPage";
import AirtimeCreditPage from "./pages/AirtimeCreditPage";
import ServicesPage from "./pages/ServicesPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LanguagePage from "./pages/LanguagePage";
import FAQsPage from "./pages/FaqsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import AdvertPage from "./pages/AdvertPage";
import UsageTips from "./pages/UsageTips";
import Emergency from "./pages/EmergencyPage";
import AboutNoFunds from "./pages/AboutNoFundsPage";
import HotOffers from "./pages/HotOffers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
           <Route path="/" element={<HomePage />} />
           <Route path="/recharge" element={<RechargePage />} /> 
           <Route path="/bundles" element={<BundlesPage />} /> 
           <Route path="/credit" element={<AirtimeCreditPage />} /> 
           <Route path="/services" element={<ServicesPage />} /> 
           <Route path="/terms" element={<TermsAndConditionsPage />} /> 
           <Route path="/policy" element={<PrivacyPolicyPage />} /> 
           <Route path="/language" element={<LanguagePage />} /> 
           <Route path="/faqs" element={<FAQsPage />} /> 
           <Route path="/help" element={<HelpSupportPage />} /> 
           <Route path="/ads" element={<AdvertPage />} /> 
           <Route path="/tips" element={<UsageTips />} /> 
           <Route path="/emergency" element={<Emergency />} /> 
           <Route path="/no-funds" element={<AboutNoFunds />} /> 
           <Route path="/offers" element={<HotOffers />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
