import React, { useEffect, useState } from 'react'
import Table from './Table'
import type { ColumnDef } from '@tanstack/react-table'

type ProjectRow = { display_name: string }

export default function ProjectsTable() {
  const [data, setData] = useState<ProjectRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/v1/project/projectsByTeam/o9hyz7uf13dxur199uh3eifckr')
        const json = await res.json()
        const rows: ProjectRow[] = (json || []).map((entry: any) => {
          const p = entry?.project || entry || {}
          return {
            display_name: p.display_name || '',
          }
        })
        if (mounted) setData(rows)
      } catch (e) {
        console.error('Failed to load projects', e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  console.log(data)

  const columns: ColumnDef<ProjectRow>[] = [{ accessorKey: 'display_name', header: 'Nom' }]
  return <Table data={data} columns={columns} loading={loading} />
}
