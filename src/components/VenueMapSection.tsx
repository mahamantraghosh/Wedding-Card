import React, { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { VENUE_LOCATIONS } from '../data/weddingData';
import { FloralDivider } from './Ornaments';

interface VenueMapSectionProps {
  activeVenueId: 'ojas' | 'ganpati';
  onChangeVenue: (id: 'ojas' | 'ganpati') => void;
}

export const VenueMapSection: React.FC<VenueMapSectionProps> = ({
  activeVenueId,
  onChangeVenue,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const activeVenue =
    VENUE_LOCATIONS.find((v) => v.id === activeVenueId) ?? VENUE_LOCATIONS[0];

  const handleCopyAddress = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(activeVenue.fullAddress);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = activeVenue.fullAddress;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(activeVenue.id);
      window.setTimeout(() => setCopiedId(null), 2600);
    } catch {
      setCopiedId(activeVenue.id);
      window.setTimeout(() => setCopiedId(null), 2600);
    }
  };

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="shahi-parchment relative w-full py-12 sm:py-16 px-4 sm:px-7 flex flex-col items-center"
    >
      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#8c6323]">
        Venue &amp; Directions
      </p>
      <h2
        id="locations-heading"
        className="mt-1.5 text-3xl sm:text-4xl font-semibold text-[#55081d] text-center text-balance"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Kolkata Route Map
      </h2>
      <FloralDivider className="mt-3" />

      {/* Venue Switcher Tabs */}
      <div
        role="tablist"
        aria-label="Select wedding venue"
        className="mt-6 inline-flex items-center p-1 rounded-full bg-[#ead4b6] border border-[#c49746]/65"
      >
        {VENUE_LOCATIONS.map((venue) => {
          const isSelected = venue.id === activeVenue.id;
          return (
            <button
              key={venue.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChangeVenue(venue.id)}
              className={`min-h-[40px] px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#470718] text-[#f8e6c2] shadow-sm'
                  : 'text-[#5b352c] hover:text-[#470718]'
              }`}
            >
              {venue.id === 'ojas' ? 'Nikaah · Ojas Banquets' : 'Walima · Ganpati Banquets'}
            </button>
          );
        })}
      </div>

      {/* Illustrated Antique Kolkata Route Map Card */}
      <div className="mt-6 w-full max-w-[440px] rounded-2xl overflow-hidden bg-[#fcf4e6] border-[1.5px] border-[#c49746]/80 shadow-[0_20px_46px_-22px_rgba(71,7,24,0.34)]">
        <a
          href={activeVenue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${activeVenue.name} in Google Maps`}
          className="group block relative w-full h-[244px] sm:h-[260px] overflow-hidden bg-[#f2dfc4] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#470718]"
        >
          <svg
            viewBox="0 0 400 250"
            className="w-full h-full object-cover"
            role="img"
            aria-label={`Illustrated route map to ${activeVenue.name}, Kolkata`}
          >
            <defs>
              <linearGradient id="mapPaperShahi" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f8ead4" />
                <stop offset="55%" stopColor="#f0dcc0" />
                <stop offset="100%" stopColor="#e8cea9" />
              </linearGradient>
              <linearGradient id="parkTintShahi" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d4dfc8" />
                <stop offset="100%" stopColor="#c4d3b6" />
              </linearGradient>
            </defs>

            <rect width="400" height="250" fill="url(#mapPaperShahi)" />

            {/* Kolkata blocks & parks */}
            <rect x="20" y="24" width="68" height="46" rx="6" fill="#e4cba7" opacity="0.65" />
            <rect x="112" y="22" width="76" height="54" rx="6" fill="url(#parkTintShahi)" opacity="0.72" />
            <rect x="210" y="24" width="84" height="48" rx="6" fill="#e4cba7" opacity="0.55" />
            <rect x="310" y="130" width="70" height="72" rx="8" fill="url(#parkTintShahi)" opacity="0.62" />
            <rect x="176" y="182" width="110" height="48" rx="6" fill="#e4cba7" opacity="0.58" />
            <rect x="24" y="114" width="74" height="58" rx="6" fill="#e4cba7" opacity="0.52" />

            {/* Arterial roads */}
            <path
              d="M 10 96 Q 130 92 224 102 T 392 84"
              stroke="#fdf7ec"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 10 96 Q 130 92 224 102 T 392 84"
              stroke="#c49746"
              strokeWidth="1"
              strokeOpacity="0.65"
              fill="none"
            />

            <path
              d="M 48 238 Q 108 188 158 154 T 292 22"
              stroke="#fdf7ec"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 48 238 Q 108 188 158 154 T 292 22"
              stroke="#c49746"
              strokeWidth="1"
              strokeOpacity="0.65"
              fill="none"
            />

            <path
              d="M 106 244 L 122 140 L 182 100 L 210 18"
              stroke="#fdf7ec"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />

            <text
              x="228"
              y="84"
              fontSize="8.5"
              fontFamily="Montserrat, sans-serif"
              fill="#6e4a38"
              letterSpacing="1.2"
            >
              TOPSIA ROAD
            </text>
            <text
              x="60"
              y="196"
              fontSize="8"
              fontFamily="Montserrat, sans-serif"
              fill="#6e4a38"
              letterSpacing="1"
              transform="rotate(-28 60 196)"
            >
              BALLYGUNGE PARK RD
            </text>
            <text x="122" y="52" fontSize="7.5" fontFamily="Montserrat, sans-serif" fill="#4f6b4b">
              Park Circus
            </text>
            <text x="317" y="168" fontSize="7.5" fontFamily="Montserrat, sans-serif" fill="#4f6b4b">
              Science City
            </text>

            <circle cx="72" cy="214" r="4.5" fill="#8c6323" />
            <text
              x="82"
              y="220"
              fontSize="8"
              fontWeight="600"
              fontFamily="Montserrat, sans-serif"
              fill="#552e27"
            >
              City Center / Park Circus
            </text>

            {/* Animated Royal Route */}
            <path
              d={activeVenue.routePath}
              stroke="#c49746"
              strokeWidth="4.5"
              strokeOpacity="0.35"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={activeVenue.routePath}
              stroke="#55081d"
              strokeWidth="2.4"
              strokeDasharray="6 6"
              fill="none"
              strokeLinecap="round"
              className="animate-route-dash"
            />

            {/* Secondary Venue Pin */}
            {VENUE_LOCATIONS.filter((v) => v.id !== activeVenue.id).map((other) => (
              <g key={other.id} opacity="0.6">
                <circle cx={other.pinX} cy={other.pinY} r="5" fill="#8c6323" />
                <text
                  x={other.pinX + 9}
                  y={other.pinY + 3}
                  fontSize="8"
                  fontFamily="Montserrat, sans-serif"
                  fill="#644237"
                >
                  {other.shortName}
                </text>
              </g>
            ))}

            {/* Active Imperial Maroon Pin */}
            <g transform={`translate(${activeVenue.pinX}, ${activeVenue.pinY})`}>
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#55081d"
                fillOpacity="0.25"
                className="animate-pin-ripple"
              />
              <path
                d="M 0 -22 C -8 -22 -14 -16 -14 -8 C -14 1 0 12 0 12 C 0 12 14 1 14 -8 C 14 -16 8 -22 0 -22 Z"
                fill="#55081d"
                stroke="#f5e1b8"
                strokeWidth="1.6"
              />
              <circle cx="0" cy="-9" r="4.2" fill="#f5e1b8" />
            </g>

            {/* Venue Callout */}
            <g
              transform={`translate(${activeVenue.id === 'ojas' ? 204 : 162}, ${
                activeVenue.id === 'ojas' ? 116 : 138
              })`}
            >
              <rect
                x="0"
                y="0"
                width="148"
                height="32"
                rx="6"
                fill="#fcf4e6"
                fillOpacity="0.96"
                stroke="#c49746"
                strokeWidth="1"
              />
              <text
                x="10"
                y="14"
                fontSize="8.8"
                fontWeight="700"
                fontFamily="Playfair Display, serif"
                fill="#55081d"
              >
                {activeVenue.shortName}
              </text>
              <text
                x="10"
                y="25"
                fontSize="7.4"
                fontFamily="Montserrat, sans-serif"
                fill="#734818"
              >
                {activeVenue.neighborhood}
              </text>
            </g>

            {/* Compass Rose */}
            <g transform="translate(362, 34)" opacity="0.72">
              <circle cx="0" cy="0" r="14" stroke="#b28236" strokeWidth="0.9" fill="#fcf4e6" fillOpacity="0.7" />
              <path d="M 0 -10 L 2.5 0 L 0 10 L -2.5 0 Z" fill="#55081d" />
              <path d="M -10 0 L 0 -2.5 L 10 0 L 0 2.5 Z" fill="#c49746" />
              <text x="-3" y="-16" fontSize="7" fontFamily="Montserrat, sans-serif" fill="#734818">
                N
              </text>
            </g>
          </svg>

          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fcf4e6]/95 border border-[#c49746]/80 text-[11px] font-medium text-[#55081d] shadow-xs group-hover:bg-[#470718] group-hover:text-[#f8e6c2] transition-colors">
            <span>Tap map for Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </a>

        <div className="p-5 sm:p-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8c6323]">
            {activeVenue.ceremonyLabel}
          </p>
          <h3
            className="mt-1.5 text-2xl font-semibold text-[#55081d]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {activeVenue.name}
          </h3>
          <p className="mt-1 text-xs font-medium text-[#6e4a38]">{activeVenue.dateLabel}</p>

          <p className="mt-3 text-xs sm:text-sm text-[#4e2d25] leading-relaxed max-w-sm mx-auto">
            {activeVenue.fullAddress}
          </p>

          <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-[11px] text-[#785143]">
            <MapPin className="w-3.5 h-3.5 text-[#b28236] shrink-0" />
            <span>{activeVenue.travelTip}</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={activeVenue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#470718] text-[#f8e6c2] text-xs font-medium tracking-[0.14em] uppercase shadow-sm hover:bg-[#5e0b22] active:scale-[0.98] transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#470718]"
            >
              <Navigation className="w-3.5 h-3.5 text-[#e6c88a]" />
              <span>Get directions</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#c49746]/90 bg-[#fcf4e6] text-[#55081d] text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#f0dec2] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#470718]"
            >
              {copiedId === activeVenue.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2e6f4e]" />
                  <span>Address copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#b28236]" />
                  <span>Copy address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
