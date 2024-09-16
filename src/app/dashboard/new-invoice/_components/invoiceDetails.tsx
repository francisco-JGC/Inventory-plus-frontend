import { Input } from "@/components/ui/input"
import { IProductInvoice, ISelectedItem } from "../page"
import { ChangeEvent } from "react"
import { IClientInfo } from "../page"
import { InputSearchProduct } from "./InputSearchProduct"
import { ItemSelectedProduct } from "./itemSelectedProduct"

interface IProps {
  products: IProductInvoice[]
  handleInputChangeClientInfo: (target: ChangeEvent<HTMLInputElement>) => void
  clientInfo: IClientInfo
  selectedProducts: ISelectedItem[]
  handleSelectedProduct: (product: ISelectedItem) => void
  handleItemQuantity: (id: number, quantity: number) => void
  handleDeleteSelectedProduct: (id: number) => void
}

export const InvoiceDetails = ({ products, handleInputChangeClientInfo, clientInfo, selectedProducts, handleSelectedProduct, handleItemQuantity, handleDeleteSelectedProduct }: IProps) => {
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
        <div className="flex flex-col gap-2 max-w-[450px]">
          <div className="w-full flex justify-between gap-4 mb-2">
            <span className="font-bold text-gray-600 w-2/4">Item</span>
            <span className="font-bold text-gray-600 w-2/4">Cantidad</span>
            <span className="font-bold text-gray-600 w-2/4">Precio U.</span>
          </div>
          {
            selectedProducts.length > 0 ? (
              selectedProducts.map((product) => (
                <ItemSelectedProduct
                  product={product}
                  handleItemQuantity={handleItemQuantity}
                  key={product.id}
                  handleDeleteSelectedProduct={handleDeleteSelectedProduct}
                />
              ))
            )
              : (
                <div>
                  <span className="text-gray-400">No se han seleccionado productos</span>
                </div>
              )
          }
        </div>
      </div>
    </div >
  )
}