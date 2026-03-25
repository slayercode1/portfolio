"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Project } from "@prisma/client"

const projectSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  subtitle: z.string().min(1, "Le sous-titre est requis"),
  description: z.string().min(1, "La description est requise"),
  image: z.string().url("URL invalide").or(z.literal("")),
  technologies: z.string(),
  category: z.enum(["web", "mobile", "desktop"]),
  websiteUrl: z.string().url("URL invalide").or(z.literal("")),
  hasLiveUrl: z.boolean(),
  isPublished: z.boolean(),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: Project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      subtitle: project?.subtitle || "",
      description: project?.description || "",
      image: project?.image || "",
      technologies: project?.technologies?.join(", ") || "",
      category: project?.category || "web",
      websiteUrl: project?.websiteUrl || "",
      hasLiveUrl: project?.hasLiveUrl || false,
      isPublished: project?.isPublished ?? true,
    },
  })

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true)

    const payload = {
      ...data,
      technologies: data.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }

    try {
      const url = project
        ? `/api/ctrl-9f3k2x/projects/${project.id}`
        : "/api/ctrl-9f3k2x/projects"
      const method = project ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Erreur")

      toast.success(project ? "Projet mis à jour" : "Projet créé")
      router.push("/ctrl-9f3k2x/projects")
    } catch {
      toast.error("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/ctrl-9f3k2x/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <span className="text-sm text-muted-foreground">
          Retour aux projets
        </span>
      </div>

      <div className="grid gap-6 rounded-xl border bg-background p-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre *</Label>
          <Input id="title" {...register("title")} />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Sous-titre *</Label>
          <Input id="subtitle" {...register("subtitle")} />
          {errors.subtitle && (
            <p className="text-sm text-destructive">{errors.subtitle.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">URL de l&apos;image</Label>
          <Input
            id="image"
            {...register("image")}
            placeholder="https://example.com/image.jpg ou /images/projects/..."
          />
          {errors.image && (
            <p className="text-sm text-destructive">{errors.image.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Catégorie *</Label>
          <Select
            value={watch("category")}
            onValueChange={(value: "web" | "mobile" | "desktop") =>
              setValue("category", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="technologies">Technologies</Label>
          <Input
            id="technologies"
            {...register("technologies")}
            placeholder="React, TypeScript, Node.js (séparées par des virgules)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">URL du site</Label>
          <Input
            id="websiteUrl"
            {...register("websiteUrl")}
            placeholder="https://example.com"
          />
          {errors.websiteUrl && (
            <p className="text-sm text-destructive">
              {errors.websiteUrl.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasLiveUrl"
              {...register("hasLiveUrl")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="hasLiveUrl" className="text-sm font-normal cursor-pointer">
              URL en ligne
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              {...register("isPublished")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isPublished" className="text-sm font-normal cursor-pointer">
              Publié
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/ctrl-9f3k2x/projects">Annuler</Link>
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {project ? "Mettre à jour" : "Créer le projet"}
        </Button>
      </div>
    </form>
  )
}
