import React from 'react'
import Table from './Table'
import type { ColumnDef } from '@tanstack/react-table'

type ProjectRow = { name: string }

const sample: ProjectRow[] = [
  { name: 'Projet Alpha' },
  { name: 'Projet Beta' },
]

export default function ProjectsTable() {
  const columns: ColumnDef<ProjectRow>[] = [{ accessorKey: 'name', header: 'Nom' }]
  return <Table data={sample} columns={columns} />
}
