import { createFileRoute } from '@tanstack/react-router'
import Main from '../components/Main'

export const Route = createFileRoute('/users')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <Main title="Tous les utilisateurs">
      <p>Page de gestion des utilisateurs — contenu à implémenter.</p>
    </Main>
  )
}
