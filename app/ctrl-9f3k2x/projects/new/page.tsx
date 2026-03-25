import { Header } from "@/components/admin/header"
import { ProjectForm } from "../form"

export default function NewProjectPage() {
  return (
    <>
      <Header
        title="Nouveau projet"
        description="Créer un nouveau projet pour votre portfolio"
      />
      <div className="p-6">
        <ProjectForm />
      </div>
    </>
  )
}
