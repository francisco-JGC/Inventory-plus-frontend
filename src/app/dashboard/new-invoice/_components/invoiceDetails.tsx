import { Input } from "@/components/ui/input"
import { IProductInvoice, ISelectedItem, ISelectedProducts } from "../page"
import { ChangeEvent } from "react"
import { IClientInfo } from "../page"
import { InputSearchProduct } from "./InputSearchProduct"
import { ItemSelectedProduct } from "./itemSelectedProduct"

interface IProps {
  products: IProductInvoice[]
  handleInputChangeClientInfo: (target: ChangeEvent<HTMLInputElement>) => void
  clientInfo: IClientInfo
  selectedProducts: ISelectedProducts
  handleSelectedProduct: (product: ISelectedItem) => void
  handleItemQuantity: (id: number, quantity: number) => void
  handleDeleteSelectedProduct: (id: number) => void
  handleSetDiscount: (discount: number) => void
  handleSetTax: (tax: number) => void
}

export const InvoiceDetails = ({ products, handleInputChangeClientInfo, clientInfo, selectedProducts, handleSelectedProduct, handleItemQuantity, handleDeleteSelectedProduct, handleSetDiscount, handleSetTax }: IProps) => {
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
            selectedProducts={selectedProducts.products}
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
          <div className="max-h-52 min-h-52 overflow-auto flex flex-col gap-2">
            {
              selectedProducts.products.length > 0 ? (
                selectedProducts.products.map((product) => (
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

      <div className="grid grid-cols-2  gap-4">
        <div className="flex flex-col gap-4 border-t-2 pt-2">
          <span className="font-bold">Impuesto (%)</span>
          <div>
            <Input placeholder="15"
              type="number"
              min={15}
              max={99}
              value={selectedProducts.tax}
              onChange={(e) => handleSetTax(Number(e.currentTarget.value))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t-2 pt-2">
          <span className="font-bold">Descuento de compra (%)</span>
          <div>
            <Input placeholder="0"
              type="number"
              min={0}
              max={99}
              value={selectedProducts.discount}
              onChange={(e) => handleSetDiscount(Number(e.currentTarget.value))}
            />
          </div>
        </div>
      </div>

    </div >
  )
}