import Banner from "../components/home/Banner";
import Actions from "../components/home/Actions";
import Bundles from "../components/home/Bundles";
import PromoBanner from "../components/home/PromoBanner";
import Services from "../components/home/Services";
import SponsoredBanner from "../components/home/SponsoredBanner";
import PaymentModal from "../components/universal/PaymentModal";
import { usePaymentReturn } from "../hooks/UsePaymentReturn";

export default function HomePage() {
  const { paymentStatus, returnedItem, returnedPhone, clear } = usePaymentReturn();

  const returnModalOpen      = paymentStatus === "success" || paymentStatus === "cancelled";
  const returnFallbackItem   = returnedItem || { name: "Bundle", description: "", price: "", validity: "" };
  const returnForceSuccess   = paymentStatus === "success";
  const returnForceCancelled = paymentStatus === "cancelled";

  return (
    <div className="pb-10">
      <Banner />
      <Actions />
      <Bundles />
      <PromoBanner />
      <Services />
      <SponsoredBanner />

      {/* PayFast redirects back to /?payment=success|cancelled — handled here */}
      {returnModalOpen && (
        <PaymentModal
          isOpen={returnModalOpen}
          onClose={clear}
          item={returnFallbackItem}
          restoredPhone={returnedPhone}
          forceSuccess={returnForceSuccess}
          forceCancelled={returnForceCancelled}
          onSuccess={clear}
        />
      )}
    </div>
  );
}