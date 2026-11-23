import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { COUPLE_INFO, STORY_SLIDES } from '../data/weddingData';
import { wrapCarouselIndex } from '../utils/weddingLogic';
import { FloralDivider } from './Ornaments';

/**
 * Shahi Patra inspired Hanging Maroon Gallery Frames.
 * Deep imperial maroon velvet rod with braided silk cords suspending thick bevelled
 * maroon lacquer frames with ivory museum mats around our royal watercolor chapters.
 */
export const StoryCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const total = STORY_SLIDES.length;

  const go = (delta: number) => {
    setActiveIndex((prev) => wrapCarouselIndex(prev, delta, total));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const dx = e.clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (dx < -40) go(1);
    else if (dx > 40) go(-1);
  };

  const activeSlide = STORY_SLIDES[activeIndex];

  return (
    <section
      id="our-story"
      aria-labelledby="our-story-heading"
      className="shahi-parchment relative w-full pt-8 pb-16 overflow-hidden"
    >
      <div className="px-5 sm:px-8 text-center">
        <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#8c6323]">
          Our Journey
        </p>
        <h2
          id="our-story-heading"
          className="mt-1.5 text-3xl sm:text-4xl font-semibold text-[#55081d] text-balance"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Our Story
        </h2>
      </div>

      {/* Horizontal Deep Maroon Gallery Rod spanning across the parchment */}
      <div className="relative mt-7 w-full" aria-hidden="true">
        <div
          className="w-full h-2.5 shadow-sm"
          style={{
            background:
              'linear-gradient(180deg, #991a3f 0%, #6b0b26 55%, #3d0414 100%)',
          }}
        />
      </div>

      {/* Hanging Bevelled Maroon Frame Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-full max-w-[440px] mx-auto px-5 select-none touch-pan-y"
        aria-roledescription="carousel"
        aria-label="Our Story Photo Carousel"
      >
        {/* Brass Hanging Ring & Braided Silk Cords */}
        <div className="relative flex flex-col items-center -mt-3.5" aria-hidden="true">
          <div className="w-5 h-5 rounded-full border-[3px] border-[#e8cf95] bg-[#f7e8d2] shadow-sm z-10" />
          <svg viewBox="0 0 220 56" className="w-52 h-14 -mt-1.5 overflow-visible" fill="none">
            <line
              x1="110"
              y1="2"
              x2="24"
              y2="56"
              stroke="#7f1232"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            <line
              x1="110"
              y1="2"
              x2="196"
              y2="56"
              stroke="#7f1232"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
          </svg>
        </div>

        {/* Thick Bevelled Royal Maroon Museum Frame */}
        <figure className="shahi-museum-frame p-3.5 sm:p-4 rounded-[3px] -mt-1 transition-all duration-500">
          {/* Ivory Museum Mat with Subtle Gold Inner Fillet */}
          <div className="bg-[#fbf4e7] p-3 sm:p-3.5 border border-[#c49746]/45 shadow-inner">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ebd9c0] border border-[#c49746]/35">
              <img
                key={activeSlide.id}
                src={activeSlide.image}
                alt={activeSlide.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-opacity duration-500"
              />
            </div>

            <figcaption className="pt-4 pb-1 px-2 text-center">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8c6323]">
                {activeSlide.subcaption}
              </p>
              <h3
                className="mt-1 text-xl font-semibold text-[#55081d]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {activeSlide.chapter}
              </h3>
              <p className="mt-1.5 text-xs sm:text-[13px] text-[#5c3931] leading-relaxed">
                {activeSlide.caption}
              </p>
            </figcaption>
          </div>
        </figure>
      </div>

      {/* Controls & Dots */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous story photo"
          className="min-w-[44px] min-h-[44px] rounded-full border border-[#c49746]/80 bg-[#fcf4e6] text-[#55081d] flex items-center justify-center shadow-xs hover:bg-[#55081d] hover:text-[#f8e6c2] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#55081d]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Story slides">
          {STORY_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`View story chapter ${idx + 1}: ${slide.chapter}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-7 bg-[#55081d]'
                  : 'w-2.5 bg-[#c49746]/55 hover:bg-[#c49746]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next story photo"
          className="min-w-[44px] min-h-[44px] rounded-full border border-[#c49746]/80 bg-[#fcf4e6] text-[#55081d] flex items-center justify-center shadow-xs hover:bg-[#55081d] hover:text-[#f8e6c2] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#55081d]"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Couple's Handwritten-Tone Note */}
      <div className="mt-9 px-6 max-w-md mx-auto text-center">
        <FloralDivider className="mb-5" />
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#8c6323]">
          A Note From Us
        </p>
        <p
          className="mt-2.5 text-base sm:text-lg italic text-[#521825] leading-relaxed"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          “{COUPLE_INFO.coupleNote}”
        </p>
      </div>
    </section>
  );
};
