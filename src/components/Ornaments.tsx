import React from 'react';
import { COUPLE_INFO } from '../data/weddingData';

interface BismillahMedallionProps {
  variant?: 'gold' | 'ivory-on-wine';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BismillahMedallion: React.FC<BismillahMedallionProps> = ({
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const isLight = variant === 'ivory-on-wine';
  const strokeColor = isLight ? '#e8cf95' : '#b28236';
  const textColor = isLight ? '#f7e4bc' : '#734818';
  const accentColor = isLight ? '#f4dca6' : '#c49746';

  const dimensions =
    size === 'sm'
      ? 'w-[216px] h-[62px]'
      : size === 'lg'
        ? 'w-[268px] h-[82px]'
        : 'w-[248px] h-[72px]';

  const textSize =
    size === 'sm'
      ? 'text-[15px]'
      : size === 'lg'
        ? 'text-[21px]'
        : 'text-[18px] sm:text-[19px]';

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div className={`relative flex items-center justify-center ${dimensions}`}>
        <svg
          viewBox="0 0 260 92"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d="M130 6 C158 6 178 16 205 18 C226 20 248 31 248 46 C248 61 226 72 205 74 C178 76 158 86 130 86 C102 86 82 76 55 74 C34 72 12 61 12 46 C12 31 34 20 55 18 C82 16 102 6 130 6 Z"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeOpacity="0.88"
          />
          <path
            d="M130 12 C155 12 174 20 199 22 C217 24 238 33 238 46 C238 59 217 68 199 70 C174 72 155 80 130 80 C105 80 86 72 61 70 C43 68 22 59 22 46 C22 33 43 24 61 22 C86 20 105 12 130 12 Z"
            stroke={strokeColor}
            strokeWidth="0.7"
            strokeOpacity="0.55"
            strokeDasharray="3 2.5"
          />
          <circle cx="130" cy="6" r="2.6" fill={accentColor} />
          <circle cx="130" cy="86" r="2.3" fill={accentColor} />
          <path
            d="M5 46 L16 42 L20 46 L16 50 Z M255 46 L244 42 L240 46 L244 50 Z"
            fill={accentColor}
            fillOpacity="0.9"
          />
        </svg>
        <span
          dir="rtl"
          lang="ar"
          style={{ fontFamily: 'var(--font-arabic)', color: textColor }}
          className={`relative z-10 ${textSize} leading-normal whitespace-nowrap tracking-normal px-6 pt-0.5 select-none`}
        >
          {COUPLE_INFO.arabicInvocation}
        </span>
      </div>
    </div>
  );
};

interface FloralDividerProps {
  variant?: 'gold' | 'light';
  className?: string;
}

/**
 * Painted Mughal Lotus & Rose Cartouche Divider inspired by Shahi Patra.
 */
export const FloralDivider: React.FC<FloralDividerProps> = ({
  variant = 'gold',
  className = '',
}) => {
  const stemColor = variant === 'light' ? '#dfb66a' : '#c19040';
  const leafColor = variant === 'light' ? '#6d8a64' : '#58744f';
  const lotusOuter = variant === 'light' ? '#d86c79' : '#c85a6a';
  const lotusInner = variant === 'light' ? '#f6c3c6' : '#f2b8bc';
  const jewelFill = variant === 'light' ? '#8c1736' : '#680d26';

  return (
    <div
      className={`flex items-center justify-center w-full max-w-[300px] mx-auto ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 42" fill="none" className="w-full h-9 overflow-visible">
        {/* Left & right golden stems */}
        <line x1="16" y1="21" x2="112" y2="21" stroke={stemColor} strokeWidth="1.2" strokeOpacity="0.85" />
        <line x1="208" y1="21" x2="304" y2="21" stroke={stemColor} strokeWidth="1.2" strokeOpacity="0.85" />

        {/* Left & right lotus bud finials */}
        <path d="M4 21 C10 16 16 17 20 21 C16 25 10 26 4 21 Z" fill={lotusOuter} stroke={stemColor} strokeWidth="0.8" />
        <path d="M316 21 C310 16 304 17 300 21 C304 25 310 26 316 21 Z" fill={lotusOuter} stroke={stemColor} strokeWidth="0.8" />

        {/* Left botanical foliage & rose */}
        <path d="M112 21 Q124 11 136 16 Q125 22 112 21 Z" fill={leafColor} fillOpacity="0.9" />
        <path d="M112 21 Q124 31 136 26 Q125 20 112 21 Z" fill={leafColor} fillOpacity="0.85" />
        <circle cx="132" cy="21" r="5.5" fill={lotusOuter} stroke={stemColor} strokeWidth="0.9" />
        <circle cx="132" cy="21" r="2.6" fill={lotusInner} />

        {/* Right botanical foliage & rose */}
        <path d="M208 21 Q196 11 184 16 Q195 22 208 21 Z" fill={leafColor} fillOpacity="0.9" />
        <path d="M208 21 Q196 31 184 26 Q195 20 208 21 Z" fill={leafColor} fillOpacity="0.85" />
        <circle cx="188" cy="21" r="5.5" fill={lotusOuter} stroke={stemColor} strokeWidth="0.9" />
        <circle cx="188" cy="21" r="2.6" fill={lotusInner} />

        {/* Central Mughal Royal Lotus Medallion */}
        <path
          d="M160 4 L175 21 L160 38 L145 21 Z"
          fill={jewelFill}
          stroke={stemColor}
          strokeWidth="1.2"
        />
        <path
          d="M160 8 C166 14 169 20 160 32 C151 20 154 14 160 8 Z"
          fill={lotusInner}
          stroke={stemColor}
          strokeWidth="0.7"
        />
        <path
          d="M160 13 C164 17 166 21 160 28 C154 21 156 17 160 13 Z"
          fill={lotusOuter}
        />
        <circle cx="160" cy="21" r="2.2" fill="#f6e0aa" />
      </svg>
    </div>
  );
};

/**
 * Horizontal Sandstone & Gold Mughal Star Ribbon Band (signature Shahi Patra section border)
 */
export const ShahiGeometricBand: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full py-1.5 border-y border-[#c49746]/70 bg-[#f5e3c8] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-around px-2">
        {Array.from({ length: 16 }).map((_, idx) => (
          <svg key={idx} width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path
              d="M7 1 L8.6 5.4 L13 7 L8.6 8.6 L7 13 L5.4 8.6 L1 7 L5.4 5.4 Z"
              fill="#c49746"
              fillOpacity="0.75"
            />
            <circle cx="7" cy="7" r="1.2" fill="#7c1631" fillOpacity="0.65" />
          </svg>
        ))}
      </div>
    </div>
  );
};

/**
 * Hand-torn Antique Deckle Parchment Edge transition
 */
export const ShahiDeckleEdge: React.FC<{ fill?: string; className?: string }> = ({
  fill = '#f7e8d2',
  className = '',
}) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 22"
      preserveAspectRatio="none"
      className={`block w-full h-5 -mt-4 relative z-20 pointer-events-none ${className}`}
    >
      <path
        d="M0 10 Q14 4 28 11 T58 9 T88 12 T120 7 T154 11 T188 8 T222 12 T256 7 T290 11 T324 8 T360 11 T400 8 L400 22 L0 22 Z"
        fill={fill}
      />
    </svg>
  );
};
