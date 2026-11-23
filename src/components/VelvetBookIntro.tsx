import React, { useEffect, useState } from 'react';
import { ASSETS, COUPLE_INFO } from '../data/weddingData';
import { BismillahMedallion } from './Ornaments';

interface VelvetBookIntroProps {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}

/**
 * Shahi Patra inspired Royal Palace Double Doors Opening.
 * Deep imperial maroon damask doors adorned with hand-painted Mughal lotus sprigs
 * and ceremonial white royal elephants, banded across the center by an antique
 * sandstone silk invitation ribbon with a Mughal cartouche "Tap to open" button.
 */
export const VelvetBookIntro: React.FC<VelvetBookIntroProps> = ({
  onOpenStart,
  onOpenComplete,
}) => {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const urls = [
      ASSETS.royalPalaceHero,
      ASSETS.royalDoorElephant,
      ASSETS.royalLotusSprig,
      ASSETS.royalFountainPavilion,
      ASSETS.royalEaselCourtyard,
      ASSETS.sceneHaldiMehendi,
      ASSETS.sceneNikaah,
      ASSETS.sceneWalima,
      ASSETS.storyGarden,
    ];
    let loaded = 0;

    const markDone = () => {
      if (cancelled) return;
      loaded += 1;
      const pct = Math.min(100, Math.round((loaded / (urls.length + 1)) * 100));
      setLoadProgress(pct);
      if (loaded >= urls.length + 1) {
        window.setTimeout(() => {
          if (!cancelled) setIsReady(true);
        }, 160);
      }
    };

    urls.forEach((src) => {
      const img = new Image();
      img.onload = markDone;
      img.onerror = markDone;
      img.src = src;
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(markDone).catch(markDone);
    } else {
      markDone();
    }

    const ceiling = window.setTimeout(() => {
      if (!cancelled) {
        setLoadProgress(100);
        setIsReady(true);
      }
    }, 2400);

    return () => {
      cancelled = true;
      window.clearTimeout(ceiling);
    };
  }, []);

  const handleOpen = () => {
    if (!isReady || isOpening) return;
    setIsOpening(true);
    onOpenStart();
    window.setTimeout(() => {
      onOpenComplete();
    }, 1200);
  };

  return (
    <section
      aria-label="Royal Wedding Invitation Doors"
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        isOpening ? 'pointer-events-none' : ''
      }`}
    >
      {/* Centered mobile-proportion royal doorway stage on desktop; full-bleed on mobile */}
      <div className="relative w-full h-full max-w-[540px] mx-auto overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.65)]">
        {/* Top & bottom decorative maroon brocade header/footer strips */}
        <div
          aria-hidden="true"
          className={`shahi-maroon-dots absolute inset-x-0 top-0 h-14 z-10 border-b border-[#c49746]/35 transition-opacity duration-700 ${
            isOpening ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <div
          aria-hidden="true"
          className={`shahi-maroon-dots absolute inset-x-0 bottom-0 h-14 z-10 border-t border-[#c49746]/35 transition-opacity duration-700 ${
            isOpening ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* LEFT ROYAL PALACE DOOR */}
        <div
          aria-hidden="true"
          className={`shahi-door-panel shahi-door-left shahi-maroon-damask absolute inset-y-0 left-0 w-1/2 border-r-[2.5px] border-[#8b1838] shadow-[inset_-12px_0_24px_rgba(24,1,8,0.45)] flex flex-col justify-between py-16 px-2 sm:px-5 ${
            isOpening ? 'is-open' : ''
          }`}
        >
          {/* Upper Mughal Lotus & Rose Sprig */}
          <div className="flex justify-center pt-1">
            <img
              src={ASSETS.royalLotusSprig}
              alt=""
              referrerPolicy="no-referrer"
              className="w-28 sm:w-36 h-36 sm:h-44 object-contain mix-blend-lighten opacity-95 select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse 72% 78% at 50% 50%, black 55%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 72% 78% at 50% 50%, black 55%, transparent 98%)',
              }}
            />
          </div>

          {/* Lower Royal Ceremonial White Elephant facing inward right */}
          <div className="flex justify-center pb-1">
            <img
              src={ASSETS.royalDoorElephant}
              alt=""
              referrerPolicy="no-referrer"
              className="w-36 sm:w-44 h-36 sm:h-44 object-contain mix-blend-lighten opacity-95 select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 58%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 78% 78% at 50% 50%, black 58%, transparent 98%)',
              }}
            />
          </div>
        </div>

        {/* RIGHT ROYAL PALACE DOOR (Symmetrically Mirrored) */}
        <div
          aria-hidden="true"
          className={`shahi-door-panel shahi-door-right shahi-maroon-damask absolute inset-y-0 right-0 w-1/2 border-l-[2.5px] border-[#8b1838] shadow-[inset_12px_0_24px_rgba(24,1,8,0.45)] flex flex-col justify-between py-16 px-2 sm:px-5 ${
            isOpening ? 'is-open' : ''
          }`}
        >
          {/* Mirrored Upper Mughal Lotus & Rose Sprig */}
          <div className="flex justify-center pt-1">
            <img
              src={ASSETS.royalLotusSprig}
              alt=""
              referrerPolicy="no-referrer"
              className="w-28 sm:w-36 h-36 sm:h-44 object-contain mix-blend-lighten opacity-95 -scale-x-100 select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse 72% 78% at 50% 50%, black 55%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 72% 78% at 50% 50%, black 55%, transparent 98%)',
              }}
            />
          </div>

          {/* Mirrored Lower Royal Ceremonial White Elephant facing inward left */}
          <div className="flex justify-center pb-1">
            <img
              src={ASSETS.royalDoorElephant}
              alt=""
              referrerPolicy="no-referrer"
              className="w-36 sm:w-44 h-36 sm:h-44 object-contain mix-blend-lighten opacity-95 -scale-x-100 select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 58%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 78% 78% at 50% 50%, black 58%, transparent 98%)',
              }}
            />
          </div>
        </div>

        {/* CENTER ANTIQUE SANDSTONE SILK INVITATION BAND (Shahi Patra Signature) */}
        <div
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 transition-all duration-600 ease-out ${
            isOpening ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Top crimson velvet trim */}
          <div className="h-2.5 w-full bg-gradient-to-b from-[#7f1232] via-[#5e0820] to-[#3a0312] border-y border-[#c49746]/55" />

          <div className="shahi-parchment px-6 sm:px-10 py-8 sm:py-10 text-center shadow-[0_18px_50px_rgba(18,1,6,0.65)]">
            <BismillahMedallion size="md" />

            <p className="mt-3 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-[#8c6323]">
              {COUPLE_INFO.invocationEnglish}
            </p>

            <p
              className="mt-3 text-[19px] sm:text-[21px] leading-snug text-[#6d4621] max-w-[310px] mx-auto font-normal"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              We cordially invite you to grace the auspicious occasion of the marriage of…
            </p>

            <div className="mt-6 min-h-[48px] flex flex-col items-center justify-center">
              {!isReady ? (
                <div className="flex flex-col items-center gap-2" role="status" aria-live="polite">
                  <div className="w-40 h-1 rounded-full bg-[#680d26]/15 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#b28236] via-[#d9b061] to-[#680d26] transition-all duration-300"
                      style={{ width: `${Math.max(18, loadProgress)}%` }}
                    />
                  </div>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-[#6d4621]">
                    Preparing Shahi Patra…
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpen}
                  aria-label="Tap to open Dr. Saifuddin Alam and Sidra Ahmed wedding invitation"
                  className="shahi-cartouche-btn min-h-[46px] px-10 py-2.5 text-[#f6e0ae] text-sm font-medium tracking-[0.12em] active:scale-[0.97] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#680d26]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Tap to open
                </button>
              )}
            </div>
          </div>

          {/* Bottom crimson velvet trim */}
          <div className="h-2.5 w-full bg-gradient-to-b from-[#3a0312] via-[#5e0820] to-[#7f1232] border-y border-[#c49746]/55" />
        </div>
      </div>
    </section>
  );
};
