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
import { Pencil, Loader2, ArrowDownIcon, DownloadIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface HeroData {
  id?: string
  locale: string
  greeting: string
  name: string
  title: string
  description: string
  cvUrl: string
  heroImage: string
  projectsCount: number
  experienceYears: number
  technologiesCount: number
}

interface EditableHeroSectionProps {
  isPreviewMode: boolean
}

export function EditableHeroSection({ isPreviewMode }: EditableHeroSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [heroData, setHeroData] = useState<HeroData | null>(null)

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const res = await fetch("/api/admin/hero")
      if (res.ok) {
        const data = await res.json()
        const fr = data.find((h: HeroData) => h.locale === "fr")
        if (fr) setHeroData(fr)
      }
    } catch {
      console.error("Error fetching hero data")
    }
  }

  const handleSave = async () => {
    if (!heroData) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroData),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Section Hero mise à jour")
      setIsEditing(false)
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  if (!heroData) {
    return (
      <section className="relative min-h-screen flex items-center pt-20 pb-16">
        <div className="container-custom flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden group"
      >
        {/* Edit Button */}
        {!isPreviewMode && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-24 right-8 z-20 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 opacity-0 group-hover:opacity-100"
          >
            <Pencil className="h-4 w-4" />
            Modifier Hero
          </button>
        )}

        {/* Background */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_75%)]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        {/* Main content */}
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">{heroData.greeting}</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-gradient">{heroData.name}</span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/90">
                  {heroData.title}
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {heroData.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-primary gap-2 text-base px-8">
                  Voir les projets
                  <ArrowDownIcon className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="btn-outline gap-2 text-base px-8">
                  Télécharger CV
                  <DownloadIcon className="w-4 h-4" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    {heroData.projectsCount}+
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Projets</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    {heroData.experienceYears}+
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Ans d&apos;expérience</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    {heroData.technologiesCount}+
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Technologies</p>
                </div>
              </div>
            </div>

            {/* Right column - Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 blur-3xl" />
                <Image
                  src={heroData.heroImage || "/images/Saly-43.png"}
                  alt="Illustration"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Modifier la section Hero</SheetTitle>
            <SheetDescription>
              Modifiez les informations de la section principale
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label>Salutation</Label>
              <Input
                value={heroData.greeting}
                onChange={(e) => setHeroData(prev => prev ? { ...prev, greeting: e.target.value } : prev)}
                placeholder="Bonjour, je suis"
              />
            </div>

            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                value={heroData.name}
                onChange={(e) => setHeroData(prev => prev ? { ...prev, name: e.target.value } : prev)}
                placeholder="Yann Clain"
              />
            </div>

            <div className="space-y-2">
              <Label>Titre / Rôle</Label>
              <Input
                value={heroData.title}
                onChange={(e) => setHeroData(prev => prev ? { ...prev, title: e.target.value } : prev)}
                placeholder="Développeur Web & Mobile"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={heroData.description}
                onChange={(e) => setHeroData(prev => prev ? { ...prev, description: e.target.value } : prev)}
                rows={3}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>URL du CV (PDF)</Label>
              <Input
                value={heroData.cvUrl || ""}
                onChange={(e) => setHeroData(prev => prev ? { ...prev, cvUrl: e.target.value } : prev)}
                placeholder="/cv/mon-cv.pdf ou https://..."
              />
              <p className="text-xs text-muted-foreground">
                Lien vers votre CV (fichier PDF dans /public ou URL externe)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Image Hero</Label>
              <Input
                value={heroData.heroImage || ""}
                onChange={(e) => setHeroData(prev => prev ? { ...prev, heroImage: e.target.value } : prev)}
                placeholder="/images/hero.png"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Projets</Label>
                <Input
                  type="number"
                  value={heroData.projectsCount}
                  onChange={(e) =>
                    setHeroData(prev => prev ? { ...prev, projectsCount: parseInt(e.target.value) || 0 } : prev)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Années exp.</Label>
                <Input
                  type="number"
                  value={heroData.experienceYears}
                  onChange={(e) =>
                    setHeroData(prev => prev ? { ...prev, experienceYears: parseInt(e.target.value) || 0 } : prev)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <Input
                  type="number"
                  value={heroData.technologiesCount}
                  onChange={(e) =>
                    setHeroData(prev => prev ? { ...prev, technologiesCount: parseInt(e.target.value) || 0 } : prev)
                  }
                />
              </div>
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
    </>
  )
}
