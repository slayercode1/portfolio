'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import axios from 'axios'
import { toast } from 'sonner'
import { formatNumber } from '@/lib/utils/formatNumber'
import { CheckIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { SOCIAL_ICONS } from '@/lib/constants'

interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
}

interface ContactBenefit {
  id: string
  text: string
}

interface ContactStat {
  id: string
  value: string
  label: string
}

interface ContactTechLogo {
  id: string
  src: string
  alt: string
}

interface ContactData {
  title: string
  description: string
  socialsTitle: string
  isFormEnabled: boolean
  benefits: ContactBenefit[]
  stats: ContactStat[]
  socials: SocialLink[]
  techLogos: ContactTechLogo[]
}

interface ContactSectionProps {
  data: ContactData
}

const ContactSchema = z.object({
  fullname: z.string({
    required_error: 'Le nom complet est requis',
  }).min(1, 'Le nom complet est requis').trim(),
  email: z.string().email("L'adresse email doit être valide").trim(),
  subject: z.string().min(1, "L'objet est requis").trim(),
  phone: z.string()
    .min(10, 'Le numéro de téléphone doit contenir au moins 10 caractères')
    .max(15, 'Le numéro de téléphone doit contenir au plus 15 caractères')
    .trim(),
  message: z.string({
    required_error: 'Le message est requis',
  }).min(1, 'Le message est requis'),
})

type ContactSchemaType = z.infer<typeof ContactSchema>

export function ContactSection({ data }: ContactSectionProps) {
  const t = useTranslations('contact')
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, 0.1)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactSchemaType>({ resolver: zodResolver(ContactSchema), mode: 'onChange' })

  const onSubmit: SubmitHandler<ContactSchemaType> = async (formData) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/send-email', {
        email: formData.email,
        subject: formData.subject,
        data: {
          content: formData.message,
          phone: formData.phone,
          fullName: formData.fullname,
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      toast.success(response.data.message)
      reset()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Erreur d'envoi : ${error.message}. Veuillez vérifier votre connexion et réessayer.`)
      } else {
        toast.error('Une erreur est survenue lors de l\'envoi. Veuillez réessayer dans quelques instants.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
    >
      <div className="container-custom">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>

          <div className="space-y-8">

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {data.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.description}
              </p>
            </div>


            {data.benefits && data.benefits.length > 0 && (
              <ul className="space-y-3">
                {data.benefits.map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-3">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckIcon className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-muted-foreground">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            )}


            {data.socials && data.socials.length > 0 && (
              <p className="text-muted-foreground">
                {data.socialsTitle}{' '}
                {data.socials.map((social, index) => {
                  const Icon = SOCIAL_ICONS[social.icon]
                  return (
                    <span key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {social.name}
                      </a>
                      {index < data.socials.length - 1 && <span className="text-muted-foreground">, </span>}
                    </span>
                  )
                })}
                .
              </p>
            )}


            <hr className="border-border" />


            {data.stats && data.stats.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Quelques chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  {data.stats.map((stat) => (
                    <div key={stat.id}>
                      <p className="text-3xl font-bold text-primary tabular-nums">
                        {formatNumber(stat.value)}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}


            <hr className="border-border" />


            {data.techLogos && data.techLogos.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">Technologies que j&apos;utilise au quotidien</p>
                <div className="flex flex-wrap items-center gap-6">
                  {data.techLogos.map((logo) => (
                    <Image
                      key={logo.id}
                      src={logo.src}
                      alt={logo.alt}
                      width={28}
                      height={28}
                      loading="lazy"
                      className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>


          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            {data.isFormEnabled ? (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t('form.email')}*
                    </Label>
                    <Input
                      {...register('email')}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t('form.email_placeholder')}
                      className="bg-background"
                    />
                    {errors?.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>


                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="text-sm font-medium">
                        {t('form.name')}*
                      </Label>
                      <Input
                        {...register('fullname')}
                        id="fullname"
                        autoComplete="name"
                        placeholder={t('form.name_placeholder')}
                        className="bg-background"
                      />
                      {errors?.fullname && (
                        <p className="text-sm text-destructive">{errors.fullname.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        {t('form.phone')}*
                      </Label>
                      <Input
                        {...register('phone')}
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder={t('form.phone_placeholder')}
                        className="bg-background"
                      />
                      {errors?.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      {t('form.subject')}*
                    </Label>
                    <Input
                      {...register('subject')}
                      id="subject"
                      placeholder={t('form.subject_placeholder')}
                      className="bg-background"
                    />
                    {errors?.subject && (
                      <p className="text-sm text-destructive">{errors.subject.message}</p>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      {t('form.message')}*
                    </Label>
                    <textarea
                      {...register('message')}
                      id="message"
                      placeholder={t('form.message_placeholder')}
                      rows={5}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary resize-none transition-colors"
                    />
                    {errors?.message && (
                      <p className="text-sm text-destructive">{errors.message.message}</p>
                    )}
                  </div>


                  <p className="text-xs text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez que vos informations soient utilisées pour vous recontacter concernant votre projet.
                  </p>


                  <Button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="w-full btn-primary"
                    size="lg"
                  >
                    {loading ? (
                      <span className="spinner-loader">{t('form.sending')}…</span>
                    ) : (
                      t('form.submit')
                    )}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm text-center">
                <p className="text-muted-foreground">
                  Le formulaire de contact est actuellement désactivé. Veuillez me contacter via les réseaux sociaux.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
