import React, { useEffect, useState } from 'react';
import { Check, Copy, Heart, Minus, Plus, Send } from 'lucide-react';
import {
  ASSETS,
  COUPLE_INFO,
  SEED_BLESSINGS,
  WEDDING_FUNCTIONS,
  type GuestBlessing,
} from '../data/weddingData';
import {
  formatRsvpShareSummary,
  validateRsvpInput,
  type RsvpValidationResult,
} from '../utils/weddingLogic';
import { ShahiDeckleEdge } from './Ornaments';

const STORAGE_KEY_RSVP = 'saifuddin_sidra_my_rsvp_v1';
const STORAGE_KEY_BLESSINGS = 'saifuddin_sidra_blessings_v1';

type EventChoice = 'yes' | 'maybe' | 'no';

interface SavedRsvp {
  guestName: string;
  contact: string;
  attending: boolean;
  guestsCount: number;
  selectedEventIds: string[];
  eventChoices?: Record<string, EventChoice>;
  dietary: string;
  message: string;
  submittedAt: string;
}

interface RsvpSectionProps {
  onRsvpSuccessBurst: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpSuccessBurst }) => {
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [eventChoices, setEventChoices] = useState<Record<string, EventChoice>>({
    'haldi-mehendi': 'maybe',
    nikaah: 'yes',
    walima: 'yes',
  });
  const [dietary, setDietary] = useState('Mughlai & Vegetarian');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<RsvpValidationResult['errors']>({});
  const [savedRsvp, setSavedRsvp] = useState<SavedRsvp | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [blessings, setBlessings] = useState<GuestBlessing[]>(SEED_BLESSINGS);

  useEffect(() => {
    try {
      const storedRsvp = window.localStorage.getItem(STORAGE_KEY_RSVP);
      if (storedRsvp) {
        const parsed = JSON.parse(storedRsvp) as SavedRsvp;
        setSavedRsvp(parsed);
        setGuestName(parsed.guestName);
        setContact(parsed.contact);
        setGuestsCount(Math.max(1, parsed.guestsCount || 1));
        if (parsed.eventChoices) {
          setEventChoices(parsed.eventChoices);
        }
        setDietary(parsed.dietary);
        setMessage(parsed.message);
      }

      const storedBlessings = window.localStorage.getItem(STORAGE_KEY_BLESSINGS);
      if (storedBlessings) {
        const parsedBlessings = JSON.parse(storedBlessings) as GuestBlessing[];
        if (Array.isArray(parsedBlessings) && parsedBlessings.length > 0) {
          setBlessings(parsedBlessings);
        }
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const setChoiceForEvent = (eventId: string, choice: EventChoice) => {
    setEventChoices((prev) => ({ ...prev, [eventId]: choice }));
    setErrors((prev) => ({ ...prev, selectedEventIds: undefined }));
  };

  const selectedEventIds = WEDDING_FUNCTIONS.filter(
    (fn) => eventChoices[fn.id] === 'yes' || eventChoices[fn.id] === 'maybe'
  ).map((fn) => fn.id);

  const attendingAny = selectedEventIds.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRsvpInput({
      guestName,
      contact,
      attending: attendingAny,
      guestsCount: attendingAny ? guestsCount : 1,
      selectedEventIds,
      dietary,
      message,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const record: SavedRsvp = {
      guestName: guestName.trim(),
      contact: contact.trim(),
      attending: attendingAny,
      guestsCount: attendingAny ? guestsCount : 0,
      selectedEventIds,
      eventChoices,
      dietary,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    setSavedRsvp(record);
    setIsEditing(false);

    const selectedTitles = WEDDING_FUNCTIONS.filter((fn) =>
      record.selectedEventIds.includes(fn.id)
    ).map((fn) => fn.title);

    const updatedBlessings: GuestBlessing[] = [
      {
        id: `guest-${Date.now()}`,
        name: record.guestName,
        attending: record.attending,
        guestsCount: record.guestsCount,
        events: selectedTitles,
        message:
          record.message ||
          (record.attending
            ? 'Joyfully looking forward to celebrating your sacred union!'
            : 'Sending our warmest duas and blessings to both families.'),
        createdAt: record.submittedAt,
      },
      ...blessings.filter((b) => b.name.toLowerCase() !== record.guestName.toLowerCase()),
    ];

    setBlessings(updatedBlessings);

    try {
      window.localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(record));
      window.localStorage.setItem(STORAGE_KEY_BLESSINGS, JSON.stringify(updatedBlessings));
    } catch {
      // Ignore storage failures
    }

    onRsvpSuccessBurst();
  };

  const handleCopySummary = async () => {
    if (!savedRsvp) return;
    const titles = WEDDING_FUNCTIONS.filter((fn) =>
      savedRsvp.selectedEventIds.includes(fn.id)
    ).map((fn) => fn.title);
    const summary = formatRsvpShareSummary(
      savedRsvp.guestName,
      savedRsvp.attending,
      savedRsvp.guestsCount,
      titles,
      savedRsvp.message
    );
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(summary);
      }
    } catch {
      // Ignore clipboard error
    }
    setCopiedSummary(true);
    window.setTimeout(() => setCopiedSummary(false), 2600);
  };

  const showConfirmation = savedRsvp !== null && !isEditing;

  return (
    <section id="rsvp" aria-labelledby="rsvp-heading" className="relative w-full">
      {/* SHAHI PATRA SIGNATURE: Painted Sunset Palace Courtyard Easel Frame */}
      <div className="relative w-full aspect-[9/14] max-h-[760px] overflow-hidden bg-[#f2dfc4]">
        <img
          src={ASSETS.royalEaselCourtyard}
          alt="Royal Mughal palace courtyard with an ornate floral easel at sunset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />

        {/* Typography gracefully lettered directly onto the blank parchment canvas inside the easel */}
        <div className="pointer-events-none absolute inset-x-0 top-[44%] -translate-y-1/2 flex flex-col items-center justify-center px-16 sm:px-24 text-center">
          <p
            className="text-[22px] sm:text-[26px] leading-snug italic font-medium text-[#5a0d22] max-w-[180px] sm:max-w-[215px]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Your Presence Means the World to Us
          </p>
          <span className="mt-3 block w-10 h-px bg-[#c49746]/80" aria-hidden="true" />
          <p className="mt-2.5 text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-[#7b4c22] max-w-[175px]">
            {COUPLE_INFO.closingFamilies}
          </p>
        </div>
      </div>

      {/* Hand-torn antique deckle parchment edge into the RSVP Card */}
      <ShahiDeckleEdge fill="#f7e8d2" />

      <div className="shahi-parchment w-full pt-8 pb-16 px-4 sm:px-7 flex flex-col items-center">
        {/* Clean White/Ivory Shahi Patra RSVP Card */}
        <div className="w-full max-w-[440px] rounded-[24px] bg-[#fffcf7] border border-[#c49746]/55 shadow-[0_22px_48px_-22px_rgba(71,7,24,0.28)] p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#c49746]/65" aria-hidden="true" />
              <h2
                id="rsvp-heading"
                className="text-2xl sm:text-[27px] font-semibold text-[#470718]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Your Presence Matters
              </h2>
              <span className="h-px w-8 bg-[#c49746]/65" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs sm:text-[13px] text-[#6e524b] leading-relaxed">
              Let us know so both families can make the arrangements just right.
            </p>
          </div>

          {showConfirmation && savedRsvp ? (
            <div className="text-center py-2" data-testid="rsvp-confirmation">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#470718] text-[#f5e1b8] flex items-center justify-center shadow-sm">
                <Check className="w-6 h-6" />
              </div>

              <p className="mt-4 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#8c6323]">
                RSVP Confirmed
              </p>
              <h3
                className="mt-1.5 text-2xl font-semibold text-[#55081d]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Shukriya, {savedRsvp.guestName}
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#573a34] leading-relaxed">
                {savedRsvp.attending
                  ? `We are delighted to reserve seats for ${savedRsvp.guestsCount} ${
                      savedRsvp.guestsCount === 1 ? 'guest' : 'guests'
                    }.`
                  : 'Thank you for letting us know. Your warm prayers mean the world to us.'}
              </p>

              {savedRsvp.attending && savedRsvp.selectedEventIds.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#c49746]/35 text-xs text-[#593830] space-y-1">
                  <p className="font-semibold text-[#8c6323] uppercase tracking-[0.14em] text-[10px]">
                    Selected Celebrations
                  </p>
                  <p className="font-semibold text-[#55081d]">
                    {WEDDING_FUNCTIONS.filter((fn) =>
                      savedRsvp.selectedEventIds.includes(fn.id)
                    )
                      .map((fn) => fn.shortTitle)
                      .join(' · ')}
                  </p>
                  <p className="text-[#6e524b]">Hospitality: {savedRsvp.dietary}</p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#470718] text-[#f8e6c2] text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#5e0b22] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#e6c88a]" />
                      <span>RSVP Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#e6c88a]" />
                      <span>Copy RSVP Summary</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#c49746]/80 text-[#55081d] text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#f7e8d2] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Edit RSVP
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="rsvp-guest-name"
                  className="block text-xs font-medium uppercase tracking-[0.14em] text-[#785143] mb-1.5"
                >
                  Full Name <span className="text-[#55081d]">*</span>
                </label>
                <input
                  id="rsvp-guest-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (errors.guestName) setErrors((prev) => ({ ...prev, guestName: undefined }));
                  }}
                  placeholder="e.g. Amina & Danish Rahman"
                  aria-invalid={Boolean(errors.guestName)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#fcf6ec] border border-[#c49746]/55 text-sm text-[#3c141c] placeholder:text-[#9c8277] focus:outline-none focus:border-[#55081d] focus:ring-2 focus:ring-[#55081d]/15"
                />
                {errors.guestName && (
                  <p role="alert" className="mt-1.5 text-xs text-[#9b1c2e]">
                    {errors.guestName}
                  </p>
                )}
              </div>

              {/* Phone or Email */}
              <div>
                <label
                  htmlFor="rsvp-contact"
                  className="block text-xs font-medium uppercase tracking-[0.14em] text-[#785143] mb-1.5"
                >
                  Phone or Email <span className="text-[#55081d]">*</span>
                </label>
                <input
                  id="rsvp-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (errors.contact) setErrors((prev) => ({ ...prev, contact: undefined }));
                  }}
                  placeholder="+91 98300 00000 or name@email.com"
                  aria-invalid={Boolean(errors.contact)}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#fcf6ec] border border-[#c49746]/55 text-sm text-[#3c141c] placeholder:text-[#9c8277] focus:outline-none focus:border-[#55081d] focus:ring-2 focus:ring-[#55081d]/15"
                />
                {errors.contact && (
                  <p role="alert" className="mt-1.5 text-xs text-[#9b1c2e]">
                    {errors.contact}
                  </p>
                )}
              </div>

              {/* Guest Count & Dining Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[#785143] mb-1.5">
                    How many are coming?
                  </span>
                  <div className="flex items-center justify-between min-h-[44px] px-2 rounded-xl bg-[#fcf6ec] border border-[#c49746]/55">
                    <button
                      type="button"
                      onClick={() => setGuestsCount((c) => Math.max(1, c - 1))}
                      aria-label="Decrease guest count"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#55081d] hover:bg-[#55081d]/10 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span
                      data-testid="guest-count-value"
                      className="text-sm font-semibold text-[#3c141c] tabular-nums"
                    >
                      {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount((c) => Math.min(12, c + 1))}
                      aria-label="Increase guest count"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#55081d] hover:bg-[#55081d]/10 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rsvp-dietary"
                    className="block text-xs font-medium uppercase tracking-[0.14em] text-[#785143] mb-1.5"
                  >
                    Dining Preference
                  </label>
                  <select
                    id="rsvp-dietary"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#fcf6ec] border border-[#c49746]/55 text-sm text-[#3c141c] focus:outline-none focus:border-[#55081d]"
                  >
                    <option value="Mughlai & Vegetarian">Mughlai &amp; Vegetarian</option>
                    <option value="Traditional Non-Vegetarian">Traditional Non-Vegetarian</option>
                    <option value="Pure Vegetarian">Pure Vegetarian</option>
                  </select>
                </div>
              </div>

              {/* Shahi Patra Style Per-Event Yes / Maybe / No Rows */}
              <fieldset>
                <legend className="block text-xs font-medium uppercase tracking-[0.14em] text-[#785143] mb-2">
                  Event Schedule · Which celebrations will you join?
                </legend>
                <div className="space-y-2.5">
                  {WEDDING_FUNCTIONS.map((fn) => {
                    const current = eventChoices[fn.id] ?? 'no';
                    return (
                      <div
                        key={fn.id}
                        className="rounded-xl bg-[#fcf6ec] border border-[#c49746]/45 px-3.5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                      >
                        <div>
                          <span className="block text-sm font-semibold text-[#470718]">
                            {fn.shortTitle}
                          </span>
                          <span className="block text-[11px] text-[#785143]">
                            {fn.shortDate}
                          </span>
                        </div>

                        <div
                          role="radiogroup"
                          aria-label={`Attendance for ${fn.shortTitle}`}
                          className="inline-flex items-center gap-1 bg-[#f0e0c9] p-1 rounded-lg self-start sm:self-auto"
                        >
                          {(['yes', 'maybe', 'no'] as EventChoice[]).map((option) => {
                            const selected = current === option;
                            const label =
                              option === 'yes' ? 'Yes' : option === 'maybe' ? 'Maybe' : 'No';
                            return (
                              <button
                                key={option}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => setChoiceForEvent(fn.id, option)}
                                className={`min-h-[34px] px-3 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                  selected
                                    ? 'bg-[#470718] text-[#f8e6c2] shadow-xs'
                                    : 'text-[#623d34] hover:text-[#470718]'
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>

              {/* Personal Dua / Blessing Message */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-xs font-medium uppercase tracking-[0.14em] text-[#785143] mb-1.5"
                >
                  Blessings &amp; Duas for the Couple (Optional)
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a warm wish or dua for Dr. Saifuddin & Sidra…"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#fcf6ec] border border-[#c49746]/55 text-sm text-[#3c141c] placeholder:text-[#9c8277] focus:outline-none focus:border-[#55081d] focus:ring-2 focus:ring-[#55081d]/15 resize-none"
                />
              </div>

              <div className="pt-1 flex items-center gap-3">
                <button
                  type="submit"
                  className="shahi-cartouche-btn flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 text-[#f8e6c2] text-xs font-semibold tracking-[0.18em] uppercase active:scale-[0.98] transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#470718]"
                >
                  <Send className="w-3.5 h-3.5 text-[#e6c88a]" />
                  <span>Send RSVP &amp; Blessings</span>
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="min-h-[48px] px-4 rounded-full border border-[#c49746]/80 text-xs font-medium text-[#55081d] hover:bg-[#f2e2ca] cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Warm Wishes & Duas Guestbook Wall */}
        <div className="mt-10 w-full max-w-[440px]">
          <div className="flex items-center justify-between px-1 mb-3">
            <h3
              className="text-lg font-semibold text-[#55081d] flex items-center gap-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              <Heart className="w-4 h-4 text-[#b28236]" />
              <span>Warm Wishes &amp; Duas</span>
            </h3>
            <span className="text-xs text-[#785143] tabular-nums">
              {blessings.length} {blessings.length === 1 ? 'note' : 'notes'}
            </span>
          </div>

          <div className="space-y-3" data-testid="blessings-list">
            {blessings.slice(0, 5).map((item) => (
              <article
                key={item.id}
                className="rounded-2xl bg-[#fcf6ec]/95 border border-[#c49746]/45 px-5 py-4"
              >
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[#55081d]">{item.name}</p>
                  <span className="text-[11px] text-[#8c6323]">
                    {item.attending
                      ? `Attending · ${item.guestsCount} ${item.guestsCount === 1 ? 'guest' : 'guests'}`
                      : 'Sending Duas'}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-[13px] text-[#55342c] leading-relaxed">
                  “{item.message}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
