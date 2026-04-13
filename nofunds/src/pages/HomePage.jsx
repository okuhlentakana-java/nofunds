import Banner from "../components/home/Banner";
import Actions from "../components/home/Actions";
import Bundles from "../components/home/Bundles";
import PromoBanner from "../components/home/PromoBanner";
import Services from "../components/home/Services";
import SponsoredBanner from "../components/home/SponsoredBanner";

export default function HomePage() {
  return (
    <div className="pb-10">
      <Banner />
      <Actions />
      <Bundles />
      <PromoBanner />
      <Services />
      <SponsoredBanner />
    </div>
  );
}