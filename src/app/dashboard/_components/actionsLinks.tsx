import { Button } from "@/components/ui/button"
import { downloadFluctuationReport } from "@/services/xlsx-report"
import { Box, Boxes, File, Plus, Users } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export const ActionsLinks = () => {
  const handleGenerateFluctuationReport = async () => {
    toast.loading('Generando reporte de top ventas...', {
      description: 'Porfavor espere un momento'
    })

    await downloadFluctuationReport()
    toast.dismiss()
  }

  return (
    <div className="bg-white shadow-sm rounded-lg w-full p-4 ">
      <div>
        <span className='p-4 text-gray-400 font-semibold text-xs tracking-wider'>ACCIONES RAPIDAS</span>
      </div>
      <div className="flex gap-4 justify-between p-4">
        <Button variant={"secondary"}>
          <Link href={"/dashboard/inventory/add-product"} className="flex gap-2 items-center">
            <Plus width={17} />
            Crear Producto
          </Link>
        </Button>

        <Button variant={"secondary"}>
          <Link href={"/dashboard/users"} className="flex gap-2 items-center">
            <Users width={17} />
            Administrar Usuarios
          </Link>
        </Button>

        <Button variant={"secondary"}>
          <Link href={"/dashboard/new-invoice"} className="flex gap-2 items-center">
            <Box width={17} />
            Registrar Nueva Venta
          </Link>
        </Button>

        <Button variant={"secondary"}>
          <Link href={"/dashboard/inventory"} className="flex gap-2 items-center">
            <Boxes width={17} />
            Ver Inventario
          </Link>
        </Button>

        <Button variant={"secondary"} className="flex gap-2 items-center"
          onClick={handleGenerateFluctuationReport}
        >
          <File width={17} />
          Generar Reportes de fluc.
        </Button>
      </div>
    </div>
  )
}