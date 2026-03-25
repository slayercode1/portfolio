"use client"

import { Header } from "@/components/admin/header"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2, Plus, Trash2 } from "lucide-react"

interface Service {
  id?: string
  key: string
  locale: string
  title: string
  description: string
  badgeText: string
  order: number
  isActive: boolean
}

export default function ServicesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [servicesFr, setServicesFr] = useState<Service[]>([])
  const [servicesEn, setServicesEn] = useState<Service[]>([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services")
      if (res.ok) {
        const data = await res.json()
        setServicesFr(data.filter((s: Service) => s.locale === "fr"))
        setServicesEn(data.filter((s: Service) => s.locale === "en"))
      }
    } catch {
      console.error("Error fetching services")
    }
  }

  const handleSave = async (locale: string) => {
    setIsLoading(true)
    const services = locale === "fr" ? servicesFr : servicesEn

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services, locale }),
      })

      if (!res.ok) throw new Error("Erreur")
      toast.success(`Services ${locale.toUpperCase()} mis à jour`)
    } catch {
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsLoading(false)
    }
  }

  const updateService = (
    locale: string,
    index: number,
    field: keyof Service,
    value: string | boolean
  ) => {
    if (locale === "fr") {
      const updated = [...servicesFr]
      updated[index] = { ...updated[index], [field]: value }
      setServicesFr(updated)
    } else {
      const updated = [...servicesEn]
      updated[index] = { ...updated[index], [field]: value }
      setServicesEn(updated)
    }
  }

  const addService = (locale: string) => {
    const services = locale === "fr" ? servicesFr : servicesEn
    const newService: Service = {
      key: `service_${Date.now()}`,
      locale,
      title: "",
      description: "",
      badgeText: "",
      order: services.length,
      isActive: true,
    }

    if (locale === "fr") {
      setServicesFr([...servicesFr, newService])
    } else {
      setServicesEn([...servicesEn, newService])
    }
  }

  const removeService = (locale: string, index: number) => {
    if (locale === "fr") {
      setServicesFr(servicesFr.filter((_, i) => i !== index))
    } else {
      setServicesEn(servicesEn.filter((_, i) => i !== index))
    }
  }

  const renderForm = (services: Service[], locale: string) => (
    <div className="space-y-6">
      {services.map((service, index) => (
        <div
          key={service.id || index}
          className="rounded-xl border bg-background p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Service {index + 1}
              {service.key && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({service.key})
                </span>
              )}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeService(locale, index)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={service.title}
                onChange={(e) =>
                  updateService(locale, index, "title", e.target.value)
                }
                placeholder="Développement Web"
              />
            </div>
            <div className="space-y-2">
              <Label>Badge</Label>
              <Input
                value={service.badgeText}
                onChange={(e) =>
                  updateService(locale, index, "badgeText", e.target.value)
                }
                placeholder="Frontend & Backend"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label>Description</Label>
            <textarea
              value={service.description}
              onChange={(e) =>
                updateService(locale, index, "description", e.target.value)
              }
              rows={3}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => addService(locale)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un service
        </Button>
        <Button onClick={() => handleSave(locale)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sauvegarder
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Header
        title="Services"
        description="Gérez les services que vous proposez"
      />

      <div className="p-6">
        <Tabs defaultValue="fr">
          <TabsList className="mb-6">
            <TabsTrigger value="fr">Français</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          <TabsContent value="fr">{renderForm(servicesFr, "fr")}</TabsContent>
          <TabsContent value="en">{renderForm(servicesEn, "en")}</TabsContent>
        </Tabs>
      </div>
    </>
  )
}
