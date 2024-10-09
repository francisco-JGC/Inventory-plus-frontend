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

export const TopProducts = ({ data }: { data: ITopProducts[] }) => {
  return (
    <div className="bg-white p-4">
      <div className="px-2">
        <h3 className="text-lg font-bold">PRODUCTOS TOP</h3>
        <small className="text-gray-500">Lo mas vendido del mes</small>
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
