'use client'

import Image from "next/image"

interface ScrollLogoItem {
  id: string
  src: string
  alt: string
}

interface ScrollLogoProps {
  data: ScrollLogoItem[]
}

export function ScrollLogo({ data: logos }: ScrollLogoProps) {
  if (logos.length === 0) {
    return null
  }

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-6 sm:[&_li]:mx-8 [&_img]:max-w-none animate-loop-scroll">
        {logos.map((logo) => (
          <li key={logo.id} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-6 sm:[&_li]:mx-8 [&_img]:max-w-none animate-loop-scroll" aria-hidden="true">
        {logos.map((logo) => (
          <li key={`${logo.id}-dup`} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={32}
              height={32}
              loading="lazy"
              className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
