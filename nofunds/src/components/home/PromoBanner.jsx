import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";

const promos = [
  {
    head: "ETL",
    title: "Up to 8GB for M229",
    text: "Get more data for less with our special bundle offer",
    color: "from-blue-400 to-blue-700",
    buttonText: "Get Bundle",
    route: "/bundles",   // internal
  },
  {
    head: "ETL",
    title: "Hoa Khonahala",
    text: "Recharge M5 or more for a chance to win a brand new car and amazing prizes.",
    color: "from-blue-500 to-blue-300",
    buttonText: "Recharge Now",
    route: "/recharge",
  },
  {
    head: "STANDARD LESOTHO BANK",
    title: "Banking Made Easy",
    text: "Open a digital account in minutes. Zero monthly fees for students.",
    color: "from-blue-600 to-blue-400",
    buttonText: "Learn More",
    external: "https://www.standardbank.co.ls", // external link
  },
  {
    head: "ETL",
    title: "30GB Social + Sasai",
    text: "Monthly Social bundle with 15GB social data and 15GB Sasal bonus.",
    color: "from-green-500 to-blue-500",
    buttonText: "Subscribe",
    route: "/services",
  },
  {
    head: "SHOPRITE LESOTHO",
    title: "Weekend Specials",
    text: "Save up to 30% on groceries this weekend. Visit your nearest store",
    color: "from-red-500 to-orange-500",
    buttonText: "Subscribe",
    external: "https://www.shoprite.co.ls", // external
  },
];

export default function PromoBanner() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % promos.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? promos.length - 1 : prev - 1));

  const handleClick = (promo) => {
    if (promo.external) {
      window.open(promo.external, "_blank", "noopener,noreferrer");
    } else if (promo.route) {
      navigate(promo.route);
    } else {
      console.warn("No route defined for promo:", promo.title);
    }
  };

  return (
    <div className="relative w-full overflow-hidden mt-4">
      {/* Slides Wrapper */}
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
        {promos.map((promo, index) => (
          <div key={index} className="min-w-full px-4">
            <div className={`rounded-2xl bg-gradient-to-r ${promo.color} text-white p-5 flex items-center justify-between shadow-md`}>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase opacity-80 mb-1">{promo.head}</div>
                <h3 className="font-bold text-base leading-snug">{promo.title}</h3>
                <p className="text-sm opacity-90 mt-1">{promo.text}</p>
                <button
                  onClick={() => handleClick(promo)}
                  className="mt-3 bg-white/20 text-white font-semibold text-sm px-4 py-1.5 rounded-full hover:bg-white/30 transition"
                >
                  {promo.buttonText}
                  {promo.external ? (
                    <FaExternalLinkAlt className="inline ml-1" />
                  ) : (
                    <FaArrowRight className="inline ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows & Dots (unchanged) */}
      <div className="absolute bottom-4 right-10 flex gap-2">
        <button onClick={prevSlide} className="bg-white/80 p-2 rounded-full text-gray-700 hover:bg-white"><FaChevronLeft size={12} /></button>
        <button onClick={nextSlide} className="bg-white/80 p-2 rounded-full text-gray-700 hover:bg-white"><FaChevronRight size={12} /></button>
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-2">
        {promos.map((_, idx) => (
          <div key={idx} className={`w-2.5 h-2.5 rounded-full ${current === idx ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}