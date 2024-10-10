'use client'
import { ReceiptText } from "lucide-react";
import { InvoiceDetails } from "./_components/invoiceDetails";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useForm from "@/hooks/useForm";
import { InvoicePreview } from "./_components/invoicePreview";
import { getAllProducts } from "@/services/product";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/order";

export interface IProductInvoice {
  id: number
  product_name: string
  price: number
  stock: number
}

export interface ISelectedProducts {
  products: ISelectedItem[]
  discount: number
  tax: number
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
  const [products, setProducts] = useState<IProductInvoice[]>([])
  const { formValues: clientInfo, handleInputChange, resetForm } = useForm<IClientInfo>({
    clientName: ''
  })
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProducts>({
    products: [],
    discount: 0,
    tax: 15
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
    if (discount < 0 || discount > 99) {
      return toast.warning('El descuento debe estar entre (0 y 99)')
    }

    setSelectedProducts((prev) => ({
      ...prev,
      discount
    }))
  }

  const handleSetTax = (tax: number) => {
    if (tax < 15 || tax > 99) {
      return toast.warning('El impuesto debe estar entre (15 y 99)')
    }

    setSelectedProducts((prev) => ({
      ...prev,
      tax
    }))
  }


  const isNotSelectedProduct = (id: number | string) => selectedProducts?.products.find((product) => product.id === id)

  const calculateTotal = () => {
    const subTotal = selectedProducts.products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const discountAmount = (subTotal * selectedProducts.discount) / 100;
    const taxAmount = ((subTotal - discountAmount) * selectedProducts.tax) / 100;

    const total = subTotal - discountAmount + taxAmount;
    return Number(total.toFixed(2));
  };

  const resetSelectedProducts = () => {
    setSelectedProducts({
      products: [],
      discount: 0,
      tax: 15
    });
  };


  const handleEmitInvoice = async () => {
    const invoiceData = {
      clientName: clientInfo.clientName,
      products: selectedProducts.products.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      discount: selectedProducts.discount,
      tax: selectedProducts.tax,
      total: calculateTotal()
    };

    const response = await createOrder(invoiceData)
    toast.dismiss()

    if (response.success) {
      toast.success('Se ha realizado la venta')
      resetForm()
      resetSelectedProducts()
    } else {
      toast.error('Error al realizar la venta', {
        description: response.message,
      })
    }
  }

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        if (response.success) {
          setProducts(response.data as any)
        }
      })
  }, [])

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
          selectedProducts={selectedProducts}
          handleSelectedProduct={handleSelectedProduct}
          handleItemQuantity={handleItemQuantity}
          handleDeleteSelectedProduct={handleDeleteSelectedProduct}
          handleSetDiscount={handleSetDiscount}
          handleSetTax={handleSetTax}
        />

        <InvoicePreview
          client_name={clientInfo.clientName}
          selectedProducts={selectedProducts}
        />
      </div>

      <div className="p-4 rounded shadow bg-white flex gap-4 items-center">
        <Button onClick={handleEmitInvoice} className="bg-indigo-500">
          Realizar venta
        </Button>

        <small className="text-gray-400">Porfavor revisar bien la informacion antes de emitir la venta de los productos.</small>
      </div>
    </div>
  );
} 