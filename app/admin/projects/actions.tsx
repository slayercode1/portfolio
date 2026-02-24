"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Erreur lors de la suppression")

      toast.success("Projet supprimé")
      router.refresh()
    } catch {
      toast.error("Erreur lors de la suppression")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le projet ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le projet sera définitivement supprimé.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function TogglePublishButton({
  projectId,
  isPublished,
}: {
  projectId: string
  isPublished: boolean
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      })

      if (!res.ok) throw new Error("Erreur")

      toast.success(isPublished ? "Projet masqué" : "Projet publié")
      router.refresh()
    } catch {
      toast.error("Erreur lors de la mise à jour")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      className={isPublished ? "text-green-600" : "text-muted-foreground"}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : isPublished ? (
        <Eye className="mr-2 h-4 w-4" />
      ) : (
        <EyeOff className="mr-2 h-4 w-4" />
      )}
      {isPublished ? "Publié" : "Masqué"}
    </Button>
  )
}
