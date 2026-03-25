import { Header } from "@/components/admin/header"
import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Pencil, ExternalLink } from "lucide-react"
import Image from "next/image"

export const dynamic = "force-dynamic"
import { DeleteProjectButton, TogglePublishButton } from "./actions"

async function getProjects() {
  return prisma.project.findMany({
    orderBy: { order: "asc" },
  })
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <Header
        title="Projets"
        description="Gérez vos projets de portfolio"
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {projects.length} projet{projects.length > 1 ? "s" : ""}
          </p>
          <Button asChild>
            <Link href="/ctrl-9f3k2x/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau projet
            </Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/50 py-16">
            <p className="text-lg font-medium">Aucun projet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Commencez par créer votre premier projet
            </p>
            <Button asChild className="mt-4">
              <Link href="/ctrl-9f3k2x/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Créer un projet
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-background">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Titre
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Catégorie
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-20 overflow-hidden rounded-md bg-muted">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.subtitle}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium capitalize">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <TogglePublishButton
                        projectId={project.id}
                        isPublished={project.isPublished}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {project.websiteUrl && (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                          >
                            <a
                              href={project.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/ctrl-9f3k2x/projects/${project.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteProjectButton projectId={project.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
