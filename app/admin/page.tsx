"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/lib/auth/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Pencil, Eye, LogOut, Loader2 } from "lucide-react"
import { signOut } from "@/lib/auth/client"
import { LOGIN_PATH } from '@/lib/constants'
import dynamic from 'next/dynamic'

const EditableHeroSection = dynamic(() =>
  import('@/components/admin/editable-hero').then(m => ({ default: m.EditableHeroSection })),
  { loading: () => <div className="animate-pulse h-96 bg-muted rounded" /> }
)

const EditableAboutSection = dynamic(() =>
  import('@/components/admin/editable-about').then(m => ({ default: m.EditableAboutSection })),
  { loading: () => <div className="animate-pulse h-96 bg-muted rounded" /> }
)

const EditableServicesSection = dynamic(() =>
  import('@/components/admin/editable-services').then(m => ({ default: m.EditableServicesSection })),
  { loading: () => <div className="animate-pulse h-96 bg-muted rounded" /> }
)

const EditableProjectsSection = dynamic(() =>
  import('@/components/admin/editable-projects').then(m => ({ default: m.EditableProjectsSection })),
  { loading: () => <div className="animate-pulse h-96 bg-muted rounded" /> }
)

const EditableContactSection = dynamic(() =>
  import('@/components/admin/editable-contact').then(m => ({ default: m.EditableContactSection })),
  { loading: () => <div className="animate-pulse h-96 bg-muted rounded" /> }
)

const EditableTechStack = dynamic(() =>
  import('@/components/admin/editable-tech-stack').then(m => ({ default: m.EditableTechStack })),
  { loading: () => <div className="animate-pulse h-96 bg-muted rounded" /> }
)

export default function AdminPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    if (!isPending && !session) {
      router.push(LOGIN_PATH)
    }
  }, [session, isPending, router])

  const handleLogout = async () => {
    await signOut()
    router.push(LOGIN_PATH)
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Admin Toolbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container-custom flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            <span className="text-sm text-muted-foreground">
              Cliquez sur <Pencil className="inline h-3 w-3" /> pour modifier une section
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {isPreviewMode ? "Mode édition" : "Aperçu"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open("/", "_blank")}
            >
              Voir le site
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Landing Page Style */}
      <main className="pt-14">
        {/* Hero Section */}
        <EditableHeroSection isPreviewMode={isPreviewMode} />

        {/* Tech Stack */}
        <EditableTechStack isPreviewMode={isPreviewMode} />

        {/* About Section */}
        <EditableAboutSection isPreviewMode={isPreviewMode} />

        {/* Services Section */}
        <EditableServicesSection isPreviewMode={isPreviewMode} />

        {/* Projects Section */}
        <EditableProjectsSection isPreviewMode={isPreviewMode} />

        {/* Contact Section */}
        <EditableContactSection isPreviewMode={isPreviewMode} />
      </main>
    </div>
  )
}
