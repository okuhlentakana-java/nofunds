import { useState } from "react";
import { MdLanguage, MdCheck } from "react-icons/md";

const languages = [
  { id: "en", name: "English", native: "English" },
  { id: "st", name: "Sesotho", native: "Sesotho" },
];

export default function LanguagePage() {
  const [selected, setSelected] = useState("en");

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <MdLanguage className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-base">Display Language</p>
          <p className="text-sm text-gray-400">Choose your preferred language</p>
        </div>
      </div>

      {/* Language options */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {languages.map((lang, i) => (
          <button
            key={lang.id}
            onClick={() => setSelected(lang.id)}
            className={`w-full flex items-center justify-between px-5 py-4 text-left transition hover:bg-gray-50 ${
              i < languages.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{lang.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{lang.native}</p>
            </div>
            {selected === lang.id && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center flex-shrink-0">
                <MdCheck className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Note */}
      <p className="text-xs text-gray-400 leading-relaxed mt-4 px-1">
        Changing the language will update all text across the portal. Some content from
        third-party services may remain in the original language.
      </p>
    </div>
  );
}
