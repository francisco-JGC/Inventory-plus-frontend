import { PriceFormat } from "@/utils/price-format"
import { ISelectedProducts } from "../page"
import { useEffect, useState } from "react"

interface IProps {
  client_name: string
  selectedProducts: ISelectedProducts
  className?: string
  code?: string
}

export const InvoicePreview = ({ client_name, selectedProducts, className, code }: IProps) => {
  const [subtotal, setSubtotal] = useState<number>(0)
  const [tax, setTaxt] = useState<number>(0)
  const [codeInvoice, setCodeInvoice] = useState<string>(code ? code : 'INVXX-XX-XX-XX')

  useEffect(() => {
    setSubtotal(selectedProducts.products.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0))
  }, [selectedProducts])

  useEffect(() => {
    setTaxt(subtotal * (selectedProducts.tax / 100))
  }, [subtotal, selectedProducts])

  return (
    <div className={`bg-gray-200 w-2/4 p-10 rounded-lg text-sm ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
        <header className="border-b-2 py-2">
          <h2 className="font-bold">{codeInvoice}</h2>
        </header>

        <div className="grid grid-cols-2">
          <div className="">
            <span className="text-gray-400">Fecha de Emisión</span>
            <p className="font-bold">{new Date().toISOString().split('T')[0]}</p>
          </div>
          <div>
            <span className="text-gray-400">Nombre de cliente</span>
            <p className="font-bold">{client_name || 'xxxxx'}</p>
          </div>
        </div>

        <div className="border-b-2">
          <div className="grid grid-cols-5 bg-gray-100 p-2 rounded">
            <span className="col-span-2">Descripción</span>
            <span>Precio U.</span>
            <span>Cantidad</span>
            <span>Total</span>
          </div>

          <div>
            {selectedProducts.products.length > 0 ?
              selectedProducts.products.map(product => {
                return (
                  <div key={product.id} className="font-bold grid grid-cols-5 p-2 rounded">
                    <span className="col-span-2">{product.product_name}</span>
                    <span>{PriceFormat(product.price)}</span>
                    <span>{product.quantity}</span>
                    <span>{PriceFormat(product.quantity * product.price)}</span>
                  </div>
                )
              })
              : (
                <div className="w-full flex items-center justify-center p-4">
                  <span className="text-gray-400">No se han seleccionado productos</span>
                </div>
              )
            }
          </div>
        </div>

        <div>
          <div className="grid grid-cols-5 p-2 rounded">
            <span></span>
            <span></span>
            <span></span>
            <span>Subtotal:</span>
            <span>{PriceFormat(
              subtotal
            )}</span>
          </div>

          <div className="grid grid-cols-5 p-2 rounded">
            <span></span>
            <span></span>
            <span></span>
            <span>Descuento:</span>
            <span>{selectedProducts.discount > 0 ? `${PriceFormat(subtotal * (selectedProducts.discount / 100))}` : 'N/A'}</span>
          </div>

          <div className="grid grid-cols-5 p-2 rounded">
            <span></span>
            <span></span>
            <span></span>
            <span>Impuesto:</span>
            <span>{PriceFormat(tax)}</span>
          </div>

          <div className="grid grid-cols-5 p-2 rounded font-bold">
            <span></span>
            <span></span>
            <span></span>
            <span>TOTAL:</span>
            <span>{
              PriceFormat(
                (subtotal - (subtotal * (selectedProducts.discount / 100))) + tax
              )}</span>
          </div>
        </div>
      </div>
    </div>
  )
}