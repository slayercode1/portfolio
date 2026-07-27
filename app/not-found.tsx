'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h3 className="text-muted-foreground font-medium text-sm">
            Erreur 404
          </h3>
          <p className="text-foreground text-3xl font-semibold sm:text-4xl tracking-tight">
            Page introuvable
          </p>
          <p className="text-muted-foreground">
            Désolé, la page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant={"default"} onClick={() => router.push('/')}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
