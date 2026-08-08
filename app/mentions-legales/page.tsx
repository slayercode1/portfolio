import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'
import { CONTACT_EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Éditeur, hébergement, propriété intellectuelle et responsabilité du site yann-dev.fr.',
}

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      description="Les informations relatives à l’édition, à l’hébergement et à l’utilisation de ce portfolio."
    >
      <LegalSection title="1. Éditeur du site">
        <p>
          Le site <strong className="font-semibold text-foreground">yann-dev.fr</strong> est un portfolio
          personnel édité par Yann Clain, particulier résidant en France.
        </p>
        <p>
          Contact :{' '}
          <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="2. Responsable de la publication">
        <p>
          Yann Clain est responsable de la publication et peut être contacté à l’adresse indiquée ci-dessus.
        </p>
      </LegalSection>

      <LegalSection title="3. Hébergement et diffusion">
        <p>
          L’application est déployée sur un serveur privé virtuel auprès d’OVH SAS, 2 rue Kellermann,
          59100 Roubaix, France — téléphone : +33 9 72 10 10 07.
        </p>
        <p>
          Le trafic public transite par le réseau Cloudflare afin d’améliorer la disponibilité, les
          performances et la protection du site.
        </p>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <p>
          Sauf mention contraire, les textes, la présentation, les créations graphiques et le code propres
          à ce portfolio sont réalisés par Yann Clain. Les marques, interfaces et contenus relatifs aux
          projets présentés restent la propriété de leurs titulaires respectifs.
        </p>
        <p>
          Toute reproduction ou adaptation substantielle nécessite une autorisation préalable, sous réserve
          des exceptions prévues par la loi et des licences éventuellement associées aux ressources tierces.
        </p>
      </LegalSection>

      <LegalSection title="5. Liens externes et responsabilité">
        <p>
          Ce portfolio contient des liens vers des sites et dépôts externes. Yann Clain ne contrôle pas leur
          disponibilité ni leurs contenus. Les informations publiées sur ce site sont fournies à titre de
          présentation et peuvent évoluer.
        </p>
      </LegalSection>

      <LegalSection title="6. Droit applicable">
        <p>Les présentes mentions légales sont soumises au droit français.</p>
      </LegalSection>
    </LegalPage>
  )
}
