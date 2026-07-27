'use client'

import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
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

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
    setEmailCopied(true)
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex rounded-full bg-highlight/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-highlight">
              03 · Contact
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              {data.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-[17px]">
              {data.description}
            </p>
            <p className="mt-7 font-mono text-sm text-foreground sm:text-base">
              {CONTACT_EMAIL}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={copyEmail}
              onBlur={() => setEmailCopied(false)}
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3.5 text-xs font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
              aria-live="polite"
            >
              {emailCopied ? (
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <CopyIcon className="h-4 w-4" aria-hidden="true" />
              )}
              {emailCopied ? 'Adresse copiée' : 'Copier mon e-mail'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
