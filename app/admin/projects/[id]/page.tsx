import { Header } from "@/components/admin/header"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { ProjectForm } from "../form"

export const dynamic = "force-dynamic"

async function getProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  })
  return project
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Header
        title="Modifier le projet"
        description={project.title}
      />
      <div className="p-6">
        <ProjectForm project={project} />
      </div>
    </>
  )
}
