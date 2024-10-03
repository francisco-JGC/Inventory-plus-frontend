import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IProvider } from "./providersList"
import { DateFormat } from "@/utils/date-format"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const ColumnsListUsers: ColumnDef<IProvider>[] = [
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
    accessorKey: "username",
    header: "Nombre de usuario",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status") ? 'Activo' : 'Inactivo'}</div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Fecha de creación",
    cell: ({ row }) => {
      return <div className="capitalize">{DateFormat(row.getValue("created_at"))}</div>
    },
  },
  {
    accessorKey: "rol",
    header: () => <div className="text-right">Rol</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("rol")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

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
            <DropdownMenuItem>Cambiar Permisos</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400">Eliminar Usuario</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]