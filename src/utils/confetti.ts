import confetti from 'canvas-confetti';

/**
 * Fires a burst of celebratory confetti with energetic vibrant colors
 */
export function fireCorrectConfetti(originX = 0.5, originY = 0.6) {
  try {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: originX, y: originY },
      colors: ['#10B981', '#06B6D4', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'],
      ticks: 180,
      gravity: 1.2,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Super celebratory fireworks display for high score or quiz completion
 */
export function fireGrandCelebration() {
  try {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#06B6D4', '#8B5CF6', '#F43F5E', '#10B981'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } catch {
    // Graceful fallback
  }
}
