"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Plus, Trash2, Loader2 } from "lucide-react"

interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  order: number
  isActive: boolean
}

const iconOptions = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter/X" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "dribbble", label: "Dribbble" },
  { value: "behance", label: "Behance" },
]

export default function SocialsPage() {
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newSocial, setNewSocial] = useState({ name: "", url: "", icon: "linkedin" })

  useEffect(() => {
    fetchSocials()
  }, [])

  const fetchSocials = async () => {
    try {
      const res = await fetch("/api/admin/socials")
      if (res.ok) {
        const data = await res.json()
        setSocials(data)
      }
    } catch {
      console.error("Error fetching socials")
    }
  }

  const handleAdd = async () => {
    if (!newSocial.name || !newSocial.url) {
      toast.error("Nom et URL requis")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/socials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newSocial,
          order: socials.length,
          isActive: true,
        }),
      })

      if (!res.ok) throw new Error("Erreur")

      toast.success("Lien social ajouté")
      setNewSocial({ name: "", url: "", icon: "linkedin" })
      fetchSocials()
    } catch {
      toast.error("Erreur lors de l'ajout")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/socials/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Erreur")

      toast.success("Lien supprimé")
      fetchSocials()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  return (
    <>
      <Header
        title="Réseaux sociaux"
        description="Gérez vos liens de réseaux sociaux"
      />

      <div className="p-6">
        {/* Add new social */}
        <div className="mb-8 rounded-xl border bg-background p-6">
          <h3 className="mb-4 text-lg font-medium">Ajouter un lien</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                placeholder="LinkedIn"
                value={newSocial.name}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                placeholder="https://linkedin.com/in/..."
                value={newSocial.url}
                onChange={(e) =>
                  setNewSocial({ ...newSocial, url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Icône</Label>
              <Select
                value={newSocial.icon}
                onValueChange={(value) =>
                  setNewSocial({ ...newSocial, icon: value })
                }
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
            <div className="flex items-end">
              <Button onClick={handleAdd} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Ajouter
              </Button>
            </div>
          </div>
        </div>

        {/* Socials list */}
        <div className="rounded-xl border bg-background">
          <div className="border-b p-4">
            <h3 className="font-medium">
              {socials.length} lien{socials.length > 1 ? "s" : ""}
            </h3>
          </div>

          {socials.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Aucun lien social ajouté
            </div>
          ) : (
            <ul className="divide-y">
              {socials.map((social) => (
                <li
                  key={social.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <span className="text-sm capitalize">{social.icon[0]}</span>
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{social.name}</p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      {social.url}
                    </a>
                  </div>

                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs capitalize">
                    {social.icon}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(social.id)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
