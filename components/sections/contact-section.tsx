'use client'

import { ArrowTopRightIcon, CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { SectionHeading } from '@/components/ui/section-heading'
import { CONTACT_EMAIL } from '@/lib/constants'

interface ContactData {
  description: string
  title: string
}

interface ContactSectionProps {
  data: ContactData
}

export function ContactSection({ data }: ContactSectionProps) {
  const [emailCopied, setEmailCopied] = useState(false)

  useEffect(() => {
    if (!emailCopied) return
    const timeout = window.setTimeout(() => setEmailCopied(false), 2400)
    return () => window.clearTimeout(timeout)
  }, [emailCopied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setEmailCopied(true)
    } catch {
      toast.error("Impossible de copier l'adresse. Sélectionnez-la pour la copier manuellement.")
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="section-shell">
        <SectionHeading index="03 · Contact" title={data.title} description={data.description} />

        <div className="mt-12 flex flex-col gap-6 border-t border-border/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex w-fit items-center gap-3 break-all text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl xl:text-4xl"
          >
            <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
              {CONTACT_EMAIL}
            </span>
            <ArrowTopRightIcon
              className="h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="pressable inline-flex h-10 w-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-muted-foreground hover:border-foreground/30 hover:text-foreground"
          >
            {emailCopied ? (
              <CheckIcon className="h-4 w-4 text-highlight" aria-hidden="true" />
            ) : (
              <CopyIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span aria-live="polite">{emailCopied ? 'Adresse copiée' : 'Copier mon e-mail'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
