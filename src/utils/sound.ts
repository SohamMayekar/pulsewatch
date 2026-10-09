// Synthesized Web Audio cues for tactile interface feedback
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function setAudioEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

export function playTactileChime(
  freq = 440,
  type: OscillatorType = 'sine',
  duration = 0.06,
  gainVal = 0.04
): void {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (audioCtx) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    }
  } catch (err) {
    // Graceful fallback for headless or restricted audio policies
  }
}

export function playActionSuccess(): void {
  playTactileChime(587.33, 'triangle', 0.1, 0.05); // D5
  setTimeout(() => playTactileChime(880, 'sine', 0.12, 0.04), 60); // A5
}

export function playAlertWarning(): void {
  playTactileChime(659.25, 'triangle', 0.12, 0.06); // E5
}
