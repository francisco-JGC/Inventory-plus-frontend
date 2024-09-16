'use client'
import { ReceiptText } from "lucide-react";
import { InvoiceDetails } from "./_components/invoiceDetails";
import { IProduct } from "../inventory/_components/inventoryListProduct";
import { useState } from "react";
import { toast } from "sonner";
import useForm from "@/hooks/useForm";

export interface IProductInvoice {
  id: number
  product_name: string
}

const data: IProductInvoice[] = [
  {
    id: 1,
    product_name: "Melon",
  },
  {
    id: 2,
    product_name: "Sandia",
  },
  {
    id: 3,
    product_name: "Pepino",
  },
  {
    id: 4,
    product_name: "Pera",
  },
  {
    id: 5,
    product_name: "Manzana",
  },
  {
    id: 6,
    product_name: "Kiwi",
  },
]

export interface ISelectedProducts {
  products: ISelectedItem[]
  discount: number
}

export interface ISelectedItem {
  id: number
  product_name: string
  quantity: number
}

export interface IClientInfo {
  clientName: string
}

export default function NewInvoicePage() {
  const [products, setProducts] = useState<IProductInvoice[]>(data)
  const { formValues: clientInfo, handleInputChange, resetForm } = useForm<IClientInfo>({
    clientName: ''
  })
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProducts>({
    products: [],
    discount: 0
  })

  const handleSelectedProduct = (product: ISelectedItem) => {
    console.log({ products })

    if (isNotSelectedProduct(product.id)) {
      toast.warning('Este producto ya ha sido agregado')
    }

    selectedProducts.products.push(product)
  }

  const handleItemQuantity = (id: number, quantity: number) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      products: prevSelectedProducts.products.map(product =>
        product.id === id ? { ...product, quantity } : product
      )
    }));
  }


  const isNotSelectedProduct = (id: number | string) => selectedProducts?.products.find((product) => product.id === id)

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="bg-white p-4 rounded">
        <h2 className="font-bold flex gap-4 items-center text-gray-400">Nueva Factura <ReceiptText width={20} /></h2>
      </header>

      <div className="flex gap-4 bg-white p-4 rounded shadow-sm">
        <InvoiceDetails
          handleInputChangeClientInfo={handleInputChange}
          products={products}
          clientInfo={clientInfo}
          selectedProducts={selectedProducts?.products ? selectedProducts?.products : [] as any}
          handleSelectedProduct={handleSelectedProduct}
          handleItemQuantity={handleItemQuantity}
        />
      </div>
    </div>
  );
} 