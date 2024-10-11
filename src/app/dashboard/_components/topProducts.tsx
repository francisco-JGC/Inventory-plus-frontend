import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ITopProducts } from "../page"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"
import { downloadTopProductsReport } from "@/services/xlsx-report"

export const TopProducts = ({ data }: { data: ITopProducts[] }) => {
  const handleGenerateReportTopSales = async () => {
    toast.loading('Generando reporte de top ventas...', {
      description: 'Porfavor espere un momento'
    })

    await downloadTopProductsReport()
    toast.dismiss()
  }

  return (
    <div className="bg-white p-4">
      <div className="px-2 flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">PRODUCTOS TOP</h3>
          <small className="text-gray-500">Lo mas vendido del mes</small>
        </div>

        <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600/90" title="Exportar Registro de venta del Mes"
          onClick={handleGenerateReportTopSales}
        >
          <Download width={17} />
          Exportar
        </Button>
      </div>

      <Table>
        <TableCaption>listado de los productos mas vendido</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Nombre del producto</TableHead>
            <TableHead>Proveedor</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Ventas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoices) => (
            <TableRow key={invoices.id}>
              <TableCell className="font-medium">{invoices.product_name}</TableCell>
              <TableCell>{invoices.provider_name}</TableCell>
              <TableCell>{invoices.stock}</TableCell>
              <TableCell>{invoices.total_sold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
