import { MdFlashOn } from "react-icons/md";
import { PiPhoneFill } from "react-icons/pi";
import { MdWifi } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMessage } from "react-icons/md";

const tabs = [
  { id: "all",     label: "All",     Icon: MdFlashOn  },
  { id: "airtime", label: "Airtime", Icon: PiPhoneFill },
  { id: "data",    label: "Data",    Icon: MdWifi      },
  { id: "voice",   label: "Voice",   Icon: MdPhone     },
  { id: "sms",     label: "SMS",     Icon: MdMessage   },
];

export default function CreditTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`relative overflow-hidden flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
            activeTab === id
              ? "bg-gradient-to-br from-blue-900 to-blue-600 text-white shadow-md shadow-blue-900/40 ring-1 ring-white/10 after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none"
              : "bg-white text-gray-500 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}