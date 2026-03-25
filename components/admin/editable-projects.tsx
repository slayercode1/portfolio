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
import { Pencil, Loader2, Plus, Trash2, ExternalLink, Upload } from "lucide-react"
import { useRef } from "react"
import { toast } from "sonner"
import Image from "next/image"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  technologies: string[]
  category: "web" | "mobile" | "desktop"
  websiteUrl?: string
  hasLiveUrl: boolean
  order: number
  isPublished: boolean
}

function ImageUploadField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error((await res.json()).error || "Upload failed")
      const { url } = await res.json()
      onChange(url)
      toast.success("Image uploadée")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur d'upload")
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>Image</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL ou uploader une image"
          className="flex-1"
        />
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        <Button type="button" variant="outline" size="icon" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        </Button>
      </div>
      {value && (
        <img src={value} alt="Preview" className="h-16 w-16 rounded object-cover border"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      )}
    </div>
  )
}

interface EditableProjectsSectionProps {
  isPreviewMode: boolean
}

export function EditableProjectsSection({ isPreviewMode }: EditableProjectsSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects")
      if (res.ok) {
        const data = await res.json()
        setProjects(data.filter((p: Project) => p.isPublished))
      }
    } catch {
      console.error("Error fetching projects")
    }
  }

  const handleSaveProject = async () => {
    if (!selectedProject) return
    setIsLoading(true)

    try {
      const url = selectedProject.id
        ? `/api/admin/projects/${selectedProject.id}`
        : "/api/admin/projects"
      const method = selectedProject.id ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProject),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success("Projet sauvegardé")
      setIsEditing(false)
      setSelectedProject(null)
      fetchProjects()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erreur")
      toast.success("Projet supprimé")
      fetchProjects()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const openEditProject = (project?: Project) => {
    setSelectedProject(
      project || {
        id: "",
        title: "",
        subtitle: "",
        description: "",
        image: "",
        technologies: [],
        category: "web",
        websiteUrl: "",
        hasLiveUrl: false,
        order: projects.length,
        isPublished: true,
      }
    )
    setIsEditing(true)
  }

  const currentProject = projects[activeProjectIndex]

  return (
    <>
      <section id="projects" className="py-24 relative group">
        {/* Edit Button */}
        {!isPreviewMode && (
          <div className="absolute top-8 right-8 z-20 flex gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => openEditProject()}
              className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105"
            >
              <Pencil className="h-4 w-4" />
              Gérer Projets
            </button>
          </div>
        )}

        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">Mes projets récents</h2>
          </div>

          {/* Projects Display */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Projects List */}
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProjectIndex(index)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    activeProjectIndex === index
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                    </div>
                    {!isPreviewMode && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditProject(project)
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteProject(project.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-2 py-0.5 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Project Preview */}
            {currentProject && (
              <div className="sticky top-24">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                  {currentProject.image ? (
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      Pas d&apos;image
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{currentProject.title}</h3>
                  <p className="text-muted-foreground mt-2">{currentProject.description}</p>
                  {currentProject.websiteUrl && (
                    <a
                      href={currentProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                    >
                      Voir le site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Edit Project Sheet */}
      <Sheet open={isEditing && selectedProject !== null} onOpenChange={(open) => {
        if (!open) {
          setSelectedProject(null)
        }
        setIsEditing(open)
      }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedProject?.id ? "Modifier le projet" : "Nouveau projet"}
            </SheetTitle>
            <SheetDescription>
              {selectedProject?.id
                ? "Modifiez les informations du projet"
                : "Ajoutez un nouveau projet à votre portfolio"}
            </SheetDescription>
          </SheetHeader>

          {selectedProject && (
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  value={selectedProject.title}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Sous-titre</Label>
                <Input
                  value={selectedProject.subtitle}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, subtitle: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  value={selectedProject.description}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, description: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>

              <ImageUploadField
                value={selectedProject.image}
                onChange={(url) => setSelectedProject({ ...selectedProject, image: url })}
              />

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select
                  value={selectedProject.category}
                  onValueChange={(value: "web" | "mobile" | "desktop") =>
                    setSelectedProject({ ...selectedProject, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Technologies (séparées par des virgules)</Label>
                <Input
                  value={selectedProject.technologies.join(", ")}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      technologies: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>URL du site</Label>
                <Input
                  value={selectedProject.websiteUrl || ""}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, websiteUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-hasLiveUrl"
                  checked={selectedProject.hasLiveUrl}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, hasLiveUrl: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="edit-hasLiveUrl" className="text-sm font-normal cursor-pointer">
                  Afficher le lien sur le site
                </Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveProject} disabled={isLoading} className="flex-1">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sauvegarder
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedProject(null)
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Projects List Sheet */}
      <Sheet open={isEditing && selectedProject === null} onOpenChange={setIsEditing}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les projets</SheetTitle>
            <SheetDescription>
              Cliquez sur un projet pour le modifier
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            <Button onClick={() => openEditProject()} className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau projet
            </Button>

            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditProject(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
