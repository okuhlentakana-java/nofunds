import { useTangazoAd } from "../../hooks/useTangazoAd";

export default function PromoBanner() {
  const { isEmpty } = useTangazoAd("primary_banner");

  return (
    <div className="w-full mt-4 px-4">
      <div className="rounded-2xl overflow-hidden max-w-screen-sm mx-auto">
        {isEmpty ? (
          <img
            src="/VisitLesotho_primary_1080x720 2.jpg"
            alt="Visit Lesotho"
            className="w-full h-auto block"
          />
        ) : (
          <div
            data-tangazo-zone="primary_banner"
            style={{ display: "block", width: "100%", minHeight: "180px" }}
          />
        )}
      </div>
    </div>
  );
}