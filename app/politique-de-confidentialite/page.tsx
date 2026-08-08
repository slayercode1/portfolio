import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/legal-page'
import { CONTACT_EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Fonctionnement du portfolio yann-dev.fr et informations relatives à la confidentialité.',
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Vie privée"
      title="Politique de confidentialité"
      description="Ce portfolio est conçu pour fonctionner avec un minimum de données et sans suivi publicitaire."
    >
      <LegalSection title="1. Responsable du site">
        <p>
          Yann Clain est responsable du site <strong className="font-semibold text-foreground">yann-dev.fr</strong>.
          Pour toute question relative à la confidentialité, vous pouvez écrire à{' '}
          <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>.
        </p>
      </LegalSection>

      <LegalSection title="2. Aucune collecte par formulaire">
        <p>
          Le site ne comporte aucun formulaire de contact, espace personnel ou compte utilisateur. Il
          n’enregistre donc ni nom, ni numéro de téléphone, ni message dans une base de données.
        </p>
        <p>
          L’adresse e-mail de Yann Clain est seulement affichée et peut être copiée. Si vous choisissez
          ensuite d’envoyer un e-mail depuis votre propre messagerie, cet échange a lieu en dehors du site et
          contient uniquement les informations que vous décidez de communiquer.
        </p>
      </LegalSection>

      <LegalSection title="3. Mesure d’audience et publicité">
        <p>
          Aucun outil de mesure d’audience, pixel publicitaire, profilage ou dispositif de suivi entre sites
          n’est intégré au portfolio.
        </p>
      </LegalSection>

      <LegalSection title="4. Stockage local et cookies">
        <p>
          Le site mémorise uniquement la préférence de thème clair ou sombre dans le stockage local du
          navigateur, sous la clé <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">portfolio-theme</code>.
          Cette préférence reste sur votre appareil et peut être supprimée depuis les réglages du navigateur.
        </p>
        <p>Aucun cookie publicitaire ou de mesure d’audience n’est déposé par le site.</p>
      </LegalSection>

      <LegalSection title="5. Données techniques nécessaires">
        <p>
          Comme tout service web, le serveur d’hébergement et le réseau de diffusion Cloudflare peuvent
          traiter temporairement des données techniques telles que l’adresse IP, la date de la requête, la
          page demandée et le type de navigateur. Elles servent à acheminer les pages, sécuriser le service et
          diagnostiquer les erreurs.
        </p>
        <p>
          Les vidéos de projets sont hébergées directement sur yann-dev.fr. Leur lecture ne déclenche pas de
          connexion à une plateforme vidéo tierce.
        </p>
      </LegalSection>

      <LegalSection title="6. Liens vers des services externes">
        <p>
          Les liens vers les projets et réseaux sociaux ne transmettent des informations à ces services
          qu’après votre clic. Leur traitement des données relève alors de leurs propres politiques de
          confidentialité.
        </p>
      </LegalSection>

      <LegalSection title="7. Vos droits">
        <p>
          Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou l’opposition pour les
          données personnelles qui seraient détenues à votre sujet, lorsque ces droits sont applicables. Les
          demandes peuvent être adressées à{' '}
          <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la{' '}
          <a
            className="font-medium text-foreground underline underline-offset-4"
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            CNIL
          </a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
