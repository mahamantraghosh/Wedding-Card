/**
 * Soft procedural ambient wedding melody engine (Web Audio API).
 * Synthesizes a gentle, warm acoustic santoor/harp & tanpura-inspired drone
 * in Raag Yaman-like Lydian pentatonic intervals with smooth fade-in/out and looping.
 * Zero external MP3 fetches so audio works reliably offline and on iOS/Android.
 */

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private loopTimer: number | null = null;
  private stepIndex = 0;
  private playing = false;

  // Soft Lydian / Raag Yaman inspired melodic sequence (Hz)
  private readonly melodyNotes = [
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.0,  // A4
    493.88, // B4
    554.37, // C#5
    587.33, // D5
    493.88, // B4
    440.0,  // A4
    369.99, // F#4
    329.63, // E4
    293.66, // D4
    369.99, // F#4
    440.0,  // A4
    554.37, // C#5
    440.0,  // A4
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  public async playWithFadeIn(): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return false;

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch {
      return false;
    }

    if (this.playing) return true;
    this.playing = true;

    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, now + 2.4);

    this.startDrone(ctx);
    this.scheduleNextPluck();
    return true;
  }

  public pause(): void {
    if (!this.ctx || !this.masterGain || !this.playing) return;
    this.playing = false;

    if (this.loopTimer !== null) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    this.stopDrone();
  }

  public async toggle(): Promise<boolean> {
    if (this.playing) {
      this.pause();
      return false;
    }
    return this.playWithFadeIn();
  }

  private startDrone(ctx: AudioContext): void {
    this.stopDrone();
    if (!this.masterGain) return;

    const freqs = [146.83, 220.0]; // Soft D3 + A3 warm tanpura fifth
    for (const f of freqs) {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.droneOscs.push(osc);
    }
  }

  private stopDrone(): void {
    const oscs = this.droneOscs;
    this.droneOscs = [];
    window.setTimeout(() => {
      for (const osc of oscs) {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Already stopped
        }
      }
    }, 600);
  }

  private scheduleNextPluck(): void {
    if (!this.playing || !this.ctx || !this.masterGain) return;

    const freq = this.melodyNotes[this.stepIndex % this.melodyNotes.length];
    this.stepIndex += 1;
    this.playHarpPluck(freq);

    // Gentle rubato timing between 1.1s and 1.75s
    const delayMs = this.stepIndex % 4 === 0 ? 1750 : 1180;
    this.loopTimer = window.setTimeout(() => {
      this.scheduleNextPluck();
    }, delayMs);
  }

  private playHarpPluck(freq: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.18, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(520, now + 2.2);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.24, now + 0.045);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 2.8);
    harmonic.stop(now + 2.8);
  }
}

export const weddingAudio = new WeddingAudioEngine();
