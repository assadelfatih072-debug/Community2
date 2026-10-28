/**
 * Web Audio API based Sound Synthesizer for instant, zero-latency, reliable audio feedback.
 * Works offline and requires no external audio assets.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  constructor() {
    // Check saved state
    try {
      const saved = localStorage.getItem('ecomed_quiz_sound_muted');
      if (saved !== null) {
        this.muted = saved === 'true';
      }
    } catch {
      // Ignore
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    try {
      localStorage.setItem('ecomed_quiz_sound_muted', String(muted));
    } catch {
      // Ignore
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Correct Answer: Crystal pleasant bell chime (Major triad chords C5 -> E5 -> G5 -> C6)
   */
  public playCorrect(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });

    this.triggerHaptic('success');
  }

  /**
   * Wrong Answer: Soft double low tone (gentle and informative)
   */
  public playWrong(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [220, 196]; // A3 -> G3 gentle downward step

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.3);
    });

    this.triggerHaptic('error');
  }

  /**
   * Click / Select Option Sound
   */
  public playClick(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Streak Combo sound: ascending flourish
   */
  public playStreak(streakCount: number): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const baseFreq = Math.min(600 + streakCount * 40, 1100);
    const chords = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];

    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.26);
    });
  }

  /**
   * Victory Fanfare when finishing quiz with high score
   */
  public playVictory(): void {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, t: 0.0, d: 0.15 },
      { f: 523.25, t: 0.15, d: 0.15 },
      { f: 523.25, t: 0.30, d: 0.15 },
      { f: 659.25, t: 0.45, d: 0.35 },
      { f: 587.33, t: 0.80, d: 0.15 },
      { f: 659.25, t: 0.95, d: 0.15 },
      { f: 783.99, t: 1.10, d: 0.60 },
    ];

    notes.forEach((item) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0, now + item.t);
      gain.gain.linearRampToValueAtTime(0.2, now + item.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + item.t);
      osc.stop(now + item.t + item.d);
    });
  }

  public triggerHaptic(type: 'success' | 'error' | 'light'): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (type === 'success') {
          navigator.vibrate([30, 40, 50]);
        } else if (type === 'error') {
          navigator.vibrate([70, 50, 70]);
        } else {
          navigator.vibrate(20);
        }
      } catch {
        // Ignore haptic errors on unsupported platforms
      }
    }
  }
}

export const soundManager = new SoundEffectsManager();
