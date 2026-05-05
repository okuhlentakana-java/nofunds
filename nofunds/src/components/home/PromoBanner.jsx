import { useTangazoAd } from "../../hooks/useTangazoAd";

export default function PromoBanner() {
  useTangazoAd("secondary_banner");

  return (
    <div className="relative w-full mt-4 px-4">
      <div
        data-tangazo-zone="secondary_banner"
        style={{ display: "inline-block", width: "100%", minHeight: "90px" }}
      />
    </div>
  );
}