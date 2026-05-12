import { useTangazoAd } from "../../hooks/useTangazoAd";

export default function SponsoredBanner() {
  const { isEmpty } = useTangazoAd("secondary_banner");

  return (
    <div className="w-full mt-4 px-4">
      <div className="rounded-2xl overflow-hidden max-w-screen-sm mx-auto">
        {isEmpty ? (
          <img
            src="/VisitLesotho_secondary_728x90 2.jpg"
            alt="Visit Lesotho"
            className="w-full h-auto block"
          />
        ) : (
          <div
            data-tangazo-zone="secondary_banner"
            style={{ display: "block", width: "100%", minHeight: "90px" }}
          />
        )}
      </div>
    </div>
  );
}