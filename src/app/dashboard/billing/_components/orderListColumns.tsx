import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IOrderList } from "./orderList"
import { DateFormat } from "@/utils/date-format"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialogModal } from "@/components/alertDialogModal"
import { PriceFormat } from "@/utils/price-format"
import { LoadBillingPreview } from "./loadBillingPreview"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

type IColumns = {
  onDelete: (id: number) => void
  changeOrderStatusSale: (id: number) => void
}

export const ColumnsListOrder = ({ onDelete, changeOrderStatusSale }: IColumns): ColumnDef<IOrderList>[] => {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Codigo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("code")}</div>,
    },
    {
      accessorKey: "client_name",
      header: "Nombre del cliente",
      cell: ({ row }) => (
        <div>{row.getValue("client_name")}</div>
      ),
    },
    {
      accessorKey: "total_products",
      header: "Total de productos",
      cell: ({ row }) => (
        <div>{row.getValue("total_products")}</div>
      ),
    },
    {
      accessorKey: "total",
      header: () => <div className="">Total de venta</div>,
      cell: ({ row }) => {
        return <div className=" font-medium">{PriceFormat(row.getValue("total"))}</div>
      },
    },
    {
      accessorKey: "sale_status",
      header: () => <div className="">Estatus de venta</div>,
      cell: ({ row }) => {
        return <div className="font-medium">
          {row.getValue("sale_status") ? <span className="bg-green-400 text-white rounded-2xl p-2">Venta</span> : <span className="bg-red-400 text-white rounded-2xl p-2">Cancelado</span>}
        </div>
      },
    },
    {
      accessorKey: "created_at",
      header: "Fecha de creación",
      cell: ({ row }) => {
        return <div className="capitalize">{DateFormat(row.getValue("created_at"))}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const billing = row.original

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
              {/* <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                <AlertDialogModal
                  title={billing.sale_status ? 'Cancelar venta' : 'Realizar venta'}
                  description="Cambiar el estado de venta"
                  onConfirm={() => changeOrderStatusSale(billing.id)}
                  nameButton={billing.sale_status ? 'Cancelar venta' : 'Realizar venta'}
                />
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                }}>
                <Sheet>
                  <SheetTrigger asChild>
                    <span>Detalles de venta</span>
                  </SheetTrigger>
                  <SheetContent>
                    <LoadBillingPreview id={billing.id} />
                  </SheetContent>
                </Sheet>
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-400"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <AlertDialogModal
                  nameButton="Eliminar factura"
                  title="¿Estás seguro de eliminar este factura?"
                  onConfirm={() => onDelete(billing.id || 0)}
                  buttonStyle={{
                    color: 'tomato',
                    fontWeight: 'bold',
                  }}
                  useButton={false}
                />
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}