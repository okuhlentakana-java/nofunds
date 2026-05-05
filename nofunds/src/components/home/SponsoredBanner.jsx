import { useTangazoAd } from "../../hooks/useTangazoAd";

export default function SponsoredBanner() {
  useTangazoAd("primary_banner");

  return (
    <div className="mx-4 mt-3">
      <div className="rounded-2xl overflow-hidden">
        <div
          data-tangazo-zone="primary_banner"
          style={{ display: "block", width: "100%", minHeight: "180px" }}
        />
      </div>
    </div>
  );
}