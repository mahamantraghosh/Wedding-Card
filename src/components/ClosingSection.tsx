import React from 'react';
import { DoorOpen, FileText } from 'lucide-react';
import { ASSETS, COUPLE_INFO } from '../data/weddingData';
import { BismillahMedallion, FloralDivider, ShahiGeometricBand } from './Ornaments';

interface ClosingSectionProps {
  onReplayBook: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplayBook }) => {
  return (
    <div id="closing">
      <ShahiGeometricBand />
      <footer
        aria-label="Closing Blessings and Families"
        className="shahi-maroon-damask relative w-full py-14 px-5 sm:px-8 text-center flex flex-col items-center text-[#f7e4bc]"
      >
        <BismillahMedallion variant="ivory-on-wine" size="md" />

        <h2
          className="mt-5 text-3xl sm:text-4xl font-semibold text-[#fae7c2] max-w-md leading-snug text-balance"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {COUPLE_INFO.closingHeading}
        </h2>

        <FloralDivider variant="light" className="mt-4 max-w-[210px]" />

        <p
          className="mt-5 text-lg sm:text-xl italic text-[#f5dfb3]"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {COUPLE_INFO.closingFamilies}
        </p>

        <p className="mt-2 text-xs tracking-[0.18em] uppercase text-[#e6c88a]/85">
          {COUPLE_INFO.celebrationDatesLine}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={ASSETS.printCardPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#f5e1b8] text-[#470718] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#fbf0d7] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e1b8]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Print Card (PDF)</span>
          </a>

          <button
            type="button"
            onClick={onReplayBook}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#e6c88a]/75 bg-transparent text-[#fae7c2] text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#e6c88a]/15 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5e1b8]"
          >
            <DoorOpen className="w-3.5 h-3.5 text-[#e6c88a]" />
            <span>Replay Royal Doors</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
