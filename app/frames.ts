import { FRAME_COUNT } from "./sequence.ts";

// Keep compressed frames (~5 MiB) separately from the 12 decoded images.
export function createFrameLoader(width: number, onReady: () => void) {
  const controller = new AbortController();
  const blobs = new Map<number, Blob>();
  const bitmaps = new Map<number, ImageBitmap>();
  const downloading = new Set<number>(), decoding = new Set<number>(), failed = new Set<number>();
  let target = 0, direction = 1, active = false, disposed = false;
  let order = Array.from({ length: FRAME_COUNT }, (_, index) => index);

  function pump() {
    if (disposed || !active) return;
    // Download ahead without keeping the entire sequence decoded in memory.
    for (const index of order) {
      if (downloading.size >= 4) break;
      if (blobs.has(index) || downloading.has(index) || failed.has(index)) continue;
      downloading.add(index);
      // Bump the asset version when the rendered sequence changes.
      fetch(`/armor/frame-${String(index).padStart(3, "0")}.webp?v=cadnav-178a7c5`, {
        signal: controller.signal, cache: "force-cache",
      })
        .then((response) => { if (!response.ok) throw new Error("Frame unavailable"); return response.blob(); })
        .then((blob) => { if (!disposed) blobs.set(index, blob); })
        .catch(() => { if (!disposed) failed.add(index); })
        .finally(() => { downloading.delete(index); pump(); });
    }
    for (const index of order.slice(0, 12)) {
      if (decoding.size >= 2) break;
      const blob = blobs.get(index);
      if (!blob || bitmaps.has(index) || decoding.has(index) || failed.has(index)) continue;
      decoding.add(index);
      createImageBitmap(blob, { resizeWidth: width })
        .then((bitmap) => {
          if (disposed) { bitmap.close(); return; }
          bitmaps.set(index, bitmap);
          if (bitmaps.size > 12) {
            const farthest = order.findLast((frame) => bitmaps.has(frame))!;
            bitmaps.get(farthest)!.close(); bitmaps.delete(farthest);
          }
          if (active) onReady();
        })
        .catch(() => { if (!disposed) failed.add(index); })
        .finally(() => { decoding.delete(index); pump(); });
    }
  }

  return {
    update(frame: number, enabled: boolean) {
      if (disposed) return;
      if (frame !== target) {
        direction = Math.sign(frame - target);
        target = frame;
        order.sort((a, b) => Math.abs(a - target) - Math.abs(b - target) || direction * (b - a));
      }
      active = enabled;
      pump();
    },
    nearest() {
      // A ready neighbor keeps a cold/slow connection moving until the exact frame arrives.
      const index = order.find((frame) => bitmaps.has(frame));
      return index === undefined ? undefined : { index, bitmap: bitmaps.get(index)! };
    },
    dispose() {
      disposed = true;
      controller.abort();
      bitmaps.forEach((bitmap) => bitmap.close());
      bitmaps.clear(); blobs.clear();
    },
  };
}
