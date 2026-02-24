import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site yann-dev.fr - Éditeur, hébergeur, propriété intellectuelle.',
}

export default function MentionsLegalesPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-12">Mentions légales</h1>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Éditeur du site</h2>
            <p>
              Le site <strong className="text-foreground">yann-dev.fr</strong> est édité par :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Yann Clain, particulier</li>
              <li>Adresse e-mail : contact@yann-dev.fr</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Responsable de la publication</h2>
            <p>
              Le responsable de la publication est Yann Clain, joignable à
              l&apos;adresse e-mail : contact@yann-dev.fr.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Hébergeur</h2>
            <p>Le site est hébergé par :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>OVH SAS</li>
              <li>2, rue Kellermann — 59100 Roubaix, France</li>
              <li>Téléphone : +33 9 72 10 10 07</li>
              <li>Site web : www.ovhcloud.com</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, code source)
              est la propriété exclusive de Yann Clain, sauf mention contraire. Toute reproduction,
              représentation, modification, publication ou adaptation de tout ou partie des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite
              préalable de Yann Clain.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Limitation de responsabilité</h2>
            <p>
              Yann Clain s&apos;efforce de fournir sur le site des informations aussi précises que possible.
              Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences
              dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui
              fournissent ces informations.
            </p>
            <p className="mt-2">
              Les liens hypertextes mis en place dans le cadre du présent site en direction d&apos;autres
              ressources sur Internet ne sauraient engager la responsabilité de Yann Clain.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
