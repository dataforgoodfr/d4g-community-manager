import { createFileRoute } from '@tanstack/react-router'
import Main from '../components/Main'
import ProjectsTable from '@/components/ProjectsTable'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <Main title="Tous les Projets">
      <p>Page de gestion des projets</p>
      <ProjectsTable />
    </Main>
  )
}
