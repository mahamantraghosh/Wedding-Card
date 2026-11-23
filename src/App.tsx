import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ClosingSection } from './components/ClosingSection';
import { FestivitiesCarousel } from './components/FestivitiesCarousel';
import { HeroPage } from './components/HeroPage';
import { PetalCanvas } from './components/PetalCanvas';
import { RsvpSection } from './components/RsvpSection';
import { SaveTheDateScroll } from './components/SaveTheDateScroll';
import { StoryCarousel } from './components/StoryCarousel';
import { VelvetBookIntro } from './components/VelvetBookIntro';
import { VenueMapSection } from './components/VenueMapSection';
import { WalimaFeatureCard } from './components/WalimaFeatureCard';
import { weddingAudio } from './utils/audioEngine';

const NAV_CHAPTERS = [
  { id: 'invitation-hero', label: 'Palace Welcome' },
  { id: 'families', label: 'The Families' },
  { id: 'save-the-date', label: 'Save the Date' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'festivities', label: 'Ceremonies' },
  { id: 'grand-reception', label: 'Walima' },
  { id: 'locations', label: 'Locations' },
  { id: 'rsvp', label: 'RSVP' },
];

export default function App() {
  const autostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [bookDismissed, setBookDismissed] = useState(autostart);
  const [inviteRevealed, setInviteRevealed] = useState(autostart);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeVenueId, setActiveVenueId] = useState<'ojas' | 'ganpati'>('ojas');
  const [docHidden, setDocHidden] = useState(false);
  const [burstState, setBurstState] = useState<{
    nonce: number;
    type: 'petals' | 'celebration';
  }>({ nonce: 0, type: 'petals' });

  useEffect(() => {
    const onVisibility = () => {
      setDocHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const triggerBurst = (type: 'petals' | 'celebration') => {
    setBurstState((prev) => ({ nonce: prev.nonce + 1, type }));
  };

  const handleBookOpenStart = () => {
    setInviteRevealed(true);
    triggerBurst('petals');
    weddingAudio.playWithFadeIn().then((started) => {
      setIsMusicPlaying(started);
    });
  };

  const handleBookOpenComplete = () => {
    setBookDismissed(true);
  };

  const handleToggleMusic = async () => {
    const playing = await weddingAudio.toggle();
    setIsMusicPlaying(playing);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectVenueOnMap = (venueId: 'ojas' | 'ganpati') => {
    setActiveVenueId(venueId);
    scrollToSection('locations');
  };

  const handleReplayBook = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setBookDismissed(false);
    setInviteRevealed(false);
  };

  return (
    <div
      data-invitation-state={bookDismissed ? 'opened' : 'cover'}
      className={`shahi-maroon-damask relative min-h-screen w-full overflow-x-clip ${
        docHidden ? 'anim-paused' : ''
      }`}
    >
      {/* Pre-cached offscreen rose petals & gold confetti burst canvas */}
      <PetalCanvas
        burstNonce={burstState.nonce}
        burstType={burstState.type}
        ambientActive={bookDismissed}
      />

      {/* 1. Shahi Patra Royal Palace Double Doors Opening */}
      {!bookDismissed && (
        <VelvetBookIntro
          onOpenStart={handleBookOpenStart}
          onOpenComplete={handleBookOpenComplete}
        />
      )}

      {/* Discreet Top-Right White Circular Audio Toggle (Shahi Patra Signature) */}
      <div className="fixed top-3.5 right-3.5 z-[60]">
        <button
          type="button"
          onClick={handleToggleMusic}
          aria-label={isMusicPlaying ? 'Mute wedding music' : 'Play wedding music'}
          aria-pressed={isMusicPlaying}
          className="min-w-[44px] min-h-[44px] rounded-full bg-[#fcf4e6]/95 text-[#470718] border border-[#c49746]/80 shadow-lg flex items-center justify-center hover:bg-[#470718] hover:text-[#f8e6c2] active:scale-[0.96] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6c88a]"
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Desktop Discreet Gold Chapter Navigation Rail on Imperial Maroon Damask Backdrop */}
      {bookDismissed && (
        <nav
          aria-label="Invitation sections"
          className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-3"
        >
          {NAV_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollToSection(chapter.id)}
              className="group flex items-center gap-2.5 text-left text-[11px] font-medium tracking-[0.18em] uppercase text-[#e6c88a]/80 hover:text-[#fff3d6] transition-colors cursor-pointer py-1"
            >
              <span className="w-3 h-px bg-[#c49746]/70 group-hover:w-5 group-hover:bg-[#f8e6c2] transition-all" />
              <span className="whitespace-nowrap">{chapter.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Centered Royal Shahi Patra Scroll (full-bleed on mobile, framed elegantly on desktop) */}
      <main className="relative z-10 w-full max-w-[540px] mx-auto shahi-parchment shadow-[0_0_90px_rgba(14,1,5,0.72)] lg:border-x lg:border-[#c49746]/45">
        {/* 2. Full-Bleed Sunset Palace Courtyard Hero + Royal Families + Fountain Vignette */}
        <HeroPage
          isOpened={inviteRevealed}
          onScrollDown={() => scrollToSection('families')}
        />

        {/* 3. Save the Date Pull-to-Reveal Royal Scroll + Live Countdown + Calendar */}
        <SaveTheDateScroll onRevealBurst={() => triggerBurst('celebration')} />

        {/* 4. Our Story — Shahi Patra Hanging Maroon Gallery Frames */}
        <StoryCarousel />

        {/* 5. Ceremonies — Deep Imperial Maroon Scalloped Mughal Arch Cards */}
        <FestivitiesCarousel onSelectVenueOnMap={handleSelectVenueOnMap} />

        {/* 6. Grand Walima Reception — Royal Banquet Farman Plaque */}
        <WalimaFeatureCard
          onShowWalimaMap={() => handleSelectVenueOnMap('ganpati')}
          onJumpToRsvp={() => scrollToSection('rsvp')}
        />

        {/* 7. Kolkata Interactive Route Map — Ojas Banquets & Ganpati Banquets */}
        <VenueMapSection
          activeVenueId={activeVenueId}
          onChangeVenue={setActiveVenueId}
        />

        {/* 8. Painted Palace Easel Courtyard + Custom RSVP & Warm Wishes Wall */}
        <RsvpSection onRsvpSuccessBurst={() => triggerBurst('celebration')} />

        {/* 9. Imperial Maroon Closing & Original Print Card PDF */}
        <ClosingSection onReplayBook={handleReplayBook} />
      </main>
    </div>
  );
}
