import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IProduct } from "./inventoryListProduct"
import { DateFormat } from "@/utils/date-format"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialogModal } from "@/components/alertDialogModal"
import Link from "next/link"



type IColumns = {
  onDelete: (id: number) => void
}

export const ColumnsListProduct = ({ onDelete }: IColumns): ColumnDef<IProduct>[] => {
  return [
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
      accessorKey: "low_stock_limit",
      header: "Limite de Stock Bajo",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("low_stock_limit")}</div>
      ),
    },
    {
      accessorKey: "provider_name",
      header: "Proveedor",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("provider_name")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <div className="capitalize">{
          row.getValue("status") === 'show' ? <span className="bg-blue-400 text-white rounded-2xl p-2">Visible</span> : <span className="bg-gray-400 text-black rounded-2xl p-2">Oculto</span>
        }</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Fecha  de creación",
      cell: ({ row }) => {
        return <div className="capitalize">{DateFormat(row.getValue("created_at"))}</div>
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
              <DropdownMenuItem>
                <Link href={`/dashboard/inventory/update-product/${product.id}`}>Modificar Información</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Abastecer Stock</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-400"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <AlertDialogModal
                  nameButton="Eliminar Producto"
                  title="¿Estás seguro de eliminar este producto?"
                  onConfirm={() => onDelete(product?.id || 0)}
                  buttonStyle={{
                    color: 'tomato',
                    fontWeight: 'bold',
                  }}
                  useButton={false}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}