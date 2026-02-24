import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du site yann-dev.fr — Données collectées, droits RGPD, cookies.',
}

export default function PolitiqueDeConfidentialitePage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Politique de confidentialité</h1>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles collectées sur le site{' '}
              <strong className="text-foreground">yann-dev.fr</strong> est :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Yann Clain</li>
              <li>Adresse e-mail : contact@yann-dev.fr</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Données collectées</h2>
            <p>
              Dans le cadre du formulaire de contact, les données personnelles suivantes sont collectées :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Nom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Message</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Finalité et base légale</h2>
            <p>
              Les données sont collectées dans le but de répondre aux demandes de contact. La base légale
              du traitement est l&apos;intérêt légitime (article 6.1.f du RGPD) : permettre à
              l&apos;éditeur du site de répondre aux sollicitations reçues via le formulaire de contact.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Durée de conservation</h2>
            <p>
              Les données personnelles collectées via le formulaire de contact sont conservées pour une
              durée maximale de 12 mois à compter de la réception du message, puis supprimées.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Destinataires des données</h2>
            <p>
              Les données collectées sont exclusivement destinées à Yann Clain. Elles ne sont transmises
              à aucun tiers, ni utilisées à des fins commerciales ou publicitaires.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Cookies</h2>
            <p>
              Le site utilise uniquement des cookies et mécanismes de stockage techniques, strictement
              nécessaires au fonctionnement :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Cookie de session pour l&apos;administration du site (better-auth)</li>
              <li>localStorage pour la préférence de thème (clair / sombre)</li>
              <li>localStorage pour la préférence de langue</li>
            </ul>
            <p className="mt-2">
              Aucun cookie de tracking, d&apos;analyse ou publicitaire n&apos;est utilisé. Ces cookies
              techniques étant strictement nécessaires, aucun consentement n&apos;est requis conformément
              à la directive ePrivacy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              des droits suivants concernant vos données personnelles :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Droit d&apos;accès</strong> : obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
              <li><strong className="text-foreground">Droit de rectification</strong> : demander la correction de données inexactes ou incomplètes</li>
              <li><strong className="text-foreground">Droit d&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong className="text-foreground">Droit à la portabilité</strong> : recevoir vos données dans un format structuré et couramment utilisé</li>
              <li><strong className="text-foreground">Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong className="text-foreground">Droit à la limitation</strong> : demander la limitation du traitement de vos données</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez : <strong className="text-foreground">contact@yann-dev.fr</strong>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD,
              vous avez le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale
              de l&apos;Informatique et des Libertés) :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Site web : www.cnil.fr</li>
              <li>Adresse : 3, Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
