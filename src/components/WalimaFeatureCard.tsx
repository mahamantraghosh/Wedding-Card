import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { WEDDING_FUNCTIONS } from '../data/weddingData';
import { FloralDivider } from './Ornaments';

interface WalimaFeatureCardProps {
  onShowWalimaMap: () => void;
  onJumpToRsvp: () => void;
}

export const WalimaFeatureCard: React.FC<WalimaFeatureCardProps> = ({
  onShowWalimaMap,
  onJumpToRsvp,
}) => {
  const walima = WEDDING_FUNCTIONS.find((f) => f.id === 'walima')!;

  const sparkles = [
    { top: '12%', left: '14%', delay: '0s' },
    { top: '20%', right: '15%', delay: '0.9s' },
    { top: '52%', left: '9%', delay: '1.7s' },
    { top: '62%', right: '11%', delay: '0.4s' },
    { bottom: '18%', left: '18%', delay: '1.3s' },
    { bottom: '14%', right: '20%', delay: '2.1s' },
  ];

  return (
    <section
      id="grand-reception"
      aria-labelledby="walima-reception-heading"
      className="shahi-parchment relative w-full py-12 sm:py-16 px-4 sm:px-7 flex justify-center"
    >
      <div className="shahi-maroon-damask relative w-full max-w-[440px] rounded-2xl overflow-hidden border-[2px] border-[#c49746] px-6 sm:px-9 py-11 text-center text-[#f7e4bc] shadow-[0_24px_56px_-20px_rgba(48,4,16,0.65)]">
        {/* Inner champagne gold filigree frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-xl border border-[#e6c88a]/40"
        />

        {/* Subtle gold corner brackets */}
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="pointer-events-none absolute top-4 left-4 w-7 h-7 text-[#e6c88a]/75"
          fill="none"
        >
          <path d="M2 24 V2 H24" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="pointer-events-none absolute top-4 right-4 w-7 h-7 text-[#e6c88a]/75 -scale-x-100"
          fill="none"
        >
          <path d="M2 24 V2 H24" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="pointer-events-none absolute bottom-4 left-4 w-7 h-7 text-[#e6c88a]/75 -scale-y-100"
          fill="none"
        >
          <path d="M2 24 V2 H24" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="pointer-events-none absolute bottom-4 right-4 w-7 h-7 text-[#e6c88a]/75 -scale-x-100 -scale-y-100"
          fill="none"
        >
          <path d="M2 24 V2 H24" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
        </svg>

        {/* Gentle Champagne Gold Sparkles */}
        {sparkles.map((sp, idx) => (
          <svg
            key={idx}
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute w-3 h-3 text-[#f2d699] animate-sparkle"
            style={{
              ...sp,
              animationDelay: sp.delay,
            }}
            fill="currentColor"
          >
            <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
          </svg>
        ))}

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#e6c88a]/90">
            Royal Evening Banquet
          </p>

          <h2
            id="walima-reception-heading"
            className="mt-2.5 text-3xl sm:text-[36px] font-semibold text-[#fae7c2] leading-tight text-balance"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Grand Walima Reception
          </h2>

          <FloralDivider variant="light" className="mt-3.5 max-w-[210px]" />

          <p className="mt-3.5 text-xs sm:text-sm text-[#f3e0c2]/90 max-w-xs leading-relaxed">
            Join the Alam &amp; Ahmed families for a celebratory dinner honoring the newlyweds.
          </p>

          <div className="mt-6 w-full space-y-2.5 text-sm text-[#f8ead0]">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#e6c88a] shrink-0" />
              <span className="font-medium">{walima.dayDate}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#e6c88a] shrink-0" />
              <span>{walima.time}</span>
            </div>
            <div className="pt-1 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 font-semibold text-[#fae7c2]">
                <MapPin className="w-4 h-4 text-[#e6c88a] shrink-0" />
                <span>{walima.venueName}</span>
              </div>
              <p className="mt-1 text-xs text-[#ecd7b4]/90 max-w-xs leading-relaxed">
                {walima.address}
              </p>
            </div>
          </div>

          <p className="mt-5 text-[11px] tracking-[0.16em] uppercase text-[#e6c88a]/85">
            Dress Code · {walima.dressCode}
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onShowWalimaMap}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f5e1b8] text-[#470718] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#fbf0d7] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e1b8]"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Reception Map</span>
            </button>

            <button
              type="button"
              onClick={onJumpToRsvp}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#e6c88a]/75 text-[#fae7c2] text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#e6c88a]/15 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e1b8]"
            >
              <span>Confirm Attendance</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
