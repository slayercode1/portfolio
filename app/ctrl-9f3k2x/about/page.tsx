"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2, Plus, Trash2 } from "lucide-react"

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
  certifications: Certification[]
}

const defaultAbout: Omit<AboutData, "locale"> = {
  badge: "",
  title: "",
  description: "",
  bio: "",
  profileImage: "",
  certificationsTitle: "",
  stackTitle: "",
  certifications: [],
}

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [aboutFr, setAboutFr] = useState<AboutData>({ ...defaultAbout, locale: "fr" })
  const [aboutEn, setAboutEn] = useState<AboutData>({ ...defaultAbout, locale: "en" })

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const res = await fetch("/api/admin/about")
      if (res.ok) {
        const data = await res.json()
        const fr = data.find((a: AboutData) => a.locale === "fr")
        const en = data.find((a: AboutData) => a.locale === "en")
        if (fr) setAboutFr(fr)
        if (en) setAboutEn(en)
      }
    } catch {
      console.error("Error fetching about data")
    }
  }

  const handleSave = async (locale: string) => {
    setIsLoading(true)
    const data = locale === "fr" ? aboutFr : aboutEn

    try {
      const res = await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(`About ${locale.toUpperCase()} mis à jour`)
      fetchAboutData()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const addCertification = (locale: string) => {
    const setAbout = locale === "fr" ? setAboutFr : setAboutEn
    const about = locale === "fr" ? aboutFr : aboutEn

    setAbout({
      ...about,
      certifications: [
        ...about.certifications,
        { key: `cert-${Date.now()}`, title: "" }
      ]
    })
  }

  const updateCertification = (locale: string, index: number, title: string) => {
    const setAbout = locale === "fr" ? setAboutFr : setAboutEn
    const about = locale === "fr" ? aboutFr : aboutEn

    const updated = [...about.certifications]
    updated[index] = { ...updated[index], title }
    setAbout({ ...about, certifications: updated })
  }

  const removeCertification = (locale: string, index: number) => {
    const setAbout = locale === "fr" ? setAboutFr : setAboutEn
    const about = locale === "fr" ? aboutFr : aboutEn

    const updated = about.certifications.filter((_, i) => i !== index)
    setAbout({ ...about, certifications: updated })
  }

  const renderForm = (
    about: AboutData,
    setAbout: React.Dispatch<React.SetStateAction<AboutData>>
  ) => (
    <div className="space-y-6 rounded-xl border bg-background p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Badge</Label>
          <Input
            value={about.badge}
            onChange={(e) => setAbout({ ...about, badge: e.target.value })}
            placeholder="À propos de moi"
          />
        </div>
        <div className="space-y-2">
          <Label>Titre</Label>
          <Input
            value={about.title}
            onChange={(e) => setAbout({ ...about, title: e.target.value })}
            placeholder="Qui suis-je ?"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description courte</Label>
        <textarea
          value={about.description}
          onChange={(e) => setAbout({ ...about, description: e.target.value })}
          rows={2}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label>Bio complète</Label>
        <textarea
          value={about.bio}
          onChange={(e) => setAbout({ ...about, bio: e.target.value })}
          rows={5}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <Label>Image de profil</Label>
        <Input
          value={about.profileImage || ""}
          onChange={(e) => setAbout({ ...about, profileImage: e.target.value })}
          placeholder="/images/profile.jpg"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Titre certifications</Label>
          <Input
            value={about.certificationsTitle}
            onChange={(e) =>
              setAbout({ ...about, certificationsTitle: e.target.value })
            }
            placeholder="Mes certifications"
          />
        </div>
        <div className="space-y-2">
          <Label>Titre stack technique</Label>
          <Input
            value={about.stackTitle}
            onChange={(e) => setAbout({ ...about, stackTitle: e.target.value })}
            placeholder="Mon stack technique"
          />
        </div>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Certifications</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addCertification(about.locale)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>

        {about.certifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune certification ajoutée</p>
        ) : (
          <div className="space-y-3">
            {about.certifications.map((cert, index) => (
              <div key={cert.id || index} className="flex items-center gap-2">
                <Input
                  value={cert.title}
                  onChange={(e) => updateCertification(about.locale, index, e.target.value)}
                  placeholder="Titre de la certification"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCertification(about.locale, index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => handleSave(about.locale)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sauvegarder
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Header
        title="Section À propos"
        description="Modifiez la section À propos de votre portfolio"
      />

      <div className="p-6">
        <Tabs defaultValue="fr">
          <TabsList className="mb-6">
            <TabsTrigger value="fr">Français</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          <TabsContent value="fr">{renderForm(aboutFr, setAboutFr)}</TabsContent>
          <TabsContent value="en">{renderForm(aboutEn, setAboutEn)}</TabsContent>
        </Tabs>
      </div>
    </>
  )
}
