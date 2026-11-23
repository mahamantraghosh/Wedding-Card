export interface DressCodeSwatch {
  name: string;
  hex: string;
}

export interface WeddingFunction {
  id: 'haldi-mehendi' | 'nikaah' | 'walima';
  title: string;
  shortTitle: string;
  subtitle: string;
  dayDate: string;
  shortDate: string;
  time: string;
  startIso: string;
  endIso: string;
  venueName: string;
  address: string;
  landmark?: string;
  mapsUrl: string;
  dressCode: string;
  swatches: DressCodeSwatch[];
  sceneImage: string;
  iconType: 'haldi' | 'nikaah' | 'walima';
  mapVenueId?: 'ojas' | 'ganpati';
}

export interface StorySlide {
  id: string;
  chapter: string;
  caption: string;
  subcaption: string;
  image: string;
  alt: string;
}

export interface VenueLocation {
  id: 'ojas' | 'ganpati';
  ceremonyLabel: string;
  dateLabel: string;
  name: string;
  shortName: string;
  fullAddress: string;
  landmarkNote: string;
  neighborhood: string;
  mapsUrl: string;
  pinX: number;
  pinY: number;
  routePath: string;
  travelTip: string;
}

export interface GuestBlessing {
  id: string;
  name: string;
  attending: boolean;
  guestsCount: number;
  events: string[];
  message: string;
  createdAt: string;
}

export const ASSETS = {
  heroArchGarden: '/src/assets/images/hero_arch_garden_1795432269575.jpg',
  sceneHaldiMehendi: '/src/assets/images/scene_haldi_mehendi_1795431929542.jpg',
  sceneNikaah: '/src/assets/images/scene_nikaah_ceremony_1795431939140.jpg',
  sceneWalima: '/src/assets/images/scene_walima_reception_1795431930879.jpg',
  storyGarden: '/src/assets/images/story_journey_garden_1795431930357.jpg',
  royalPalaceHero: '/src/assets/images/royal_palace_hero_1795435149176.jpg',
  royalDoorElephant: '/src/assets/images/royal_door_elephant_1795435143099.jpg',
  royalFountainPavilion: '/src/assets/images/royal_fountain_pavilion_1795435122775.jpg',
  royalEaselCourtyard: '/src/assets/images/royal_easel_courtyard_1795435129987.jpg',
  royalLotusSprig: '/src/assets/images/royal_lotus_sprig_1795435415566.jpg',
  printCardPdf: '/assets/aistudio/Wedding_Card_2_acd82a93.pdf',
} as const;

export const COUPLE_INFO = {
  arabicInvocation: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  invocationEnglish: 'With the blessings of Allah Almighty,',
  togetherLine: 'Together with their families,',
  groomName: 'Dr. Saifuddin Alam',
  groomParentsPrefix: 'Son of',
  groomParents: 'Dr. Md. Qaiser Alam & Shabnam Perveen',
  brideName: 'Sidra Ahmed',
  brideParentsPrefix: 'Daughter of',
  brideParents: 'Late Shakeel Ahmed & Khurshida Perveen',
  inviteLine:
    'Cordially invite you to be a part of their sacred union and bless their journey together.',
  closingHeading: "We can't wait to celebrate with you",
  closingFamilies: 'With love, the Alam & Ahmed families',
  weddingDateDisplay: 'Friday, 26th March 2027',
  weddingTargetIso: '2027-03-26T20:00:00+05:30',
  celebrationDatesLine: '25 · 26 · 29 March 2027 · Kolkata',
  coupleNote:
    'Inshallah, as two families unite in prayer, joy, and gratitude, your presence and heartfelt duas are the greatest gift we could ask for.',
};

export const WEDDING_FUNCTIONS: WeddingFunction[] = [
  {
    id: 'haldi-mehendi',
    title: 'Haldi & Mehendi',
    shortTitle: 'Haldi & Mehendi',
    subtitle: 'An evening of marigolds, henna & laughter',
    dayDate: 'Thursday, 25th March 2027',
    shortDate: '25 Mar · 7:00 PM',
    time: '7:00 PM onwards',
    startIso: '2027-03-25T19:00:00+05:30',
    endIso: '2027-03-25T23:00:00+05:30',
    venueName: 'Family Residence',
    address: 'Kolkata, West Bengal',
    landmark: 'Intimate family gathering',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ballygunge+Kolkata+West+Bengal',
    dressCode: 'Festive Yellow & Mehendi Green',
    swatches: [
      { name: 'Marigold', hex: '#E3A426' },
      { name: 'Emerald', hex: '#2E6F4E' },
    ],
    sceneImage: ASSETS.sceneHaldiMehendi,
    iconType: 'haldi',
  },
  {
    id: 'nikaah',
    title: 'Baraat & Nikaah Ceremony',
    shortTitle: 'Nikaah Ceremony',
    subtitle: 'Inshallah · Arrival of Baraat & Sacred Nikaah',
    dayDate: 'Friday, 26th March 2027',
    shortDate: '26 Mar · 8:00 PM',
    time: '8:00 PM onwards',
    startIso: '2027-03-26T20:00:00+05:30',
    endIso: '2027-03-26T23:59:00+05:30',
    venueName: 'Ojas Banquets, 3rd Floor',
    address: 'Haute Street, Mahindra Showroom Building, Topsia Road, Kolkata – 700046',
    landmark: 'Haute Street · Mahindra Showroom Building',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ojas+Banquets+Haute+Street+Topsia+Road+Kolkata+700046',
    dressCode: 'Traditional Festive · Wine & Gold',
    swatches: [
      { name: 'Wine', hex: '#6E1F2F' },
      { name: 'Champagne Gold', hex: '#C69F59' },
    ],
    sceneImage: ASSETS.sceneNikaah,
    iconType: 'nikaah',
    mapVenueId: 'ojas',
  },
  {
    id: 'walima',
    title: 'Grand Walima Reception',
    shortTitle: 'Walima Reception',
    subtitle: 'An evening banquet of grace, gratitude & celebration',
    dayDate: 'Monday, 29th March 2027',
    shortDate: '29 Mar · 8:00 PM',
    time: '8:00 PM onwards',
    startIso: '2027-03-29T20:00:00+05:30',
    endIso: '2027-03-29T23:59:00+05:30',
    venueName: 'Ganpati Banquets',
    address:
      '27, Ballygunge Park Road, Beside Haldiram Ballygunge, Near Calcutta Ice Skating Ring, Kolkata – 700019',
    landmark: 'Beside Haldiram Ballygunge · Near Calcutta Ice Skating Ring',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ganpati+Banquets+27+Ballygunge+Park+Road+Kolkata+700019',
    dressCode: 'Formal Ethnic · Evening Elegance',
    swatches: [
      { name: 'Deep Wine', hex: '#5A1625' },
      { name: 'Ivory Gold', hex: '#E3C996' },
    ],
    sceneImage: ASSETS.sceneWalima,
    iconType: 'walima',
    mapVenueId: 'ganpati',
  },
];

