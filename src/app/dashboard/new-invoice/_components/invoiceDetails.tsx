import { Input } from "@/components/ui/input"
import { IProductInvoice, ISelectedItem } from "../page"
import { ChangeEvent } from "react"
import { IClientInfo } from "../page"
import { InputSearchProduct } from "./InputSearchProduct"

interface IProps {
  products: IProductInvoice[]
  handleInputChangeClientInfo: (target: ChangeEvent<HTMLInputElement>) => void
  clientInfo: IClientInfo
  selectedProducts: ISelectedItem[]
  handleSelectedProduct: (product: ISelectedItem) => void
  handleItemQuantity: (id: number, quantity: number) => void
}

export const InvoiceDetails = ({ products, handleInputChangeClientInfo, clientInfo, selectedProducts, handleSelectedProduct, handleItemQuantity }: IProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-bold">Detalles de Factura</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="clientName">Nombre del cliente <span className="text-gray-400">{'(opcional)'}</span></label>
        <Input
          name="clientName"
          id="clientName"
          value={clientInfo.clientName}
          onChange={handleInputChangeClientInfo}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="created_at">Fecha de emisión</label>
        <Input
          name="created_at"
          id="created_at"
          type="date"
          value={new Date().toISOString().split('T')[0]}
          disabled
        />
      </div>

      <div className="flex flex-col gap-4 border-t-2 pt-2">
        <span className="font-bold">Productos</span>
        <div>
          <InputSearchProduct
            selectedProducts={selectedProducts}
            handleSelectedProduct={handleSelectedProduct}
            products={products}
          />
        </div>
        {

        }
      </div>
    </div>
  )
}