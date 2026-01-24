import { createFileRoute } from '@tanstack/react-router'
import Main from '../components/Main'
import UsersTable from '../components/UsersTable'

export const Route = createFileRoute('/users')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <Main title="Tous les utilisateurs">
      <p className="mb-4">Page de gestion des utilisateurs</p>
      <UsersTable />

    </Main>
  )
}
