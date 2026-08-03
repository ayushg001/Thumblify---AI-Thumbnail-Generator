
import { Share2 } from 'lucide-react';
import { platformSelect, type PlatformSelect } from "../assets/assets";

// Authentic YouTube Icon with original red brand color and white play triangle
const YouTubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={`shrink-0 filter drop-shadow-[0_2px_4px_rgba(255,0,0,0.35)] ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      fill="#FF0000"
    />
    <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FFFFFF" />
  </svg>
);

// Authentic Instagram Icon with official brand multi-color gradient
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={`shrink-0 filter drop-shadow-[0_2px_4px_rgba(214,36,159,0.35)] ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="insta-brand-grad-select" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285ae6" />
      </radialGradient>
    </defs>
    <path
      fill="url(#insta-brand-grad-select)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);

export default function PlatformSelector({value,onChange,}: {value: PlatformSelect; onChange: (platform: PlatformSelect) => void ; }) {

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200 flex items-center gap-2">
        <Share2 className="w-4 h-4 text-pink-400" />
        <span>Platform</span>
      </label>

      <div className="grid grid-cols-2 gap-3">
        {platformSelect.map((platform) => {
          const selected = value === platform;
          const isYoutube = platform.toLowerCase() === "youtube";

          return (
            <button
              key={platform}
              type="button"
              onClick={() => onChange(platform)}
              className={`relative flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                selected ? isYoutube ? "bg-red-500/12 border-red-500/50 text-white shadow-lg shadow-red-500/10 ring-1 ring-red-500/40"
                                     : "bg-pink-500/12 border-pink-500/50 text-white shadow-lg shadow-pink-500/10 ring-1 ring-pink-500/40"
                  : "bg-black/20 border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {isYoutube ? <YouTubeIcon /> : <InstagramIcon />}
              <span className="tracking-wide">
                {isYoutube ? "YouTube" : "Instagram"}
              </span>

              {/* Selection Dot */}
              {selected && (
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
                    isYoutube ? "bg-red-500 shadow-[0_0_6px_#FF0000]" : "bg-pink-500 shadow-[0_0_6px_#d6249f]"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
