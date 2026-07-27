import site from '@/content/site.json'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ContactSection } from '@/components/sections/contact-section'

export function HomeContent() {
  const content = site.fr

  return (
    <>
      <HeroSection data={content.hero} socials={site.socials} />
      <AboutSection data={{ ...content.about, technologies: site.technologies }} />
      <ProjectsSection data={site.projects} />
      <ContactSection data={content.contact} />
    </>
  )
}
