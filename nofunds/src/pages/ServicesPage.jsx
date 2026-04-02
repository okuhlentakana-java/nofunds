import { useState } from "react";
import ServiceTabs from "../components/services/ServiceTabs";
import ServiceCard from "../components/services/ServiceCard";

const services = {
  all: [
    { id: 1, name: "Sasai", description: "All-in-one super app for chat, pay, stream and connect. You...", fullDescription: "Connect with friends, make payments, stream content, and discover new experiences all in one app.", features: ["Chat & Messaging", "Payments", "Streaming", "Connect"], action: "access", type: "digital" },
    { id: 2, name: "EcoCash Spache Fono", description: "Mobile money service for payments, transfers, and financial...", fullDescription: "Mobile money service for payments, transfers, and financial services across all networks in Lesotho.", features: ["Send and receive money", "Pay bills and merchants", "Cross-network transfers", "Savings and loans"], action: "access", type: "finance" },
    { id: 3, name: "EcoSure Rebolokehile", description: "Affordable mobile insurance providing life cover for you...", fullDescription: "Affordable mobile insurance providing life cover for you and your family, right from your phone.", features: ["Life insurance cover", "Affordable premiums", "Family protection", "Easy claims process"], plans: ["Daily", "Weekly", "Monthly"], action: "insurance", type: "finance" },
    { id: 4, name: "Next Best Offer", description: "Personalised bundle recommendations based on your usage...", fullDescription: "Get personalized bundle recommendations based on your usage patterns and save money.", features: ["Personalized recommendations", "Best value bundles", "Usage insights"], action: "access", type: "digital" },
    { id: 5, name: "Health Tips", description: "Stay informed with daily health tips and wellness advice...", fullDescription: "Receive daily health tips, wellness advice, and medical information to stay healthy.", features: ["Daily tips", "Wellness advice", "Health alerts"], action: "subscribe", type: "lifestyle" },
    { id: 6, name: "Traffic Cameras", description: "Real-time traffic monitoring and camera feeds to help you...", fullDescription: "Access real-time traffic cameras and monitoring to plan your routes and avoid congestion.", features: ["Live traffic feeds", "Route planning", "Traffic alerts"], action: "access", type: "lifestyle" },
    { id: 7, name: "Celebrity Connect", description: "Connect with your favourite celebrities through exclusive...", fullDescription: "Get exclusive access to your favorite celebrities, content, and interactions.", features: ["Exclusive celebrity content", "Entertainment updates", "Fan interactions", "Premium content access"], plans: ["Daily", "Weekly", "Monthly"], action: "subscribe", type: "content" },
    { id: 8, name: "Pokola", description: "Digital content and entertainment service for music, games,...", fullDescription: "Access a wide range of digital content including music, games, and entertainment.", features: ["Music streaming", "Games", "Entertainment content"], action: "access", type: "content" },
  ],
  digital: [
    { id: 1, name: "Sasai", description: "All-in-one super app for chat, pay, stream and connect. You...", fullDescription: "Connect with friends, make payments, stream content, and discover new experiences all in one app.", features: ["Chat & Messaging", "Payments", "Streaming", "Connect"], action: "access", type: "digital" },
    { id: 4, name: "Next Best Offer", description: "Personalised bundle recommendations based on your usage...", fullDescription: "Get personalized bundle recommendations based on your usage patterns and save money.", features: ["Personalized recommendations", "Best value bundles", "Usage insights"], action: "access", type: "digital" },
  ],
  finance: [
    { id: 2, name: "EcoCash Spache Fono", description: "Mobile money service for payments, transfers, and financial...", fullDescription: "Mobile money service for payments, transfers, and financial services across all networks in Lesotho.", features: ["Send and receive money", "Pay bills and merchants", "Cross-network transfers", "Savings and loans"], action: "access", type: "finance" },
    { id: 3, name: "EcoSure Rebolokehile", description: "Affordable mobile insurance providing life cover for you...", fullDescription: "Affordable mobile insurance providing life cover for you and your family, right from your phone.", features: ["Life insurance cover", "Affordable premiums", "Family protection", "Easy claims process"], plans: ["Daily", "Weekly", "Monthly"], action: "insurance", type: "finance" },
  ],
  lifestyle: [
    { id: 5, name: "Health Tips", description: "Stay informed with daily health tips and wellness advice...", fullDescription: "Receive daily health tips, wellness advice, and medical information to stay healthy.", features: ["Daily tips", "Wellness advice", "Health alerts"], action: "subscribe", type: "lifestyle" },
    { id: 6, name: "Traffic Cameras", description: "Real-time traffic monitoring and camera feeds to help you...", fullDescription: "Access real-time traffic cameras and monitoring to plan your routes and avoid congestion.", features: ["Live traffic feeds", "Route planning", "Traffic alerts"], action: "access", type: "lifestyle" },
  ],
  content: [
    { id: 7, name: "Celebrity Connect", description: "Connect with your favourite celebrities through exclusive...", fullDescription: "Get exclusive access to your favorite celebrities, content, and interactions.", features: ["Exclusive celebrity content", "Entertainment updates", "Fan interactions", "Premium content access"], plans: ["Daily", "Weekly", "Monthly"], action: "subscribe", type: "content" },
    { id: 8, name: "Pokola", description: "Digital content and entertainment service for music, games,...", fullDescription: "Access a wide range of digital content including music, games, and entertainment.", features: ["Music streaming", "Games", "Entertainment content"], action: "access", type: "content" },
  ],
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeServices, setActiveServices] = useState({});

  const handleActivate = (serviceId) => {
    setActiveServices((prev) => ({ ...prev, [serviceId]: true }));
  };

  const currentServices = services[activeTab] || services.all;

  return (
    <div className="px-4 sm:px-6 mt-6 pb-10">
      <ServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="grid grid-cols-1 gap-4">
        {currentServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isActive={!!activeServices[service.id]}
            onActivate={() => handleActivate(service.id)}
          />
        ))}
      </div>
    </div>
  );
}