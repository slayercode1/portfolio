import { RefObject, useEffect, useState } from 'react'

/**
 * Hook pour détecter quand un élément devient visible dans le viewport
 * Utilise IntersectionObserver de manière optimisée
 *
 * @param ref - Reference React vers l'élément à observer
 * @param threshold - Pourcentage de visibilité requis (0.1 = 10%)
 * @returns boolean indiquant si l'élément est visible
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.1): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])

  return isVisible
}
