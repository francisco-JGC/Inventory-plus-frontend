"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DateFormat } from "@/utils/date-format"

const data: product[] = [
  {
    id: "m5gr84i9",
    stock: 316,
    status: "show",
    product_name: "ken99@yahoo.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "3u1reuv4",
    stock: 242,
    status: "show",
    product_name: "Abe45@gmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "derv1ws0",
    stock: 837,
    status: "hide",
    product_name: "Monserrat44@gmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "5kma53ae",
    stock: 874,
    status: "show",
    product_name: "Silas22@gmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "bhqecj4p",
    stock: 721,
    status: "hide",
    product_name: "carmella@hotmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "m5gr84i9",
    stock: 316,
    status: "show",
    product_name: "ken99@yahoo.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "3u1reuv4",
    stock: 242,
    status: "show",
    product_name: "Abe45@gmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "derv1ws0",
    stock: 837,
    status: "hide",
    product_name: "Monserrat44@gmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "5kma53ae",
    stock: 874,
    status: "show",
    product_name: "Silas22@gmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "bhqecj4p",
    stock: 721,
    status: "hide",
    product_name: "carmella@hotmail.com",
    low_sotck_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
]

export type product = {
  id: string
  stock: number
  status: "hide" | "show"
  product_name: string
  low_sotck_limit: number
  price: 250,
  created_at: Date | string
  updated_at: Date | string
}

export const columns: ColumnDef<product>[] = [
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("product_name")}</div>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stock")}</div>
    ),
  },
  {
    accessorKey: "low_sotck_limit",
    header: "Limite de Stock Bajo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("low_sotck_limit")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Ultima Modificación",
    cell: ({ row }) => {
      return <div className="capitalize">{DateFormat(row.getValue("updated_at"))}</div>
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const stock = parseFloat(row.getValue("price"))

      // Format the stock as a dollar stock
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(stock)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Modificar Información</DropdownMenuItem>
            <DropdownMenuItem>Ver detalles de producto</DropdownMenuItem>
            <DropdownMenuItem>Abastecer Stock</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400">Eliminar Producto</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function InventoryListProduct() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full bg-white p-4 rounded-sm shadow">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter product_names..."
          value={(table.getColumn("product_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
