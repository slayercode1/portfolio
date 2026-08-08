'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ProjectHoverVideoProps {
  src: string
}

export function ProjectHoverVideo({ src }: ProjectHoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

  return (
    <div
      className="absolute inset-0 z-[5]"
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      aria-hidden="true"
    >
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
