import test from 'node:test';
import assert from 'node:assert/strict';
import { WEDDING_FUNCTIONS } from '../data/weddingData';
import {
  calculateCountdown,
  circularOffset,
  formatRsvpShareSummary,
  generateWeddingIcs,
  padTwo,
  validateRsvpInput,
  wrapCarouselIndex,
} from './weddingLogic';

test('calculateCountdown accurately splits days, hours, minutes, seconds before Nikaah', () => {
  const target = '2027-03-26T20:00:00+05:30';
  const targetMs = new Date(target).getTime();
  // Exactly 10 days, 5 hours, 30 minutes, 15 seconds earlier
  const nowMs = targetMs - (10 * 86400 + 5 * 3600 + 30 * 60 + 15) * 1000;
  const result = calculateCountdown(target, nowMs);

  assert.deepEqual(result, {
    days: 10,
    hours: 5,
    minutes: 30,
    seconds: 15,
    isPast: false,
  });
});

test('calculateCountdown clamps cleanly to zeros when target date has passed', () => {
  const target = '2027-03-26T20:00:00+05:30';
  const afterMs = new Date(target).getTime() + 60_000;
  assert.deepEqual(calculateCountdown(target, afterMs), {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: true,
  });
});

test('wrapCarouselIndex and circularOffset loop seamlessly across ceremonies', () => {
  assert.equal(wrapCarouselIndex(0, -1, 3), 2);
  assert.equal(wrapCarouselIndex(2, 1, 3), 0);
  assert.equal(wrapCarouselIndex(1, 2, 3), 0);
  assert.equal(circularOffset(2, 0, 3), -1);
  assert.equal(circularOffset(0, 2, 3), 1);
  assert.equal(padTwo(4), '04');
});

test('validateRsvpInput rejects empty fields and missing events when attending', () => {
  const emptyResult = validateRsvpInput({
    guestName: '  ',
    contact: '',
    attending: true,
    guestsCount: 2,
    selectedEventIds: [],
    dietary: 'Both',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.guestName);
  assert.ok(emptyResult.errors.contact);
  assert.ok(emptyResult.errors.selectedEventIds);
});

test('validateRsvpInput accepts valid attending and declining submissions', () => {
  const attendingOk = validateRsvpInput({
    guestName: 'Amina Rahman',
    contact: '+91 98300 12345',
    attending: true,
    guestsCount: 3,
    selectedEventIds: ['nikaah', 'walima'],
    dietary: 'Non-Vegetarian',
    message: 'Mubarak to both families!',
  });
  assert.equal(attendingOk.valid, true);
  assert.deepEqual(attendingOk.errors, {});

  const decliningOk = validateRsvpInput({
    guestName: 'Rehan Kabir',
    contact: 'rehan@example.com',
    attending: false,
    guestsCount: 1,
    selectedEventIds: [],
    dietary: 'Both',
    message: 'Sending our warmest duas from London.',
  });
  assert.equal(decliningOk.valid, true);
});

test('generateWeddingIcs includes all three ceremonies and authentic Kolkata venues', () => {
  const ics = generateWeddingIcs(WEDDING_FUNCTIONS);
  assert.ok(ics.startsWith('BEGIN:VCALENDAR'));
  assert.ok(ics.endsWith('END:VCALENDAR'));
  assert.match(ics, /Haldi & Mehendi/);
  assert.match(ics, /Baraat & Nikaah Ceremony/);
  assert.match(ics, /Grand Walima Reception/);
  assert.match(ics, /Ojas Banquets/);
  assert.match(ics, /Ganpati Banquets/);
  assert.match(ics, /Topsia Road/);
  assert.match(ics, /Ballygunge Park Road/);
});

test('formatRsvpShareSummary produces natural confirmation text', () => {
  const summary = formatRsvpShareSummary(
    'Amina Rahman',
    true,
    2,
    ['Baraat & Nikaah Ceremony', 'Grand Walima Reception'],
    'Mubarak!'
  );
  assert.match(summary, /Amina Rahman \(2 guests\)/);
  assert.match(summary, /Baraat & Nikaah Ceremony, Grand Walima Reception/);
});
