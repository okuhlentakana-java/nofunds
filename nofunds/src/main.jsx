import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
       path: "", 
       element: <HomePage />
      },
      {
       path: "/recharge", 
       element: <RechargePage />
        },
       {
       path: "/bundles", 
       element: <BundlesPage />
       },
       {
       path: "/credit", 
       element: <AirtimeCreditPage />
       },
       {
       path: "/services", 
       element: <ServicesPage />
       },
       {
       path: "/terms", 
       element: <TermsAndConditionsPage />
        },
      {
       path: "/policy", 
       element: <PrivacyPolicyPage />
       },
       {
       path: "/language", 
       element: <LanguagePage />
       },
       {
       path: "/faqs", 
       element: <FAQsPage />
       },
       {
       path: "/help", 
       element: <HelpSupportPage />
       },
       {
       path: "/ads", 
       element: <AdvertPage />
       },
       {
       path: "/tips", 
       element: <UsageTips /> 
       },
       {
       path: "/emergency", 
       element: <Emergency />
       },
       {
       path: "/no-funds", 
       element: <AboutNoFunds />
       },
       {
       path: "/offers", 
       element: <HotOffers />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
