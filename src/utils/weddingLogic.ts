import type { WeddingFunction } from '../data/weddingData';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export interface RsvpFormInput {
  guestName: string;
  contact: string;
  attending: boolean;
  guestsCount: number;
  selectedEventIds: string[];
  dietary: string;
  message: string;
}

export interface RsvpValidationResult {
  valid: boolean;
  errors: {
    guestName?: string;
    contact?: string;
    selectedEventIds?: string;
    guestsCount?: string;
  };
}

/**
 * Computes remaining days, hours, minutes, and seconds to a target ISO timestamp.
 */
export function calculateCountdown(targetIso: string, nowMs: number = Date.now()): CountdownParts {
  const targetMs = new Date(targetIso).getTime();
  if (Number.isNaN(targetMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast: false };
}

/**
 * Formats an integer to at least two digits (e.g. 7 -> "07").
 */
export function padTwo(value: number): string {
  return String(Math.max(0, Math.floor(value))).padStart(2, '0');
}

/**
 * Wraps a carousel index infinitely in either direction.
 */
export function wrapCarouselIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

/**
 * Computes shortest signed circular offset between an item index and the active index.
 */
export function circularOffset(index: number, activeIndex: number, total: number): number {
  if (total <= 1) return 0;
  let diff = index - activeIndex;
  const half = total / 2;
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}

/**
 * Validates RSVP form submission without bypassing empty required inputs.
 */
export function validateRsvpInput(input: RsvpFormInput): RsvpValidationResult {
  const errors: RsvpValidationResult['errors'] = {};

  const trimmedName = input.guestName.trim();
  if (trimmedName.length < 2) {
    errors.guestName = 'Please enter your full name (at least 2 characters).';
  }

  const trimmedContact = input.contact.trim();
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
  const digitsOnly = trimmedContact.replace(/\D/g, '');
  const looksLikePhone = digitsOnly.length >= 7 && digitsOnly.length <= 15;

  if (!trimmedContact) {
    errors.contact = 'Please enter a phone number or email address.';
  } else if (!looksLikeEmail && !looksLikePhone) {
    errors.contact = 'Please provide a valid phone number or email address.';
  }

  if (input.attending) {
    if (input.selectedEventIds.length === 0) {
      errors.selectedEventIds = 'Please select at least one celebration you plan to attend.';
    }
    if (!Number.isInteger(input.guestsCount) || input.guestsCount < 1 || input.guestsCount > 12) {
      errors.guestsCount = 'Guest count must be between 1 and 12.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function formatIcsUtcDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = padTwo(date.getUTCMonth() + 1);
  const day = padTwo(date.getUTCDate());
  const hours = padTwo(date.getUTCHours());
  const minutes = padTwo(date.getUTCMinutes());
  const seconds = padTwo(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generates an RFC 5545 .ics calendar payload containing all wedding ceremonies.
 */
export function generateWeddingIcs(events: WeddingFunction[]): string {
  const stamp = formatIcsUtcDate('2026-11-23T00:00:00Z');
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Alam & Ahmed Families//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const fn of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${fn.id}-saifuddin-sidra-2027@wedding.local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatIcsUtcDate(fn.startIso)}`,
      `DTEND:${formatIcsUtcDate(fn.endIso)}`,
      `SUMMARY:${escapeIcsText(`Dr. Saifuddin Alam & Sidra Ahmed — ${fn.title}`)}`,
      `LOCATION:${escapeIcsText(`${fn.venueName}, ${fn.address}`)}`,
      `DESCRIPTION:${escapeIcsText(`${fn.subtitle}. Dress code: ${fn.dressCode}. Directions: ${fn.mapsUrl}`)}`,
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Formats an RSVP confirmation message ready to copy or share with the families.
 */
export function formatRsvpShareSummary(
  guestName: string,
  attending: boolean,
  guestsCount: number,
  eventTitles: string[],
  message: string
): string {
  if (!attending) {
    return `Assalamu Alaikum! RSVP for Dr. Saifuddin Alam & Sidra Ahmed's Wedding — ${guestName} sends warm duas and regretfully won't be able to attend in person.${message ? ` Note: "${message}"` : ''}`;
  }
  return `Assalamu Alaikum! RSVP for Dr. Saifuddin Alam & Sidra Ahmed's Wedding — ${guestName} (${guestsCount} ${guestsCount === 1 ? 'guest' : 'guests'}) joyfully accepts for: ${eventTitles.join(', ')}.${message ? ` Dua: "${message}"` : ''}`;
}
