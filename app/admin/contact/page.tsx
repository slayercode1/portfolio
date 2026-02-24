"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2, Plus, Trash2 } from "lucide-react"

interface ContactData {
  id?: string
  locale: string
  badge: string
  title: string
  description: string
  socialsTitle: string
  benefits: { id?: string; text: string; order: number }[]
  stats: { id?: string; value: string; label: string; order: number }[]
}

const defaultContact: Omit<ContactData, "locale"> = {
  badge: "",
  title: "",
  description: "",
  socialsTitle: "",
  benefits: [],
  stats: [],
}

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [contactFr, setContactFr] = useState<ContactData>({
    ...defaultContact,
    locale: "fr",
  })
  const [contactEn, setContactEn] = useState<ContactData>({
    ...defaultContact,
    locale: "en",
  })

  useEffect(() => {
    fetchContactData()
  }, [])

  const fetchContactData = async () => {
    try {
      const res = await fetch("/api/admin/contact")
      if (res.ok) {
        const data = await res.json()
        const fr = data.find((c: ContactData) => c.locale === "fr")
        const en = data.find((c: ContactData) => c.locale === "en")
        if (fr) setContactFr(fr)
        if (en) setContactEn(en)
      }
    } catch {
      console.error("Error fetching contact data")
    }
  }

  const handleSave = async (locale: string) => {
    setIsLoading(true)
    const data = locale === "fr" ? contactFr : contactEn

    try {
      const res = await fetch("/api/admin/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(`Contact ${locale.toUpperCase()} mis à jour`)
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const renderForm = (
    contact: ContactData,
    setContact: React.Dispatch<React.SetStateAction<ContactData>>
  ) => (
    <div className="space-y-8">
      {/* Basic info */}
      <div className="rounded-xl border bg-background p-6">
        <h3 className="mb-4 text-lg font-medium">Informations générales</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Badge</Label>
            <Input
              value={contact.badge}
              onChange={(e) => setContact({ ...contact, badge: e.target.value })}
              placeholder="Contact"
            />
          </div>
          <div className="space-y-2">
            <Label>Titre des réseaux sociaux</Label>
            <Input
              value={contact.socialsTitle}
              onChange={(e) =>
                setContact({ ...contact, socialsTitle: e.target.value })
              }
              placeholder="Mes réseaux"
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Titre</Label>
          <Input
            value={contact.title}
            onChange={(e) => setContact({ ...contact, title: e.target.value })}
            placeholder="Travaillons ensemble"
          />
        </div>
        <div className="mt-4 space-y-2">
          <Label>Description</Label>
          <textarea
            value={contact.description}
            onChange={(e) =>
              setContact({ ...contact, description: e.target.value })
            }
            rows={3}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="rounded-xl border bg-background p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Avantages</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContact({
                ...contact,
                benefits: [
                  ...contact.benefits,
                  { text: "", order: contact.benefits.length },
                ],
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {contact.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={benefit.text}
                onChange={(e) => {
                  const updated = [...contact.benefits]
                  updated[index] = { ...updated[index], text: e.target.value }
                  setContact({ ...contact, benefits: updated })
                }}
                placeholder="Avantage..."
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const updated = contact.benefits.filter((_, i) => i !== index)
                  setContact({ ...contact, benefits: updated })
                }}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-xl border bg-background p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Statistiques</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setContact({
                ...contact,
                stats: [
                  ...contact.stats,
                  { value: "", label: "", order: contact.stats.length },
                ],
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {contact.stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={stat.value}
                onChange={(e) => {
                  const updated = [...contact.stats]
                  updated[index] = { ...updated[index], value: e.target.value }
                  setContact({ ...contact, stats: updated })
                }}
                placeholder="Valeur (ex: 100%)"
                className="w-32"
              />
              <Input
                value={stat.label}
                onChange={(e) => {
                  const updated = [...contact.stats]
                  updated[index] = { ...updated[index], label: e.target.value }
                  setContact({ ...contact, stats: updated })
                }}
                placeholder="Label"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const updated = contact.stats.filter((_, i) => i !== index)
                  setContact({ ...contact, stats: updated })
                }}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => handleSave(contact.locale)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sauvegarder
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Header
        title="Section Contact"
        description="Modifiez la section contact de votre portfolio"
      />

      <div className="p-6">
        <Tabs defaultValue="fr">
          <TabsList className="mb-6">
            <TabsTrigger value="fr">Français</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          <TabsContent value="fr">{renderForm(contactFr, setContactFr)}</TabsContent>
          <TabsContent value="en">{renderForm(contactEn, setContactEn)}</TabsContent>
        </Tabs>
      </div>
    </>
  )
}
