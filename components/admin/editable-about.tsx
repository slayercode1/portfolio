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
import { Pencil, Loader2, Award, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Technology {
  id: string
  name: string
  icon: string
}

interface Certification {
  id?: string
  key: string
  title: string
}

interface AboutData {
  id?: string
  locale: string
  badge: string
  title: string
  description: string
  bio: string
  profileImage: string
  certificationsTitle: string
  stackTitle: string
  certifications?: Certification[]
}

interface EditableAboutSectionProps {
  isPreviewMode: boolean
}

export function EditableAboutSection({ isPreviewMode }: EditableAboutSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isManagingCertifications, setIsManagingCertifications] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [newCertKey, setNewCertKey] = useState("")
  const [newCertTitle, setNewCertTitle] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [aboutRes, techRes] = await Promise.all([
        fetch("/api/admin/about"),
        fetch("/api/admin/technologies"),
      ])

      if (aboutRes.ok) {
        const data = await aboutRes.json()
        const fr = data.find((a: AboutData) => a.locale === "fr")
        if (fr) {
          setAboutData(fr)
          setCertifications(fr.certifications || [])
        }
      }

      if (techRes.ok) {
        const data = await techRes.json()
        setTechnologies(data.filter((t: Technology & { isActive: boolean }) => t.isActive))
      }
    } catch {
      console.error("Error fetching data")
    }
  }

  const handleSave = async () => {
    if (!aboutData) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...aboutData,
          certifications: certifications.map((c) => ({ key: c.key, title: c.title })),
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Section À propos mise à jour")
      setIsEditing(false)
      fetchData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCertifications = async () => {
    if (!aboutData) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...aboutData,
          certifications: certifications.map((c) => ({ key: c.key, title: c.title })),
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Certifications mises à jour")
      setIsManagingCertifications(false)
      fetchData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const addCertification = () => {
    if (!newCertKey.trim() || !newCertTitle.trim()) return
    setCertifications([
      ...certifications,
      { key: newCertKey, title: newCertTitle },
    ])
    setNewCertKey("")
    setNewCertTitle("")
  }

  const updateCertification = (index: number, field: 'key' | 'title', value: string) => {
    const updated = [...certifications]
    updated[index] = { ...updated[index], [field]: value }
    setCertifications(updated)
  }

  const deleteCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  if (!aboutData) {
    return (
      <section className="py-24">
        <div className="container-custom flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="about" className="py-24 relative group">
        {/* Edit Buttons */}
        {!isPreviewMode && (
          <div className="absolute top-8 right-8 z-20 flex gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setIsManagingCertifications(true)}
              className="flex items-center gap-2 rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <Award className="h-4 w-4" />
              Certifications
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105"
            >
              <Pencil className="h-4 w-4" />
              Modifier À propos
            </button>
          </div>
        )}

        <div className="container-custom">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {aboutData.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            {aboutData.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {aboutData.description}
          </p>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-base text-muted-foreground leading-relaxed">
              {aboutData.bio}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-8">
              {aboutData.stackTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2"
                >
                  {tech.icon && (
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Edit Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Modifier la section À propos</SheetTitle>
            <SheetDescription>
              Modifiez vos informations personnelles
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label>Badge</Label>
              <Input
                value={aboutData.badge}
                onChange={(e) => setAboutData(prev => prev ? { ...prev, badge: e.target.value } : prev)}
                placeholder="À propos de moi"
              />
            </div>

            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={aboutData.title}
                onChange={(e) => setAboutData(prev => prev ? { ...prev, title: e.target.value } : prev)}
                placeholder="Qui suis-je ?"
              />
            </div>

            <div className="space-y-2">
              <Label>Description courte</Label>
              <textarea
                value={aboutData.description}
                onChange={(e) => setAboutData(prev => prev ? { ...prev, description: e.target.value } : prev)}
                rows={2}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Bio complète</Label>
              <textarea
                value={aboutData.bio}
                onChange={(e) => setAboutData(prev => prev ? { ...prev, bio: e.target.value } : prev)}
                rows={5}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Titre du stack technique</Label>
              <Input
                value={aboutData.stackTitle}
                onChange={(e) => setAboutData(prev => prev ? { ...prev, stackTitle: e.target.value } : prev)}
                placeholder="Mon stack technique"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Manage Certifications Sheet */}
      <Sheet open={isManagingCertifications} onOpenChange={setIsManagingCertifications}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les certifications</SheetTitle>
            <SheetDescription>
              Liste des certifications affichées dans la section À propos
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            {/* Add new certification */}
            <div className="space-y-3 mb-6">
              <div className="space-y-2">
                <Label>Clé (identifiant unique)</Label>
                <Input
                  value={newCertKey}
                  onChange={(e) => setNewCertKey(e.target.value)}
                  placeholder="aws-certified-developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Titre de la certification</Label>
                <Input
                  value={newCertTitle}
                  onChange={(e) => setNewCertTitle(e.target.value)}
                  placeholder="AWS Certified Developer"
                  onKeyDown={(e) => e.key === "Enter" && addCertification()}
                />
              </div>
              <Button onClick={addCertification} className="w-full" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter la certification
              </Button>
            </div>

            {/* Certifications list */}
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={cert.id || cert.key} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-amber-600 shrink-0 mt-1" />
                    <div className="flex-1 space-y-2">
                      <Input
                        value={cert.key}
                        onChange={(e) => updateCertification(index, 'key', e.target.value)}
                        placeholder="Clé"
                        className="text-xs font-mono"
                      />
                      <Input
                        value={cert.title}
                        onChange={(e) => updateCertification(index, 'title', e.target.value)}
                        placeholder="Titre"
                        className="text-sm"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive shrink-0"
                      onClick={() => deleteCertification(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {certifications.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Aucune certification. Ajoutez-en une ci-dessus.
              </p>
            )}

            <div className="flex gap-2 pt-6">
              <Button onClick={handleSaveCertifications} disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsManagingCertifications(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
