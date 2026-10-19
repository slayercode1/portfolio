'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProjectHoverVideoProps {
  src: string
}

// Le survol est écouté sur le conteneur parent pour que les éléments superposés (lien, badges) ne bloquent pas la lecture.
export function ProjectHoverVideo({ src }: ProjectHoverVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const host = containerRef.current?.parentElement
    if (!host) return

    function playPreview() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      void videoRef.current?.play()
    }

    function stopPreview() {
      const video = videoRef.current
      if (!video) return

      video.pause()
      video.currentTime = 0
      setIsPlaying(false)
    }

    host.addEventListener('mouseenter', playPreview)
    host.addEventListener('mouseleave', stopPreview)

    return () => {
      host.removeEventListener('mouseenter', playPreview)
      host.removeEventListener('mouseleave', stopPreview)
    }
  }, [])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        className={cn(
          'h-full w-full object-cover opacity-0 transition-opacity duration-300',
          isPlaying && 'opacity-100'
        )}
        tabIndex={-1}
      />
    </div>
  )
}
