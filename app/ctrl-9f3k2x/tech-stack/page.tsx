"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Plus, Trash2, GripVertical, Loader2 } from "lucide-react"
import Image from "next/image"

interface Technology {
  id: string
  name: string
  icon: string
  order: number
  isActive: boolean
}

export default function TechStackPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newTech, setNewTech] = useState({ name: "", icon: "" })

  useEffect(() => {
    fetchTechnologies()
  }, [])

  const fetchTechnologies = async () => {
    try {
      const res = await fetch("/api/admin/technologies")
      if (res.ok) {
        const data = await res.json()
        setTechnologies(data)
      }
    } catch {
      console.error("Error fetching technologies")
    }
  }

  const handleAdd = async () => {
    if (!newTech.name || !newTech.icon) {
      toast.error("Nom et icône requis")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/technologies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTech,
          order: technologies.length,
          isActive: true,
        }),
      })

      if (!res.ok) throw new Error("Erreur")

      toast.success("Technologie ajoutée")
      setNewTech({ name: "", icon: "" })
      fetchTechnologies()
    } catch {
      toast.error("Erreur lors de l'ajout")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/technologies/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Erreur")

      toast.success("Technologie supprimée")
      fetchTechnologies()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleToggle = async (tech: Technology) => {
    try {
      const res = await fetch(`/api/admin/technologies/${tech.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !tech.isActive }),
      })

      if (!res.ok) throw new Error("Erreur")

      fetchTechnologies()
    } catch {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  return (
    <>
      <Header
        title="Tech Stack"
        description="Gérez les technologies affichées sur votre portfolio"
      />

      <div className="p-6">
        {/* Add new technology */}
        <div className="mb-8 rounded-xl border bg-background p-6">
          <h3 className="mb-4 text-lg font-medium">Ajouter une technologie</h3>
          <div className="flex gap-4">
            <Input
              placeholder="Nom (ex: React)"
              value={newTech.name}
              onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
              className="max-w-xs"
            />
            <Input
              placeholder="Chemin de l'icône (ex: /images/tech/react.svg)"
              value={newTech.icon}
              onChange={(e) => setNewTech({ ...newTech, icon: e.target.value })}
              className="flex-1"
            />
            <Button onClick={handleAdd} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Ajouter
            </Button>
          </div>
        </div>

        {/* Technologies list */}
        <div className="rounded-xl border bg-background">
          <div className="border-b p-4">
            <h3 className="font-medium">
              {technologies.length} technologie{technologies.length > 1 ? "s" : ""}
            </h3>
          </div>

          {technologies.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Aucune technologie ajoutée
            </div>
          ) : (
            <ul className="divide-y">
              {technologies.map((tech) => (
                <li
                  key={tech.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50"
                >
                  <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {tech.icon.startsWith("/") ? (
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <span className="text-xs">{tech.name[0]}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{tech.name}</p>
                    <p className="text-sm text-muted-foreground">{tech.icon}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggle(tech)}
                    className={tech.isActive ? "text-green-600" : "text-muted-foreground"}
                  >
                    {tech.isActive ? "Actif" : "Inactif"}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(tech.id)}
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
