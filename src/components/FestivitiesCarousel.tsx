import React from 'react';
import { MapPin } from 'lucide-react';
import { WEDDING_FUNCTIONS } from '../data/weddingData';
import { FloralDivider, ShahiGeometricBand } from './Ornaments';

interface FestivitiesCarouselProps {
  onSelectVenueOnMap: (venueId: 'ojas' | 'ganpati') => void;
}

/**
 * Shahi Patra inspired Deep Imperial Maroon Ceremonies Court.
 * Each ceremony is framed inside a scalloped Mughal cusped-arch (Mihrab/Jharokha)
 * antique cream parchment card with double antique-gold hairline borders, painted
 * ceremony artwork feathered seamlessly into the arch, crisp location pin button,
 * date/time footer, and dress code colour swatches.
 */
export const FestivitiesCarousel: React.FC<FestivitiesCarouselProps> = ({
  onSelectVenueOnMap,
}) => {
  return (
    <div id="festivities">
      <ShahiGeometricBand />

      <section
        aria-labelledby="festivities-heading"
        className="shahi-maroon-damask relative w-full py-16 sm:py-20 px-4 sm:px-7"
      >
        <div className="text-center">
          <p className="text-[11px] font-medium tracking-[0.26em] uppercase text-[#e6c88a]/90">
            Royal Celebration Schedule
          </p>
          <h2
            id="festivities-heading"
            className="mt-2 text-3xl sm:text-4xl font-semibold text-[#fae7c2] text-balance"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Ceremonies
          </h2>
          <FloralDivider variant="light" className="mt-3.5" />
        </div>

        {/* Scalloped Mughal Cusped-Arch (Jharokha) Cards */}
        <div className="mt-10 space-y-8 max-w-[440px] mx-auto">
          {WEDDING_FUNCTIONS.map((fn, idx) => (
            <React.Fragment key={fn.id}>
              <article className="relative">
                {/* Outer Antique Cream Scalloped Mughal Arch Card */}
                <div
                  className="relative bg-[#f7e7cf] rounded-t-[200px] rounded-b-xl border-[2px] border-[#c49746] shadow-[0_24px_54px_-16px_rgba(14,1,5,0.7)] p-2"
                  style={{
                    boxShadow:
                      '0 24px 54px -16px rgba(14, 1, 5, 0.7), inset 0 0 0 2px #f7e7cf',
                  }}
                >
                  {/* Decorative Mughal Finial Tip crowning the arch */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 26"
                    className="absolute -top-5 left-1/2 -translate-x-1/2 w-28 h-7 pointer-events-none"
                    fill="none"
                  >
                    <path
                      d="M12 24 C34 22 48 16 60 3 C72 16 86 22 108 24 Z"
                      fill="#f7e7cf"
                      stroke="#c49746"
                      strokeWidth="1.8"
                    />
                    <circle cx="60" cy="4" r="2.5" fill="#e8cf95" stroke="#c49746" strokeWidth="1" />
                  </svg>

                  {/* Inner Fine Double Gold Arch Border */}
                  <div className="relative rounded-t-[192px] rounded-b-lg border border-[#c49746]/70 bg-[#f9ebd5] overflow-hidden">
                    {/* Hand-Painted Ceremony Scene feathered seamlessly into the antique parchment arch */}
                    <div className="relative h-[232px] sm:h-[248px] w-full overflow-hidden bg-[#f2dfc4]">
                      <img
                        src={fn.sceneImage}
                        alt={fn.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Smooth bottom feathering into antique cream card */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(71, 7, 24, 0.08) 0%, rgba(249, 235, 213, 0.05) 55%, rgba(249, 235, 213, 0.92) 88%, #f9ebd5 100%)',
                        }}
                      />
                    </div>

                    {/* Ceremony Typography & Venue Block (Shahi Patra structure) */}
                    <div className="px-5 sm:px-6 pt-1 pb-6 text-center">
                      <h3
                        className="text-[26px] sm:text-[28px] font-semibold text-[#4e071a] leading-tight"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {fn.title}
                      </h3>
                      <p className="mt-1 text-xs italic text-[#7a5042]">
                        {fn.subtitle}
                      </p>

                      {/* Venue Address + Signature Square-Rounded Location Pin Button */}
                      <div className="mt-5 flex items-center justify-between gap-3 text-left">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#470718]">
                            {fn.venueName}
                          </p>
                          <p className="mt-0.5 text-xs text-[#5d3930] leading-relaxed">
                            {fn.address}
                          </p>
                        </div>

                        {fn.mapVenueId ? (
                          <button
                            type="button"
                            onClick={() => onSelectVenueOnMap(fn.mapVenueId!)}
                            aria-label={`View ${fn.shortTitle} venue on route map`}
                            className="shrink-0 w-11 h-11 rounded-xl border border-[#470718]/75 bg-[#fcf4e6] text-[#470718] flex items-center justify-center hover:bg-[#470718] hover:text-[#f9ebd5] active:scale-[0.96] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#470718]"
                          >
                            <MapPin className="w-5 h-5" />
                          </button>
                        ) : (
                          <a
                            href={fn.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${fn.shortTitle} location in Google Maps`}
                            className="shrink-0 w-11 h-11 rounded-xl border border-[#470718]/75 bg-[#fcf4e6] text-[#470718] flex items-center justify-center hover:bg-[#470718] hover:text-[#f9ebd5] active:scale-[0.96] transition-colors focus-visible:outline-2 focus-visible:outline-[#470718]"
                          >
                            <MapPin className="w-5 h-5" />
                          </a>
                        )}
                      </div>

                      {/* Hairline Gold Divider + Date & Time Footer */}
                      <div className="mt-4 pt-3.5 border-t border-[#c49746]/55 flex items-baseline justify-between gap-2 text-xs sm:text-[13px] text-[#470718]">
                        <span className="font-semibold">{fn.dayDate}</span>
                        <span className="font-medium text-[#734818] whitespace-nowrap">
                          {fn.time}
                        </span>
                      </div>

                      {/* Dress Code & Swatches Row */}
                      <div className="mt-3 pt-2.5 border-t border-[#c49746]/30 flex items-center justify-between gap-2 text-[11px] text-[#5e3a32]">
                        <span>
                          <strong className="uppercase tracking-[0.12em] text-[#8c6323] font-semibold mr-1.5">
                            Attire:
                          </strong>
                          {fn.dressCode}
                        </span>
                        <span className="inline-flex items-center gap-1.5 shrink-0">
                          {fn.swatches.map((swatch) => (
                            <span
                              key={swatch.name}
                              title={swatch.name}
                              aria-label={swatch.name}
                              className="w-3.5 h-3.5 rounded-full border border-[#c49746] shadow-xs inline-block"
                              style={{ backgroundColor: swatch.hex }}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {idx < WEDDING_FUNCTIONS.length - 1 && (
                <FloralDivider variant="light" className="py-1" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      <ShahiGeometricBand />
    </div>
  );
};
