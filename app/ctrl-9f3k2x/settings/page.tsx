"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface SiteSettings {
  id?: string
  siteName: string
  siteUrl: string
  logoUrl: string
  faviconUrl: string
  metaTitle: string
  metaDescription: string
}

const defaultSettings: SiteSettings = {
  siteName: "Yann Clain Portfolio",
  siteUrl: "",
  logoUrl: "",
  faviconUrl: "",
  metaTitle: "",
  metaDescription: "",
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings")
      if (res.ok) {
        const data = await res.json()
        if (data) setSettings(data)
      }
    } catch {
      console.error("Error fetching settings")
    }
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Paramètres mis à jour")
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header
        title="Paramètres"
        description="Configurez les paramètres généraux de votre portfolio"
      />

      <div className="p-6">
        <div className="max-w-2xl space-y-8">
          {/* General */}
          <div className="rounded-xl border bg-background p-6">
            <h3 className="mb-4 text-lg font-medium">Général</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nom du site</Label>
                <Input
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  placeholder="Mon Portfolio"
                />
              </div>
              <div className="space-y-2">
                <Label>URL du site</Label>
                <Input
                  value={settings.siteUrl}
                  onChange={(e) =>
                    setSettings({ ...settings, siteUrl: e.target.value })
                  }
                  placeholder="https://monportfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Branding */}
          <div className="rounded-xl border bg-background p-6">
            <h3 className="mb-4 text-lg font-medium">Branding</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>URL du logo</Label>
                <Input
                  value={settings.logoUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, logoUrl: e.target.value })
                  }
                  placeholder="/images/logo.png"
                />
              </div>
              <div className="space-y-2">
                <Label>URL du favicon</Label>
                <Input
                  value={settings.faviconUrl || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, faviconUrl: e.target.value })
                  }
                  placeholder="/favicon.png"
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-xl border bg-background p-6">
            <h3 className="mb-4 text-lg font-medium">SEO</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titre meta</Label>
                <Input
                  value={settings.metaTitle || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, metaTitle: e.target.value })
                  }
                  placeholder="Yann Clain - Développeur Web & Mobile"
                />
              </div>
              <div className="space-y-2">
                <Label>Description meta</Label>
                <textarea
                  value={settings.metaDescription || ""}
                  onChange={(e) =>
                    setSettings({ ...settings, metaDescription: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="Description pour les moteurs de recherche..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sauvegarder les paramètres
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
