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
    <div className="flex flex-col gap-4 w-2/4">
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
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full mb-2 font-bold grid grid-cols-5 gap-4">
            <span className="font-bold text-gray-600 col-span-2">Item</span>
            <span className="font-bold text-gray-600">Cantidad</span>
            <span className="font-bold text-gray-600">Precio U.</span>

          </div>
          <div className="max-h-60 min-h-60 overflow-auto flex flex-col gap-2">
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
                  <div className="w-full flex items-center justify-center">
                    <span className="text-gray-400">No se han seleccionado productos</span>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    </div >
  )
}