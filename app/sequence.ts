export const FRAME_COUNT = 96;

export function sequenceState(scroll: number, top: number, height: number, viewport: number) {
  const distance = Math.max(1, height - viewport);
  const progress = Math.max(0, Math.min(1, (scroll - top) / distance));
  return { progress, frame: Math.round(progress * (FRAME_COUNT - 1)), chapter: progress < 0.33 ? 0 : progress < 0.7 ? 1 : 2 };
}