export const STORY_SLIDES: StorySlide[] = [
  {
    id: 'chapter-1',
    chapter: 'Written in Destiny',
    caption: 'Some bonds begin with a quiet prayer and blossom into a lifetime.',
    subcaption: 'Chapter I · Blessings of Two Families',
    image: ASSETS.storyGarden,
    alt: 'Twilight rose courtyard garden with golden brass lanterns',
  },
  {
    id: 'chapter-2',
    chapter: 'Colors of Joy',
    caption: 'Marigolds, fragrant henna, and songs shared with the ones who raised us.',
    subcaption: 'Chapter II · 25th March · Haldi & Mehendi',
    image: ASSETS.sceneHaldiMehendi,
    alt: 'Haldi and Mehendi ceremony illustration with marigolds and brass bowls',
  },
  {
    id: 'chapter-3',
    chapter: 'The Sacred Qubool Hai',
    caption: 'Under warm lanterns and floral arches, two souls begin their forever.',
    subcaption: 'Chapter III · 26th March · Nikaah at Ojas Banquets',
    image: ASSETS.sceneNikaah,
    alt: 'Mughal arch Nikaah pavilion illuminated with lanterns at night',
  },
  {
    id: 'chapter-4',
    chapter: 'A Feast of Gratitude',
    caption: 'Raising a celebration of love, warmth, and togetherness in Kolkata.',
    subcaption: 'Chapter IV · 29th March · Walima at Ganpati Banquets',
    image: ASSETS.sceneWalima,
    alt: 'Grand Walima banquet hall with crystal chandeliers and white doves',
  },
];

export const VENUE_LOCATIONS: VenueLocation[] = [
  {
    id: 'ojas',
    ceremonyLabel: 'Baraat & Nikaah Ceremony',
    dateLabel: 'Friday, 26th March 2027 · 8:00 PM onwards',
    name: 'Ojas Banquets, 3rd Floor',
    shortName: 'Ojas Banquets',
    fullAddress:
      'Ojas Banquets, 3rd Floor, Haute Street, Mahindra Showroom Building, Topsia Road, Kolkata – 700046',
    landmarkNote: 'Above Mahindra Showroom on Topsia Road (near Science City / Park Circus connector)',
    neighborhood: 'Topsia Road, Kolkata',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ojas+Banquets+Haute+Street+Topsia+Road+Kolkata+700046',
    pinX: 298,
    pinY: 96,
    routePath: 'M 72 214 C 135 204, 178 164, 212 142 C 244 120, 268 112, 298 96',
    travelTip: 'Valet & lift access directly to 3rd Floor Haute Street',
  },
  {
    id: 'ganpati',
    ceremonyLabel: 'Grand Walima Reception',
    dateLabel: 'Monday, 29th March 2027 · 8:00 PM onwards',
    name: 'Ganpati Banquets',
    shortName: 'Ganpati Banquets',
    fullAddress:
      'Ganpati Banquets, 27, Ballygunge Park Road, Beside Haldiram Ballygunge, Near Calcutta Ice Skating Ring, Kolkata – 700019',
    landmarkNote: 'Beside Haldiram Ballygunge, steps from Calcutta Ice Skating Ring',
    neighborhood: 'Ballygunge, Kolkata',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Ganpati+Banquets+27+Ballygunge+Park+Road+Kolkata+700019',
    pinX: 146,
    pinY: 162,
    routePath: 'M 72 214 C 95 205, 114 190, 128 178 C 136 171, 141 166, 146 162',
    travelTip: 'Easy access from Park Circus & Ballygunge Circular Road',
  },
];

export const SEED_BLESSINGS: GuestBlessing[] = [
  {
    id: 'seed-1',
    name: 'Dr. Tariq & Farhana Siddiqui',
    attending: true,
    guestsCount: 3,
    events: ['Baraat & Nikaah Ceremony', 'Grand Walima Reception'],
    message:
      'Barakallahu lakuma wa baraka alaikuma! Wishing Saifuddin and Sidra a lifetime filled with peace, barakah, and endless smiles.',
    createdAt: '2026-11-18T14:20:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'Zoya & Imran Merchant',
    attending: true,
    guestsCount: 2,
    events: ['Haldi & Mehendi', 'Baraat & Nikaah Ceremony', 'Grand Walima Reception'],
    message:
      'Counting down the days to Kolkata in March! So overjoyed to celebrate with both the Alam and Ahmed families.',
    createdAt: '2026-11-20T09:15:00.000Z',
  },
];
