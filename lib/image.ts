/**
 * Unified image source handler for Next.js static imports
 * Handles both string URLs and Next.js's StaticImageData format
 */
export function getImageSrc(
  img: string | { src: string } | undefined,
  fallback?: string | { src: string }
): string {
  if (!img && fallback) {
    return typeof fallback === 'string' ? fallback : fallback.src
  }
  if (!img) {
    return ''
  }
  return typeof img === 'string' ? img : img.src
}
