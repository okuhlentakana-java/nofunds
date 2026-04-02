export default function Navbar({ onMenuClick, title = "Home" }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-30">

      {/* Left Side: Menu + Title */}
      <div className="flex items-center gap-3">
        <div
          className="text-2xl cursor-pointer"
          onClick={onMenuClick}
        >
          ☰
        </div>

        <div className="font-medium text-lg">
          {title}
        </div>
      </div>

      {/* Right Side: Logo */}
      <div>
        <img
          src="/etl-logo.png"
          alt="Econet Lesotho Logo"
          className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      </div>

    </div>
  );
}