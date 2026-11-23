import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ASSETS, COUPLE_INFO } from '../data/weddingData';
import { BismillahMedallion, FloralDivider, ShahiGeometricBand } from './Ornaments';

interface HeroPageProps {
  isOpened: boolean;
  onScrollDown: () => void;
}

interface AnimatedNameProps {
  text: string;
  baseDelayMs: number;
  active: boolean;
}

const AnimatedName: React.FC<AnimatedNameProps> = ({ text, baseDelayMs, active }) => {
  const letters = Array.from(text);
  return (
    <span className="inline-block" aria-label={text}>
      {letters.map((char, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className={active ? 'inline-block animate-letter-reveal' : 'inline-block opacity-0'}
          style={{
            animationDelay: `${baseDelayMs + idx * 34}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export const HeroPage: React.FC<HeroPageProps> = ({ isOpened, onScrollDown }) => {
  return (
    <div id="invitation-hero">
      {/* PART A: Full-Bleed Sunset Mughal Palace Courtyard Hero (exact 100svh) */}
      <section
        aria-label="Wedding Invitation Opening Palace"
        className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-between bg-[#470718]"
      >
        {/* Full-bleed hand-painted royal palace courtyard painting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <img
            src={ASSETS.royalPalaceHero}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center animate-arch-zoom"
          />
          {/* Subtle top golden sky readability scrim so couple names shine crisp */}
          <div
            className="absolute inset-x-0 top-0 h-[44%]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 240, 222, 0.72) 0%, rgba(255, 236, 214, 0.48) 58%, transparent 100%)',
            }}
          />
          {/* Subtle bottom darkening over reflecting pool edge for scroll prompt */}
          <div
            className="absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                'linear-gradient(0deg, rgba(56, 6, 20, 0.78) 0%, rgba(56, 6, 20, 0.25) 55%, transparent 100%)',
            }}
          />
        </div>

        {/* Top Curved Imperial Maroon Damask Arch Valance (Shahi Patra signature) */}
        <div aria-hidden="true" className="relative z-10 w-full h-12 sm:h-14 overflow-hidden">
          <svg
            viewBox="0 0 400 52"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <defs>
              <pattern id="maroonDotsTop" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="#470718" />
                <path d="M8 5 L10 8 L8 11 L6 8 Z" fill="#8c1c39" fillOpacity="0.45" />
              </pattern>
            </defs>
            <path d="M0 0 L400 0 L400 18 Q200 54 0 18 Z" fill="url(#maroonDotsTop)" />
            <path
              d="M0 18 Q200 54 400 18"
              stroke="#c49746"
              strokeWidth="1.8"
              fill="none"
            />
          </svg>
        </div>

        {/* Couple Names floating serenely in the sunset sky above the palace dome */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 px-5 text-center">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.26em] uppercase text-[#680d26] drop-shadow-[0_1px_4px_rgba(255,244,230,0.9)]">
            Inshallah · Kolkata
          </p>

          <h1
            className="mt-2 text-[32px] sm:text-[40px] leading-[1.12] font-semibold text-[#55081d] tracking-tight text-balance drop-shadow-[0_2px_10px_rgba(255,245,232,0.95)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <AnimatedName text={COUPLE_INFO.groomName} baseDelayMs={140} active={isOpened} />
          </h1>

          <span
            className="my-1 text-2xl sm:text-3xl italic font-normal text-[#8c5a1a] leading-none drop-shadow-[0_1px_6px_rgba(255,245,232,0.95)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            &amp;
          </span>

          <h2
            className="text-[32px] sm:text-[40px] leading-[1.12] font-semibold text-[#55081d] tracking-tight text-balance drop-shadow-[0_2px_10px_rgba(255,245,232,0.95)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            <AnimatedName text={COUPLE_INFO.brideName} baseDelayMs={650} active={isOpened} />
          </h2>

          <p className="mt-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#5e1425] drop-shadow-[0_1px_4px_rgba(255,245,232,0.9)]">
            {COUPLE_INFO.celebrationDatesLine}
          </p>
        </div>

        {/* Bottom Curved Imperial Maroon Damask Arch with Scroll Down Prompt */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <button
            type="button"
            onClick={onScrollDown}
            aria-label="Scroll to family details and Save the Date"
            className="mb-1.5 min-w-[44px] min-h-[44px] inline-flex flex-col items-center justify-center gap-0.5 text-[#f8e6c2] hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#f8e6c2] rounded-full"
          >
            <span className="text-[10px] font-medium tracking-[0.24em] uppercase drop-shadow">
              Scroll down
            </span>
            <ChevronDown className="w-5 h-5 animate-scroll-arrow text-[#e8cf95]" />
          </button>

          <svg
            aria-hidden="true"
            viewBox="0 0 400 44"
            preserveAspectRatio="none"
            className="w-full h-10 sm:h-12 block"
          >
            <defs>
              <pattern id="maroonDotsBot" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="#470718" />
                <path d="M8 5 L10 8 L8 11 L6 8 Z" fill="#8c1c39" fillOpacity="0.45" />
              </pattern>
            </defs>
            <path d="M0 44 L0 26 Q200 -8 400 26 L400 44 Z" fill="url(#maroonDotsBot)" />
            <path
              d="M0 26 Q200 -8 400 26"
              stroke="#c49746"
              strokeWidth="1.8"
              fill="none"
            />
          </svg>
        </div>
      </section>

      {/* PART B: Royal Family Lineage & Painted Palace Fountain Vignette */}
      <ShahiGeometricBand />

      <section
        id="families"
        aria-label="The Families"
        className="shahi-parchment relative w-full pt-12 pb-8 px-5 sm:px-8 text-center"
      >
        <BismillahMedallion size="md" />

        <p className="mt-3 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6323]">
          {COUPLE_INFO.invocationEnglish}
        </p>
        <p className="mt-1 text-xs sm:text-[13px] tracking-[0.14em] uppercase text-[#6e4a44]">
          {COUPLE_INFO.togetherLine}
        </p>

        {/* Twin Royal Mughal Lineage Plaques */}
        <div className="mt-7 space-y-5 max-w-[420px] mx-auto">
          <article className="rounded-2xl border border-[#c49746]/70 bg-[#fcf4e6]/85 p-1.5 shadow-[0_12px_30px_-18px_rgba(71,7,24,0.28)]">
            <div className="rounded-xl border border-[#c49746]/35 px-5 py-6">
              <h3
                className="text-2xl sm:text-[27px] font-semibold text-[#58081e]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {COUPLE_INFO.groomName}
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-[#5c362e] leading-relaxed">
                <span className="italic text-[#8c6323] mr-1.5">
                  {COUPLE_INFO.groomParentsPrefix}
                </span>
                <span className="font-medium">{COUPLE_INFO.groomParents}</span>
              </p>
            </div>
          </article>

          <div className="flex items-center justify-center gap-3 w-40 mx-auto" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c49746]" />
            <span
              className="text-xl italic text-[#8c6323]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              weds
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c49746]" />
          </div>

          <article className="rounded-2xl border border-[#c49746]/70 bg-[#fcf4e6]/85 p-1.5 shadow-[0_12px_30px_-18px_rgba(71,7,24,0.28)]">
            <div className="rounded-xl border border-[#c49746]/35 px-5 py-6">
              <h3
                className="text-2xl sm:text-[27px] font-semibold text-[#58081e]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {COUPLE_INFO.brideName}
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-[#5c362e] leading-relaxed">
                <span className="italic text-[#8c6323] mr-1.5">
                  {COUPLE_INFO.brideParentsPrefix}
                </span>
                <span className="font-medium">{COUPLE_INFO.brideParents}</span>
              </p>
            </div>
          </article>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-[#57342c] max-w-sm mx-auto leading-relaxed">
          {COUPLE_INFO.inviteLine}
        </p>

        {/* Hand-Painted Royal Courtyard Fountain Pavilion Vignette (Shahi Patra signature) */}
        <div className="mt-8 max-w-[440px] mx-auto">
          <img
            src={ASSETS.royalFountainPavilion}
            alt="Royal Mughal sandstone pavilion and lotus fountain courtyard"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain mix-blend-multiply"
            style={{
              maskImage: 'radial-gradient(ellipse 84% 84% at 50% 50%, black 62%, transparent 99%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 84% 84% at 50% 50%, black 62%, transparent 99%)',
            }}
          />
        </div>

        <FloralDivider className="mt-2" />
      </section>
    </div>
  );
};
