import { SITE_URL } from '@/lib/constants'

export function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yann Clain',
    url: SITE_URL,
    jobTitle: 'Développeur Web & Mobile',
    description: "Développeur web & mobile passionné par la création d'applications performantes et innovantes.",
    knowsAbout: [
      'React', 'Next.js', 'TypeScript', 'Node.js', 'React Native',
      'PostgreSQL', 'Prisma', 'Tailwind CSS', 'JavaScript',
    ],
    sameAs: [
      'https://github.com/slayercode1',
      'https://www.linkedin.com/in/yann-clain-185a91235/',
      'https://twitter.com/YannLeDev',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
