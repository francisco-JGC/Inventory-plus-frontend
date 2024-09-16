'use client'
import { ReceiptText } from "lucide-react";
import { InvoiceDetails } from "./_components/invoiceDetails";
import { useState } from "react";
import { toast } from "sonner";
import useForm from "@/hooks/useForm";
import { InvoicePreview } from "./_components/invoicePreview";

export interface IProductInvoice {
  id: number
  product_name: string
  price: number
  stock: number
}

const data: IProductInvoice[] = [
  {
    id: 1,
    product_name: "Melon",
    price: 18,
    stock: 10
  },
  {
    id: 2,
    product_name: "Sandia",
    price: 19.5,
    stock: 25
  },
  {
    id: 3,
    product_name: "Pepino",
    price: 22,
    stock: 30
  },
  {
    id: 4,
    product_name: "Pera",
    price: 10.99,
    stock: 40
  },
  {
    id: 5,
    product_name: "Manzana",
    price: 99.50,
    stock: 50
  },
  {
    id: 6,
    product_name: "Kiwi",
    price: 89,
    stock: 60
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
  price: number
  stock: number
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
    if (isNotSelectedProduct(product.id)) {
      return toast.warning('Este producto ya ha sido agregado')
    }

    const updatedProducts = [...selectedProducts.products, product];

    setSelectedProducts({
      ...selectedProducts,
      products: updatedProducts
    });
  }

  const handleItemQuantity = (id: number, quantity: number) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      products: prevSelectedProducts.products.map(product =>
        product.id === id ? { ...product, quantity } : product
      )
    }));
  }

  const handleDeleteSelectedProduct = (id: number) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      products: prevSelectedProducts.products.filter((product) => product.id !== id && product)
    }))
  }

  const handleSetDiscount = (discount: number) => {
    if (discount < 0) {
      return toast.warning('El descuento debe ser mayor a 0')
    }

    if (discount > 99) {
      return toast.warning('El descuento debe ser menor a 99')
    }

    setSelectedProducts((prev) => ({
      ...prev,
      discount
    }))
  }


  const isNotSelectedProduct = (id: number | string) => selectedProducts?.products.find((product) => product.id === id)

  return (
    <div className="flex flex-col gap-4 w-full">
      <header className="bg-white p-4 rounded">
        <h2 className="font-bold flex gap-4 items-center text-gray-400">Nueva Factura <ReceiptText width={20} /></h2>
      </header>

      <div className="flex gap-4 justify-between bg-white p-4 rounded shadow-sm">
        <InvoiceDetails
          handleInputChangeClientInfo={handleInputChange}
          products={products}
          clientInfo={clientInfo}
          selectedProducts={selectedProducts?.products ? selectedProducts?.products : [] as any}
          handleSelectedProduct={handleSelectedProduct}
          handleItemQuantity={handleItemQuantity}
          handleDeleteSelectedProduct={handleDeleteSelectedProduct}
          handleSetDiscount={handleSetDiscount}
        />

        <InvoicePreview
          client_name={clientInfo.clientName}
          selectedProducts={selectedProducts}
        />
      </div>
    </div>
  );
} 