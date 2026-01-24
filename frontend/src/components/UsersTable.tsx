import React, { useEffect, useState } from 'react'
import Table from './Table'
import type { ColumnDef } from '@tanstack/react-table'

type UserRow = {
  username: string
  email: string
  avatar?: string | null
}

export default function UsersTable() {
  const [data, setData] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/v1/user/all')
        const json = await res.json()
        const rows: UserRow[] = (json || []).map((entry: any) => {
          const u = entry?.user || {}
          return {
            username: u.username || '',
            email: u.email || '',
            avatar: u.attributes?.avatar || null,
          }
        })
        if (mounted) setData(rows)
      } catch (e) {
        console.error('Failed to load example.json', e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const columns: ColumnDef<UserRow>[] = [
    {
      accessorKey: 'avatar',
      header: 'Photo',
      cell: (info) => {
        const url = info.getValue() as string | null | undefined
        return url ? (
          <img src={url} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200" />
        )
      },
    },
    { accessorKey: 'username', header: "Nom d'utilisateur" },
    { accessorKey: 'email', header: 'Email' },
  ]

  return <Table data={data} columns={columns} loading={loading} />
}
