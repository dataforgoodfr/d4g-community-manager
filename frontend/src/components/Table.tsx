import React from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

type TableProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  loading?: boolean
}

export default function Table<T>({ data, columns, loading }: TableProps<T>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  if (loading) return <div>Chargement…</div>

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
