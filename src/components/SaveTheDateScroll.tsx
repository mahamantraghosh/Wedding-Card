import React, { useEffect, useRef, useState } from 'react';
import { CalendarPlus, Check, Hand } from 'lucide-react';
import { COUPLE_INFO, WEDDING_FUNCTIONS } from '../data/weddingData';
import { calculateCountdown, generateWeddingIcs, padTwo } from '../utils/weddingLogic';
import { BismillahMedallion, FloralDivider } from './Ornaments';

interface SaveTheDateScrollProps {
  onRevealBurst: () => void;
}

export const SaveTheDateScroll: React.FC<SaveTheDateScrollProps> = ({ onRevealBurst }) => {
  const [isUnrolled, setIsUnrolled] = useState(false);
  const [pullOffset, setPullOffset] = useState(0);
  const [countdown, setCountdown] = useState(() =>
    calculateCountdown(COUPLE_INFO.weddingTargetIso)
  );
  const [calendarSaved, setCalendarSaved] = useState(false);

  const dragStartYRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown(COUPLE_INFO.weddingTargetIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const revealScroll = () => {
    if (isUnrolled) return;
    setIsUnrolled(true);
    setPullOffset(0);
    if (!hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      onRevealBurst();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isUnrolled) return;
    dragStartYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (dragStartYRef.current === null || isUnrolled) return;
    const delta = Math.max(0, Math.min(86, e.clientY - dragStartYRef.current));
    setPullOffset(delta);
    if (delta >= 52) {
      dragStartYRef.current = null;
      revealScroll();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (dragStartYRef.current === null) return;
    const delta = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    if (delta < 12 || delta >= 40) {
      revealScroll();
    } else {
      setPullOffset(0);
    }
  };

  const handleAddToCalendar = () => {
    const icsContent = generateWeddingIcs(WEDDING_FUNCTIONS);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Saifuddin-and-Sidra-Wedding-March-2027.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCalendarSaved(true);
    window.setTimeout(() => setCalendarSaved(false), 3200);
  };

  return (
    <section
      id="save-the-date"
      aria-labelledby="save-the-date-heading"
      className="shahi-parchment relative w-full py-12 sm:py-16 px-5 sm:px-8 flex flex-col items-center"
    >
      <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#8c6323]">
        Royal Farman · Save the Date
      </p>
      <h2
        id="save-the-date-heading"
        className="mt-1.5 text-3xl sm:text-4xl font-semibold text-[#55081d] text-center text-balance"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        The Auspicious Dates
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-[#6b483d] text-center max-w-xs">
        {isUnrolled
          ? 'Inshallah, we await the honor of welcoming you in Kolkata.'
          : 'Pull or tap the royal tassel below to unroll the wedding scroll.'}
      </p>

      {/* Antique Gold Scroll Rod & Unrolling Royal Farman Scroll */}
      <div className="relative mt-7 w-full max-w-[404px] flex flex-col items-center">
        {/* Top Ornate Gold Scroll Rod */}
        <div aria-hidden="true" className="relative z-20 w-full flex items-center justify-center">
          <div
            className="w-5 h-7 rounded-full border border-[#734818]/70 shadow-sm shrink-0"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #f8e5b6, #c49746 58%, #7b5119 100%)',
            }}
          />
          <div
            className="h-3.5 flex-1 -mx-1 rounded-full shadow-md"
            style={{
              background:
                'linear-gradient(180deg, #f5e0af 0%, #c49746 45%, #84591d 85%, #d6af64 100%)',
            }}
          />
          <div
            className="w-5 h-7 rounded-full border border-[#734818]/70 shadow-sm shrink-0"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #f8e5b6, #c49746 58%, #7b5119 100%)',
            }}
          />
        </div>

        {/* Scroll Parchment Body */}
        <div
          data-testid="save-date-scroll"
          data-unrolled={isUnrolled ? 'true' : 'false'}
          className="relative z-10 w-[90%] -mt-1 overflow-hidden rounded-b-xl border-x border-b border-[#c49746]/80 shadow-[0_22px_45px_-20px_rgba(71,7,24,0.38)] transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            background:
              'linear-gradient(180deg, #edd8ba 0%, #fcf4e6 10%, #f8ebd6 90%, #ebd3b2 100%)',
            maxHeight: isUnrolled ? '540px' : `${54 + pullOffset * 1.4}px`,
          }}
        >
          {/* Inner double antique gold royal frame */}
          <div className="relative m-3 rounded-lg border border-[#c49746]/70 px-5 py-7 sm:py-8 text-center">
            <div
              className={`relative z-10 transition-opacity duration-500 ${
                isUnrolled ? 'opacity-100 delay-200' : 'opacity-20'
              }`}
            >
              <BismillahMedallion size="sm" />

              <p className="mt-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#8c6323]">
                Nikaah Ceremony
              </p>

              <p
                className="mt-1.5 text-3xl sm:text-[34px] font-semibold text-[#55081d] leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                26th March 2027
              </p>

              <p className="mt-1 text-xs sm:text-sm font-medium text-[#643e34]">
                Friday · 8:00 PM onwards · Inshallah
              </p>

              <FloralDivider className="my-4 max-w-[200px]" />

              <div className="space-y-1.5 text-xs text-[#59342c]">
                <p>
                  <span className="font-semibold text-[#55081d]">Haldi &amp; Mehendi:</span>{' '}
                  Thu, 25th March · 7:00 PM
                </p>
                <p>
                  <span className="font-semibold text-[#55081d]">Nikaah:</span> Fri, 26th March ·
                  Ojas Banquets
                </p>
                <p>
                  <span className="font-semibold text-[#55081d]">Walima Reception:</span> Mon, 29th
                  March · Ganpati Banquets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cylinder Bar */}
        <div
          aria-hidden="true"
          className="relative z-20 w-[94%] h-3 -mt-1.5 rounded-full shadow-md"
          style={{
            background:
              'linear-gradient(180deg, #f5e0af 0%, #c49746 48%, #84591d 92%)',
          }}
        />

        {/* Hanging Royal Maroon & Gold Silk Tassel */}
        {!isUnrolled ? (
          <div className="relative z-20 flex flex-col items-center -mt-0.5">
            <button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onClick={revealScroll}
              aria-label="Pull or tap tassel to reveal Save the Date"
              className="group touch-none flex flex-col items-center min-w-[92px] min-h-[92px] pt-1 pb-2 cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-[#55081d] rounded-2xl"
              style={{
                transform: `translateY(${pullOffset * 0.45}px)`,
              }}
            >
              <span className="block w-0.5 h-8 bg-gradient-to-b from-[#8c6323] via-[#d9b061] to-[#8c6323]" />
              <span
                className="block w-3.5 h-3.5 rounded-full shadow-sm -mt-0.5"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #f8e5b6, #c49746 65%, #7b5119)',
                }}
              />
              <span
                className="animate-tassel-float block w-6 h-10 rounded-b-xl -mt-0.5 shadow-md"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, #5e0720 0px, #8c1736 2px, #3b0413 4px)',
                  clipPath: 'polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)',
                }}
              />

              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#55081d]">
                <Hand className="w-4 h-4 text-[#b28236] animate-pull-cue" />
                <span>Pull to reveal</span>
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#8c6323]">
            Kolkata · West Bengal
          </div>
        )}
      </div>

      {/* Live One-Line Tabular Countdown & Add to Calendar */}
      <div className="mt-8 w-full max-w-[420px] flex flex-col items-center">
        <div
          aria-label="Countdown to Nikaah Ceremony"
          className="flex items-baseline justify-center gap-2.5 sm:gap-4 text-[#55081d] tabular-nums flex-wrap"
        >
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {countdown.days}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#7a5042]">days</span>
          </div>
          <span aria-hidden="true" className="text-[#c49746] font-serif text-lg">
            ·
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {padTwo(countdown.hours)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#7a5042]">hrs</span>
          </div>
          <span aria-hidden="true" className="text-[#c49746] font-serif text-lg">
            ·
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {padTwo(countdown.minutes)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#7a5042]">min</span>
          </div>
          <span aria-hidden="true" className="text-[#c49746] font-serif text-lg">
            ·
          </span>
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl sm:text-3xl font-semibold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {padTwo(countdown.seconds)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#7a5042]">sec</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCalendar}
          className="shahi-cartouche-btn mt-6 min-h-[46px] inline-flex items-center justify-center gap-2 px-8 py-2.5 text-[#f8e4b8] text-xs font-medium tracking-[0.16em] uppercase active:scale-[0.98] transition-transform whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#55081d]"
        >
          {calendarSaved ? (
            <>
              <Check className="w-4 h-4 text-[#f5dca2]" />
              <span>Calendar File Downloaded</span>
            </>
          ) : (
            <>
              <CalendarPlus className="w-4 h-4 text-[#f5dca2]" />
              <span>Add to calendar</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
