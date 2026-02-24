'use client'

import { Button } from '@/components/ui/button'
import { ArrowDownIcon, DownloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroData {
  greeting: string
  name: string
  title: string
  description: string
  cvUrl: string | null
  projectsCount: number
  experienceYears: number
  technologiesCount: number
  ctaProjects: string
  ctaCv: string
  statsProjects: string
  statsExperience: string
  statsTechnologies: string
}

interface HeroSectionProps {
  data: HeroData
}

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const increment = target / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

// Floating code badges (Firecrawl style)
const codeBadges = [
  { label: '[ 200 OK ]', position: 'top-20 left-[5%]' },
  { label: '[ DEPLOY ]', position: 'top-24 right-[8%]' },
  { label: '[ .JSON ]', position: 'top-[50%] left-[3%]' },
  { label: '[ API ]', position: 'bottom-28 right-[5%]' },
  { label: '[ .MD ]', position: 'bottom-20 right-[15%]' },
  { label: '[ BUILD ]', position: 'top-[35%] right-[3%]' },
]

// Grid blocks (2x2 pattern like Firecrawl)
const gridBlocks = [
  { position: 'top-28 left-[18%]', rows: 2, cols: 2 },
  { position: 'top-16 right-[22%]', rows: 2, cols: 3 },
  { position: 'top-20 right-[35%]', rows: 3, cols: 2 },
  { position: 'bottom-32 left-[22%]', rows: 2, cols: 2 },
  { position: 'top-[40%] right-[18%]', rows: 3, cols: 3 },
  { position: 'bottom-24 right-[28%]', rows: 2, cols: 3 },
]

// Orange sparkles
const sparkles = [
  { position: 'top-36 left-[25%]' },
  { position: 'top-28 right-[40%]' },
  { position: 'bottom-40 left-[30%]' },
  { position: 'top-[55%] right-[35%]' },
]

export function HeroSection({ data }: HeroSectionProps) {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background Grid with dots at intersections */}
      <div className="absolute inset-0 bg-grid" />

      {/* Gradient fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_75%)]" />

      {/* Top/Bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Floating Code Badges */}
      {codeBadges.map((badge, index) => (
        <div
          key={index}
          className={`absolute ${badge.position} hidden lg:block font-mono text-[11px] px-2 py-0.5 rounded
            bg-background/60 backdrop-blur-sm text-muted-foreground/70 border border-border/40`}
        >
          {badge.label}
        </div>
      ))}

      {/* Decorative Grid Blocks */}
      {gridBlocks.map((block, index) => (
        <div
          key={index}
          className={`absolute ${block.position} hidden lg:grid gap-[2px]`}
          style={{
            gridTemplateColumns: `repeat(${block.cols}, 8px)`,
            gridTemplateRows: `repeat(${block.rows}, 8px)`,
          }}
        >
          {Array.from({ length: block.rows * block.cols }).map((_, i) => (
            <div
              key={i}
              className="bg-muted-foreground/10 border border-border/20 rounded-[2px]"
            />
          ))}
        </div>
      ))}

      {/* Orange Sparkles */}
      {sparkles.map((sparkle, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={`absolute ${sparkle.position} hidden lg:block text-orange-500 text-sm font-bold`}
        >
          ✦
        </div>
      ))}

      {/* Main content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Greeting */}
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                {data.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gradient">{data.name}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/90">
                {data.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {data.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="btn-primary gap-2 text-base px-8"
                onClick={scrollToProjects}
              >
                {data.ctaProjects}
                <ArrowDownIcon className="w-4 h-4" aria-hidden="true" />
              </Button>
              {data.cvUrl && (
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-outline gap-2 text-base px-8"
                  asChild
                >
                  <a href={data.cvUrl} download>
                    {data.ctaCv}
                    <DownloadIcon className="w-4 h-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter target={data.projectsCount} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.statsProjects}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter target={data.experienceYears} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.statsExperience}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter target={data.technologiesCount} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.statsTechnologies}
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Illustration */}
          <div className="relative flex justify-center lg:justify-end animate-float" style={{ animationDuration: '5s' }}>
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              {/* Decorative circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 blur-3xl" />

              {/* Main image */}
              <Image
                src="/images/Saly-43.png"
                alt=""
                fill
                sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 450px"
                className="object-contain relative z-10"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-pulse-soft">
          <span className="text-sm text-muted-foreground">Scroll</span>
          <ArrowDownIcon className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
