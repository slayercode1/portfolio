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
import { Switch } from "@/components/ui/switch"
import { Pencil, Loader2, Code, Smartphone, Server, Palette, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Service {
  id: string
  key: string
  locale: string
  title: string
  description: string
  badgeText: string
  order: number
  isActive: boolean
}

interface EditableServicesSectionProps {
  isPreviewMode: boolean
}

const serviceIcons: Record<string, React.ElementType> = {
  web: Code,
  mobile: Smartphone,
  backend: Server,
  design: Palette,
}

const iconOptions = [
  { value: "web", label: "Web (Code)" },
  { value: "mobile", label: "Mobile (Smartphone)" },
  { value: "backend", label: "Backend (Server)" },
  { value: "design", label: "Design (Palette)" },
]

export function EditableServicesSection({ isPreviewMode }: EditableServicesSectionProps) {
  const [isManaging, setIsManaging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services")
      if (res.ok) {
        const data = await res.json()
        setServices(data.filter((s: Service) => s.locale === "fr").sort((a: Service, b: Service) => a.order - b.order))
      }
    } catch {
      console.error("Error fetching services")
    }
  }

  const handleSaveService = async () => {
    if (!editingService) return
    setIsLoading(true)

    try {
      const isNew = !editingService.id || editingService.id.startsWith("new-")
      const url = isNew ? "/api/admin/services" : `/api/admin/services/${editingService.id}`
      const method = isNew ? "POST" : "PUT"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingService,
          locale: "fr",
        }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(isNew ? "Service ajouté" : "Service modifié")
      setEditingService(null)
      fetchServices()
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Supprimer ce service ?")) return

    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erreur")
      toast.success("Service supprimé")
      fetchServices()
    } catch {
      toast.error("Erreur lors de la suppression")
    }
  }

  const handleToggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...service, isActive: !service.isActive }),
      })
      if (!res.ok) throw new Error("Erreur")
      fetchServices()
    } catch {
      toast.error("Erreur lors de la modification")
    }
  }

  const openNewService = () => {
    setEditingService({
      id: `new-${Date.now()}`,
      key: "web",
      locale: "fr",
      title: "",
      description: "",
      badgeText: "",
      order: services.length,
      isActive: true,
    })
  }

  const activeServices = services.filter((s) => s.isActive)

  return (
    <>
      <section id="services" className="py-24 bg-secondary/30 relative group">
        {/* Edit Button */}
        {!isPreviewMode && (
          <div className="absolute top-8 right-8 z-20 flex gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={openNewService}
              className="flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Ajouter
            </button>
            <button
              onClick={() => setIsManaging(true)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105"
            >
              <Pencil className="h-4 w-4" />
              Gérer Services
            </button>
          </div>
        )}

        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">Ce que je propose</h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeServices.map((service) => {
              const Icon = serviceIcons[service.key] || Code
              return (
                <div
                  key={service.id}
                  className="rounded-xl border bg-background p-6 hover:shadow-lg transition-shadow relative group/card"
                >
                  {!isPreviewMode && (
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setEditingService(service)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {service.badgeText}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Management Sheet */}
      <Sheet open={isManaging} onOpenChange={setIsManaging}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Gérer les services</SheetTitle>
            <SheetDescription>
              Ajoutez, modifiez ou supprimez des services
            </SheetDescription>
          </SheetHeader>

          <div className="py-6">
            <Button onClick={openNewService} className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau service
            </Button>

            <div className="space-y-2">
              {services.map((service) => {
                const Icon = serviceIcons[service.key] || Code
                return (
                  <div
                    key={service.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-sm">{service.title}</p>
                      <p className="text-xs text-muted-foreground">{service.badgeText}</p>
                    </div>

                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => handleToggleActive(service)}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setIsManaging(false)
                        setEditingService(service)
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Service Sheet */}
      <Sheet open={!!editingService} onOpenChange={(open) => !open && setEditingService(null)}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editingService?.id.startsWith("new-") ? "Nouveau service" : "Modifier le service"}
            </SheetTitle>
          </SheetHeader>

          {editingService && (
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="Développement Web"
                />
              </div>

              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={editingService.badgeText}
                  onChange={(e) => setEditingService({ ...editingService, badgeText: e.target.value })}
                  placeholder="Web"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  placeholder="Description du service..."
                />
              </div>

              <div className="space-y-2">
                <Label>Icône</Label>
                <Select
                  value={editingService.key}
                  onValueChange={(value) => setEditingService({ ...editingService, key: value })}
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

              <div className="flex items-center justify-between">
                <Label>Actif</Label>
                <Switch
                  checked={editingService.isActive}
                  onCheckedChange={(checked) =>
                    setEditingService({ ...editingService, isActive: checked })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveService} disabled={isLoading} className="flex-1">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={() => setEditingService(null)}>
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
