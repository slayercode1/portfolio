"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Pencil, Loader2, Mail, Github, Linkedin, Twitter, Plus, Trash2, Settings, Check, List } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  order: number
  isActive: boolean
}

interface ContactBenefit {
  id: string
  text: string
  order: number
}

interface ContactTechLogo {
  id: string
  src: string
  alt: string
  order: number
}

interface ContactStat {
  id: string
  value: string
  label: string
  order: number
}

interface ContactData {
  id?: string
  locale: string
  badge: string
  title: string
  description: string
  socialsTitle: string
  isFormEnabled: boolean
  benefits?: ContactBenefit[]
  stats?: ContactStat[]
  techLogos?: ContactTechLogo[]
}

interface EditableContactSectionProps {
  isPreviewMode: boolean
}

const socialIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  mail: Mail,
}

const iconOptions = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter / X" },
  { value: "mail", label: "Email" },
]

export function EditableContactSection({ isPreviewMode }: EditableContactSectionProps) {
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [isManagingSocials, setIsManagingSocials] = useState(false)
  const [isManagingBenefits, setIsManagingBenefits] = useState(false)
  const [isManagingLogos, setIsManagingLogos] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [benefits, setBenefits] = useState<ContactBenefit[]>([])
  const [stats, setStats] = useState<ContactStat[]>([])
  const [techLogos, setTechLogos] = useState<ContactTechLogo[]>([])
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null)
  const [newBenefitText, setNewBenefitText] = useState("")
  const [newLogoSrc, setNewLogoSrc] = useState("")
  const [newLogoAlt, setNewLogoAlt] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [contactRes, socialsRes] = await Promise.all([
        fetch("/api/admin/contact"),
        fetch("/api/admin/socials"),
      ])

      if (contactRes.ok) {
        const data = await contactRes.json()
        const fr = data.find((c: ContactData) => c.locale === "fr")
        if (fr) {
          setContactData(fr)
          setBenefits(fr.benefits?.sort((a: ContactBenefit, b: ContactBenefit) => a.order - b.order) || [])
          setStats(fr.stats?.sort((a: ContactStat, b: ContactStat) => a.order - b.order) || [])
          setTechLogos(fr.techLogos?.sort((a: ContactTechLogo, b: ContactTechLogo) => a.order - b.order) || [])
        }
      }

      if (socialsRes.ok) {
        const data = await socialsRes.json()
        setSocials(data.sort((a: SocialLink, b: SocialLink) => a.order - b.order))
      }
    } catch {
      console.error("Error fetching data")
    }
  }

  const handleSaveContent = async () => {
    if (!contactData) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactData,
          benefits: benefits.map((b, i) => ({ text: b.text, order: i })),
          techLogos: techLogos.map((logo, i) => ({ src: logo.src, alt: logo.alt, order: i })),
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Section Contact mise à jour")
      setIsEditingContent(false)
      fetchData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveBenefits = async () => {
    if (!contactData) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactData,
          benefits: benefits.map((b, i) => ({ text: b.text, order: i })),
          techLogos: techLogos.map((logo, i) => ({ src: logo.src, alt: logo.alt, order: i })),
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Avantages mis à jour")
      setIsManagingBenefits(false)
      fetchData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const addBenefit = () => {
    if (!newBenefitText.trim()) return
    setBenefits([
      ...benefits,
      { id: `new-${Date.now()}`, text: newBenefitText, order: benefits.length },
    ])
    setNewBenefitText("")
  }

  const updateBenefit = (index: number, text: string) => {
    const updated = [...benefits]
    updated[index] = { ...updated[index], text }
    setBenefits(updated)
  }

  const deleteBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  const handleSaveLogos = async () => {
    if (!contactData) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactData,
          benefits: benefits.map((b, i) => ({ text: b.text, order: i })),
          techLogos: techLogos.map((logo, i) => ({ src: logo.src, alt: logo.alt, order: i })),
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Logos mis à jour")
      setIsManagingLogos(false)
      fetchData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const addLogo = () => {
    if (!newLogoSrc.trim() || !newLogoAlt.trim()) return
    setTechLogos([
      ...techLogos,
      { id: `new-${Date.now()}`, src: newLogoSrc, alt: newLogoAlt, order: techLogos.length },
    ])
    setNewLogoSrc("")
    setNewLogoAlt("")
  }

  const updateLogo = (index: number, field: 'src' | 'alt', value: string) => {
    const updated = [...techLogos]
    updated[index] = { ...updated[index], [field]: value }
    setTechLogos(updated)
  }

  const deleteLogo = (index: number) => {
    setTechLogos(techLogos.filter((_, i) => i !== index))
  }

  const handleSaveSocial = async () => {
    if (!editingSocial) return
    setIsLoading(true)

    try {
      const isNew = !editingSocial.id || editingSocial.id.startsWith("new-")
      const url = isNew ? "/api/admin/socials" : `/api/admin/socials/${editingSocial.id}`
      const method = isNew ? "POST" : "PUT"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSocial),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(isNew ? "Réseau social ajouté" : "Réseau social modifié")
      setEditingSocial(null)
      fetchData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSocial = async (id: string) => {
    if (!confirm("Supprimer ce réseau social ?")) return

    try {
      const res = await fetch(`/api/admin/socials/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erreur")
      toast.success("Réseau social supprimé")
      fetchData()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleToggleSocialActive = async (social: SocialLink) => {
    try {
      const res = await fetch(`/api/admin/socials/${social.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...social, isActive: !social.isActive }),
      })
      if (!res.ok) throw new Error("Erreur")
      fetchData()
    } catch {
      toast.error("Erreur lors de la modification")
    }
  }

  const openNewSocial = () => {
    setEditingSocial({
      id: `new-${Date.now()}`,
      name: "",
      url: "",
      icon: "linkedin",
      order: socials.length,
      isActive: true,
    })
  }

  const activeSocials = socials.filter((s) => s.isActive)

  if (!contactData) {
    return (
      <section className="py-24 bg-secondary/30">
        <div className="container-custom flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="contact" className="py-24 bg-secondary/30 relative group">
        {/* Edit Buttons */}
        {!isPreviewMode && (
          <div className="absolute top-8 right-8 z-20 flex gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setIsManagingLogos(true)}
              className="flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <Settings className="h-4 w-4" />
              Logos
            </button>
            <button
              onClick={() => setIsManagingBenefits(true)}
              className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <List className="h-4 w-4" />
              Avantages
            </button>
            <button
              onClick={() => setIsManagingSocials(true)}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <Settings className="h-4 w-4" />
              Réseaux sociaux
            </button>
            <button
              onClick={() => setIsEditingContent(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105"
            >
              <Pencil className="h-4 w-4" />
              Modifier Contact
            </button>
          </div>
        )}

        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              {contactData.badge}
            </span>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{contactData.title}</h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8">{contactData.description}</p>

            {/* Benefits List */}
            {benefits.length > 0 && (
              <div className="text-left max-w-xl mx-auto mb-12">
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit.id} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Form Preview */}
            {contactData.isFormEnabled ? (
              <div className="rounded-xl border bg-background p-8 mb-12">
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <Input placeholder="Votre nom" disabled={isPreviewMode} />
                  <Input placeholder="Votre email" disabled={isPreviewMode} />
                </div>
                <Input placeholder="Sujet" disabled={isPreviewMode} className="mb-4" />
                <textarea
                  placeholder="Votre message..."
                  disabled={isPreviewMode}
                  rows={4}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm mb-4"
                />
                <Button className="w-full" disabled={isPreviewMode}>
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer le message
                </Button>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed bg-muted/50 p-8 mb-12">
                <p className="text-muted-foreground">
                  Le formulaire de contact est désactivé
                </p>
              </div>
            )}

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{contactData.socialsTitle}</h3>
              <div className="flex justify-center gap-4">
                {activeSocials.map((social) => {
                  const Icon = socialIcons[social.icon] || Mail
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-background border hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Separator */}
            {(stats.length > 0 || techLogos.length > 0) && (
              <hr className="border-border my-8" />
            )}

            {/* Stats Section */}
            {stats.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Quelques chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat.id}>
                      <p className="text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Separator */}
            {stats.length > 0 && techLogos.length > 0 && (
              <hr className="border-border my-8" />
            )}

            {/* Tech Logos */}
            {techLogos.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Technologies que j&apos;utilise au quotidien
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {techLogos.map((logo) => (
                    <Image
                      key={logo.id}
                      src={logo.src}
                      alt={logo.alt}
                      width={28}
                      height={28}
                      className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Edit Content Sheet */}
      <Sheet open={isEditingContent} onOpenChange={setIsEditingContent}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Modifier la section Contact</SheetTitle>
            <SheetDescription>
              Modifiez les informations de contact
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label>Badge</Label>
              <Input
                value={contactData.badge}
                onChange={(e) => setContactData(prev => prev ? { ...prev, badge: e.target.value } : prev)}
                placeholder="Contact"
              />
            </div>

            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={contactData.title}
                onChange={(e) => setContactData(prev => prev ? { ...prev, title: e.target.value } : prev)}
                placeholder="Travaillons ensemble"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={contactData.description}
                onChange={(e) =>
                  setContactData(prev => prev ? { ...prev, description: e.target.value } : prev)
                }
                rows={3}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Titre des réseaux sociaux</Label>
              <Input
                value={contactData.socialsTitle}
                onChange={(e) =>
                  setContactData(prev => prev ? { ...prev, socialsTitle: e.target.value } : prev)
                }
                placeholder="Retrouvez-moi sur"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
              <div>
                <Label>Formulaire de contact</Label>
                <p className="text-xs text-muted-foreground">
                  Activer/désactiver le bouton d'envoi
                </p>
              </div>
              <Switch
                checked={contactData.isFormEnabled}
                onCheckedChange={(checked) =>
                  setContactData(prev => prev ? { ...prev, isFormEnabled: checked } : prev)
                }
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveContent} disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsEditingContent(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Manage Benefits Sheet */}
      <Sheet open={isManagingBenefits} onOpenChange={setIsManagingBenefits}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les avantages</SheetTitle>
            <SheetDescription>
              Liste des points forts affichés dans la section contact
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            {/* Add new benefit */}
            <div className="flex gap-2 mb-6">
              <Input
                value={newBenefitText}
                onChange={(e) => setNewBenefitText(e.target.value)}
                placeholder="Nouvel avantage..."
                onKeyDown={(e) => e.key === "Enter" && addBenefit()}
              />
              <Button onClick={addBenefit} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Benefits list */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={benefit.id} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <Input
                    value={benefit.text}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => deleteBenefit(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {benefits.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucun avantage. Ajoutez-en un ci-dessus.
              </p>
            )}

            <div className="flex gap-2 pt-6">
              <Button onClick={handleSaveBenefits} disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsManagingBenefits(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Manage Socials Sheet */}
      <Sheet open={isManagingSocials && !editingSocial} onOpenChange={setIsManagingSocials}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les réseaux sociaux</SheetTitle>
            <SheetDescription>
              Ajoutez, modifiez ou supprimez vos liens
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            <Button onClick={openNewSocial} className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un réseau
            </Button>

            <div className="space-y-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon] || Mail
                return (
                  <div
                    key={social.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">{social.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-50">
                        {social.url}
                      </p>
                    </div>

                    <Switch
                      checked={social.isActive}
                      onCheckedChange={() => handleToggleSocialActive(social)}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingSocial(social)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteSocial(social.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Social Sheet */}
      <Sheet open={!!editingSocial} onOpenChange={(open) => !open && setEditingSocial(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editingSocial?.id.startsWith("new-") ? "Nouveau réseau" : "Modifier le réseau"}
            </SheetTitle>
          </SheetHeader>

          {editingSocial && (
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input
                  value={editingSocial.name}
                  onChange={(e) => setEditingSocial({ ...editingSocial, name: e.target.value })}
                  placeholder="LinkedIn, GitHub, etc."
                />
              </div>

              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={editingSocial.url}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>Icône</Label>
                <Select
                  value={editingSocial.icon}
                  onValueChange={(value) => setEditingSocial({ ...editingSocial, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Actif</Label>
                <Switch
                  checked={editingSocial.isActive}
                  onCheckedChange={(checked) =>
                    setEditingSocial({ ...editingSocial, isActive: checked })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveSocial} disabled={isLoading} className="flex-1">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setEditingSocial(null)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Manage Tech Logos Sheet */}
      <Sheet open={isManagingLogos} onOpenChange={setIsManagingLogos}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les logos technologiques</SheetTitle>
            <SheetDescription>
              Logos affichés dans la section contact (ex: React, TypeScript, etc.)
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            {/* Add new logo */}
            <div className="space-y-3 mb-6">
              <div className="space-y-2">
                <Label>Chemin de l&apos;image</Label>
                <Input
                  value={newLogoSrc}
                  onChange={(e) => setNewLogoSrc(e.target.value)}
                  placeholder="/images/tech/react.svg"
                />
              </div>
              <div className="space-y-2">
                <Label>Texte alternatif</Label>
                <Input
                  value={newLogoAlt}
                  onChange={(e) => setNewLogoAlt(e.target.value)}
                  placeholder="React"
                  onKeyDown={(e) => e.key === "Enter" && addLogo()}
                />
              </div>
              <Button onClick={addLogo} className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter le logo
              </Button>
            </div>

            {/* Logos list */}
            <div className="space-y-3">
              {techLogos.map((logo, index) => (
                <div key={logo.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-8 h-8 bg-muted rounded flex items-center justify-center">
                      <img src={logo.src} alt={logo.alt} className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input
                        value={logo.src}
                        onChange={(e) => updateLogo(index, 'src', e.target.value)}
                        placeholder="Chemin de l'image"
                        className="text-xs"
                      />
                      <Input
                        value={logo.alt}
                        onChange={(e) => updateLogo(index, 'alt', e.target.value)}
                        placeholder="Texte alternatif"
                        className="text-xs"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive flex-shrink-0"
                      onClick={() => deleteLogo(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {techLogos.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucun logo. Ajoutez-en un ci-dessus.
              </p>
            )}

            <div className="flex gap-2 pt-6">
              <Button onClick={handleSaveLogos} disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsManagingLogos(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
