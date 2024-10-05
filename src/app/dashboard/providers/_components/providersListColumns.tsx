import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IProvider } from "./providersList"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialogModal } from "@/components/alertDialogModal"
import { useRouter } from "next/navigation"

type IColumns = {
  onDelete: (id: number) => void
}

export const ColumnListProviders = ({ onDelete }: IColumns): ColumnDef<IProvider>[] => {
  const router = useRouter()

  return [
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Correo Electronico
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "name",
      header: "Nombre de usuario",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Dirección",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Telefono",
      cell: ({ row }) => {
        return <div className="capitalize">{row.getValue("phone")}</div>
      },
    },
    {
      accessorKey: "product_length",
      header: () => <div className="text-right">Productos</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("product_length")}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const provider = row.original

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
              <DropdownMenuItem
                onClick={() => (router.push(`/dashboard/providers/update/${provider.id}`))}
              >Modificar Información</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-400"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <AlertDialogModal
                  nameButton="Eliminar Proveedor"
                  title="¿Estás seguro de eliminar este proveedor?"
                  onConfirm={() => onDelete(provider?.id || 0)}
                  description="Al eliminar este proveedor, los productos establecidos tambien seran eliminados, ¿Desea eliminarlo?"
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