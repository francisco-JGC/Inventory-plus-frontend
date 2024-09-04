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

const invoices = [
  {
    product_name: "Nombre del product 1",
    provider: "Paid",
    sales: "710",
    stock: "Credit Card",
  },
  {
    product_name: "Nombre del product 2",
    provider: "Pending",
    sales: "490",
    stock: "PayPal",
  },
  {
    product_name: "Nombre del product 3",
    provider: "Unpaid",
    sales: "902",
    stock: "Bank Transfer",
  },
  {
    product_name: "Nombre del product 4",
    provider: "Paid",
    sales: "1002",
    stock: "Credit Card",
  },
  {
    product_name: "Nombre del product 5",
    provider: "Paid",
    sales: "687",
    stock: "PayPal",
  },
  {
    product_name: "Nombre del product 6",
    provider: "Pending",
    sales: "892",
    stock: "Bank Transfer",
  },
  {
    product_name: "Nombre del product 7",
    provider: "Unpaid",
    sales: "672",
    stock: "Credit Card",
  },
]

export const TopProducts = () => {
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
          {invoices.map((invoices) => (
            <TableRow key={invoices.product_name}>
              <TableCell className="font-medium">{invoices.product_name}</TableCell>
              <TableCell>{invoices.provider}</TableCell>
              <TableCell>{invoices.stock}</TableCell>
              <TableCell>{invoices.sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
