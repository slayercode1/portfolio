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
import { Switch } from "@/components/ui/switch"
import { Pencil, Loader2, Plus, Trash2, GripVertical } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Technology {
  id: string
  name: string
  icon: string
  order: number
  isActive: boolean
}

interface EditableTechStackProps {
  isPreviewMode: boolean
}

export function EditableTechStack({ isPreviewMode }: EditableTechStackProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [editingTech, setEditingTech] = useState<Technology | null>(null)

  useEffect(() => {
    fetchTechnologies()
  }, [])

  const fetchTechnologies = async () => {
    try {
      const res = await fetch("/api/admin/technologies")
      if (res.ok) {
        const data = await res.json()
        setTechnologies(data.sort((a: Technology, b: Technology) => a.order - b.order))
      }
    } catch {
      console.error("Error fetching technologies")
    }
  }

  const handleSaveTech = async () => {
    if (!editingTech) return
    setIsLoading(true)

    try {
      const isNew = !editingTech.id || editingTech.id.startsWith("new-")
      const url = isNew ? "/api/admin/technologies" : `/api/admin/technologies/${editingTech.id}`
      const method = isNew ? "POST" : "PUT"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingTech.name,
          icon: editingTech.icon,
          order: editingTech.order,
          isActive: editingTech.isActive,
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(isNew ? "Technologie ajoutée" : "Technologie modifiée")
      setEditingTech(null)
      fetchTechnologies()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTech = async (id: string) => {
    if (!confirm("Supprimer cette technologie ?")) return

    try {
      const res = await fetch(`/api/admin/technologies/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erreur")
      toast.success("Technologie supprimée")
      fetchTechnologies()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleToggleActive = async (tech: Technology) => {
    try {
      const res = await fetch(`/api/admin/technologies/${tech.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...tech, isActive: !tech.isActive }),
      })
      if (!res.ok) throw new Error("Erreur")
      fetchTechnologies()
    } catch {
      toast.error("Erreur lors de la modification")
    }
  }

  const openNewTech = () => {
    setEditingTech({
      id: `new-${Date.now()}`,
      name: "",
      icon: "",
      order: technologies.length,
      isActive: true,
    })
  }

  const activeTechs = technologies.filter((t) => t.isActive)

  return (
    <>
      {/* Tech Logos Scroll Section */}
      <section className="py-12 border-y border-border/50 bg-secondary/20 relative group">
        {!isPreviewMode && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-8 z-20 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 opacity-0 group-hover:opacity-100"
          >
            <Pencil className="h-4 w-4" />
            Gérer Technologies
          </button>
        )}

        <div className="container-custom">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Technologies
          </p>

          {/* Scrolling logos display */}
          <div className="flex flex-wrap justify-center gap-8">
            {activeTechs.slice(0, 12).map((tech) => (
              <div
                key={tech.id}
                className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
              >
                {tech.icon ? (
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="grayscale hover:grayscale-0 transition-all"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs">
                    {tech.name.charAt(0)}
                  </div>
                )}
                <span className="text-xs text-muted-foreground">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Sheet */}
      <Sheet open={isEditing && !editingTech} onOpenChange={setIsEditing}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les technologies</SheetTitle>
            <SheetDescription>
              Ajoutez, modifiez ou supprimez des technologies
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            <Button onClick={openNewTech} className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une technologie
            </Button>

            <div className="space-y-2">
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />

                  {tech.icon ? (
                    <Image src={tech.icon} alt={tech.name} width={24} height={24} />
                  ) : (
                    <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                      {tech.name.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-medium text-sm">{tech.name}</p>
                  </div>

                  <Switch
                    checked={tech.isActive}
                    onCheckedChange={() => handleToggleActive(tech)}
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditingTech(tech)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => handleDeleteTech(tech.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Single Tech Sheet */}
      <Sheet open={!!editingTech} onOpenChange={(open) => !open && setEditingTech(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editingTech?.id.startsWith("new-") ? "Nouvelle technologie" : "Modifier la technologie"}
            </SheetTitle>
          </SheetHeader>

          {editingTech && (
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input
                  value={editingTech.name}
                  onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                  placeholder="React, TypeScript, etc."
                />
              </div>

              <div className="space-y-2">
                <Label>Icône (URL)</Label>
                <Input
                  value={editingTech.icon}
                  onChange={(e) => setEditingTech({ ...editingTech, icon: e.target.value })}
                  placeholder="/images/tech/react.svg"
                />
                <p className="text-xs text-muted-foreground">
                  Chemin vers l'icône SVG dans /public
                </p>
              </div>

              {editingTech.icon && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  <Image src={editingTech.icon} alt="Preview" width={32} height={32} />
                  <span className="text-sm">Aperçu de l'icône</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch
                  checked={editingTech.isActive}
                  onCheckedChange={(checked) =>
                    setEditingTech({ ...editingTech, isActive: checked })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveTech} disabled={isLoading} className="flex-1">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setEditingTech(null)}>
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
