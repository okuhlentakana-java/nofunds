import { useState } from "react";
import { Link } from "react-router-dom";
import { MdChat, MdPhone, MdEmail, MdHelpOutline, MdDescription, MdPrivacyTip, MdChevronRight, MdClose } from "react-icons/md";

function ChatView({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm the ETL support assistant. How can I help you today? You can ask me about bundles, recharge, payments, or any service issues." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thank you for your message. A support agent will follow up shortly, or you can call us directly at 0003." },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Chat header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center">
            <MdChat className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">ETL Assistant</p>
            <p className="text-xs text-green-500 font-medium">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition">
          Close
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.from === "user"
                ? "bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-br-sm"
                : "bg-gray-100 text-gray-700 rounded-bl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={send}
          className="bg-gradient-to-br from-blue-900 to-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

const resources = [
  { label: "Frequently Asked Questions", icon: MdHelpOutline, to: "/faqs" },
  { label: "Terms & Conditions", icon: MdDescription, to: "/terms" },
  { label: "Privacy Policy", icon: MdPrivacyTip, to: "/privacy" },
];

export default function HelpSupportPage() {
  const [chatOpen, setChatOpen] = useState(false);

  if (chatOpen) {
    return (
      <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">
        <ChatView onClose={() => setChatOpen(false)} />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto space-y-6">

      {/* Chat with ETL Assistant */}
      <button
        onClick={() => setChatOpen(true)}
        className="relative overflow-hidden w-full bg-gradient-to-r from-blue-900 to-blue-600 text-white rounded-2xl p-5 flex items-center gap-4 shadow-md shadow-blue-900/30 ring-1 ring-white/10 after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none hover:opacity-90 transition text-left"
      >
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <MdChat className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-base">Chat with ETL Assistant</p>
          <p className="text-sm opacity-80 mt-0.5">Get instant help with bundles, payments, and more</p>
        </div>
        <MdChevronRight className="w-5 h-5 opacity-60" />
      </button>

      {/* Contact Us */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Contact Us</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <MdPhone className="w-4 h-4 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Call Customer Support</p>
              <p className="text-xs text-gray-400 mt-0.5">Available 24/7</p>
            </div>
            <a href="tel:0003" className="text-sm font-bold text-blue-700 hover:underline">0003</a>
          </div>
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <MdEmail className="w-4 h-4 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Email Support</p>
              <p className="text-xs text-gray-400 mt-0.5">Response within 24h</p>
            </div>
            <a href="mailto:support@etl.co.ls" className="text-sm font-bold text-blue-700 hover:underline">
              support@etl.co.ls
            </a>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Resources</p>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {resources.map(({ label, icon: Icon, to }, i) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition ${i < resources.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-700">{label}</span>
              <MdChevronRight className="w-4 h-4 text-gray-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}