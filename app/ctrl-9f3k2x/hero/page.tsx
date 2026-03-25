"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

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
  // CTA Labels
  ctaProjects: string
  ctaCv: string
  // Stats Labels
  statsProjects: string
  statsExperience: string
  statsTechnologies: string
}

const defaultHero: Omit<HeroData, "locale"> = {
  greeting: "",
  name: "",
  title: "",
  description: "",
  cvUrl: "",
  heroImage: "",
  projectsCount: 5,
  experienceYears: 3,
  technologiesCount: 15,
  ctaProjects: "Voir mes projets",
  ctaCv: "Télécharger CV",
  statsProjects: "Projets",
  statsExperience: "Années d'expérience",
  statsTechnologies: "Technologies",
}

export default function HeroPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [heroFr, setHeroFr] = useState<HeroData>({ ...defaultHero, locale: "fr" })
  const [heroEn, setHeroEn] = useState<HeroData>({ ...defaultHero, locale: "en" })

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const res = await fetch("/api/admin/hero")
      if (res.ok) {
        const data = await res.json()
        const fr = data.find((h: HeroData) => h.locale === "fr")
        const en = data.find((h: HeroData) => h.locale === "en")
        if (fr) setHeroFr(fr)
        if (en) setHeroEn(en)
      }
    } catch {
      console.error("Error fetching hero data")
    }
  }

  const handleSave = async (locale: string) => {
    setIsLoading(true)
    const data = locale === "fr" ? heroFr : heroEn

    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(`Hero ${locale.toUpperCase()} mis à jour`)
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const renderForm = (
    hero: HeroData,
    setHero: React.Dispatch<React.SetStateAction<HeroData>>
  ) => (
    <div className="space-y-6 rounded-xl border bg-background p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Salutation</Label>
          <Input
            value={hero.greeting}
            onChange={(e) => setHero({ ...hero, greeting: e.target.value })}
            placeholder="Bonjour, je suis"
          />
        </div>
        <div className="space-y-2">
          <Label>Nom</Label>
          <Input
            value={hero.name}
            onChange={(e) => setHero({ ...hero, name: e.target.value })}
            placeholder="Yann Clain"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Titre / Rôle</Label>
        <Input
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
          placeholder="Développeur Web & Mobile"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <textarea
          value={hero.description}
          onChange={(e) => setHero({ ...hero, description: e.target.value })}
          rows={3}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          placeholder="Une courte description..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>URL du CV</Label>
          <Input
            value={hero.cvUrl || ""}
            onChange={(e) => setHero({ ...hero, cvUrl: e.target.value })}
            placeholder="/cv.pdf"
          />
        </div>
        <div className="space-y-2">
          <Label>Image Hero</Label>
          <Input
            value={hero.heroImage || ""}
            onChange={(e) => setHero({ ...hero, heroImage: e.target.value })}
            placeholder="/images/hero.png"
          />
        </div>
      </div>

      {/* CTA Buttons Labels */}
      <h3 className="text-lg font-medium pt-4">Boutons d&apos;action</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Texte bouton &quot;Projets&quot;</Label>
          <Input
            value={hero.ctaProjects || ""}
            onChange={(e) => setHero({ ...hero, ctaProjects: e.target.value })}
            placeholder="Voir mes projets"
          />
        </div>
        <div className="space-y-2">
          <Label>Texte bouton &quot;CV&quot;</Label>
          <Input
            value={hero.ctaCv || ""}
            onChange={(e) => setHero({ ...hero, ctaCv: e.target.value })}
            placeholder="Télécharger CV"
          />
        </div>
      </div>

      {/* Statistics */}
      <h3 className="text-lg font-medium pt-4">Statistiques</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Nombre de projets</Label>
          <Input
            type="number"
            value={hero.projectsCount}
            onChange={(e) =>
              setHero({ ...hero, projectsCount: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Années d&apos;expérience</Label>
          <Input
            type="number"
            value={hero.experienceYears}
            onChange={(e) =>
              setHero({ ...hero, experienceYears: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Nombre de technologies</Label>
          <Input
            type="number"
            value={hero.technologiesCount}
            onChange={(e) =>
              setHero({
                ...hero,
                technologiesCount: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

      {/* Stats Labels */}
      <h3 className="text-lg font-medium pt-4">Labels des statistiques</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Label &quot;Projets&quot;</Label>
          <Input
            value={hero.statsProjects || ""}
            onChange={(e) => setHero({ ...hero, statsProjects: e.target.value })}
            placeholder="Projets"
          />
        </div>
        <div className="space-y-2">
          <Label>Label &quot;Expérience&quot;</Label>
          <Input
            value={hero.statsExperience || ""}
            onChange={(e) => setHero({ ...hero, statsExperience: e.target.value })}
            placeholder="Années d'expérience"
          />
        </div>
        <div className="space-y-2">
          <Label>Label &quot;Technologies&quot;</Label>
          <Input
            value={hero.statsTechnologies || ""}
            onChange={(e) => setHero({ ...hero, statsTechnologies: e.target.value })}
            placeholder="Technologies"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => handleSave(hero.locale)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sauvegarder
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Header
        title="Section Hero"
        description="Modifiez la section principale de votre portfolio"
      />

      <div className="p-6">
        <Tabs defaultValue="fr">
          <TabsList className="mb-6">
            <TabsTrigger value="fr">Français</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          <TabsContent value="fr">{renderForm(heroFr, setHeroFr)}</TabsContent>
          <TabsContent value="en">{renderForm(heroEn, setHeroEn)}</TabsContent>
        </Tabs>
      </div>
    </>
  )
}
