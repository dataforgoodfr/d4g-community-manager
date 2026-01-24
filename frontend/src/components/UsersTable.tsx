import React, { useEffect, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
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
        const res = await fetch(new URL('../example.json', import.meta.url).toString())
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

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  if (loading) return <div>Chargement des utilisateurs...</div>

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 font-medium text-gray-700">
                  {header.isPlaceholder ? null : (
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-white even:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-gray-800 align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
