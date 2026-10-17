// Cinematic Web Audio Synthesizer for Space & Warp Transitions
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Deep subtle cinematic bass sweep / whoosh for dark fade transitions
  playDarkTransition() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Deep sub-bass swell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.8);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.9);
    } catch {
      // Audio might fail silently if blocked by browser policy
    }
  }

  // Cosmic Blackhole Warp In (Zoom In phase)
  playWarpWhoosh() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Low sub rumble pulling in
      const rumble = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumble.type = 'sawtooth';
      rumble.frequency.setValueAtTime(45, now);
      rumble.frequency.exponentialRampToValueAtTime(140, now + 0.7);

      rumbleGain.gain.setValueAtTime(0.001, now);
      rumbleGain.gain.linearRampToValueAtTime(0.16, now + 0.5);
      rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, now);
      filter.frequency.exponentialRampToValueAtTime(900, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.85);

      rumble.connect(filter);
      filter.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);

      rumble.start(now);
      rumble.stop(now + 0.85);
    } catch {
      // Ignore
    }
  }

  // Ethereal Cosmic Release (Zoom Out phase exiting the blackhole)
  playWarpRelease() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 1.1);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.1);
    } catch {
      // Ignore
    }
  }

  // Smooth cinematic optical zoom out (dolly pull-back)
  playOpticalZoomOut() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Smooth descending warm tone (camera gliding backward)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 1.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 1.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.65);
    } catch {
      // Ignore
    }
  }

  // Smooth cinematic optical zoom in (dolly push-in forward)
  playOpticalZoomIn() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Smooth ascending warm tone (camera gliding forward)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 1.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(650, now + 1.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.13, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.7);
    } catch {
      // Ignore
    }
  }

  playSubtleClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }
}

export const soundFX = new SoundFX();
