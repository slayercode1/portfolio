'use client'

import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { CheckCircledIcon } from '@radix-ui/react-icons'

interface Technology {
  id: string
  name: string
  icon: string
}

interface Certification {
  id: string
  key: string
  title: string
}

interface AboutData {
  badge: string
  title: string
  description: string
  bio: string
  profileImage: string | null
  certificationsTitle: string
  stackTitle: string
  certifications: Certification[]
  technologies: Technology[]
}

interface AboutSectionProps {
  data: AboutData
}

export function AboutSection({ data }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, 0.1)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section bg-secondary/30"
    >
      <div className="container-custom">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium">
            {data.badge}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Photo */}
          <div className={`relative flex justify-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-xl" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-primary/50 opacity-20" />

              {/* Image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                <Image
                  src={data.profileImage || "/images/Saly-43.png"}
                  alt="Yann Clain"
                  fill
                  sizes="(max-width: 640px) 288px, 320px"
                  className="object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-card px-4 py-2 rounded-full shadow-lg border border-border">
                <span className="text-sm font-medium text-primary">
                  🎓 2024-2026
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {/* Bio */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.bio}
            </p>

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircledIcon className="w-5 h-5 text-primary" />
                  {data.certificationsTitle}
                </h3>
                <ul className="space-y-2 pl-7">
                  {data.certifications.map((cert) => (
                    <li key={cert.id} className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {cert.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            {data.technologies && data.technologies.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {data.stackTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((tech, index) => (
                    <div
                      key={tech.id}
                      className="badge-tech flex items-center gap-2"
                      style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                    >
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
