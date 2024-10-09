import { useEffect, useState } from "react";
import { InvoicePreview } from "../../new-invoice/_components/invoicePreview";
import { ISelectedProducts } from "../../new-invoice/page";
import { getInvoiceDetails } from "@/services/order";
import { toast } from "sonner";

interface IProps {
  id: number
}

interface IBillingDetail {
  id: number
  sale_status: boolean
  client_name: string
  phone_number: any
  total_price: number
  discount: number
  code: string
  tax: number
  created_at: string
  orderProducts: OrderProduct[]
}

export interface OrderProduct {
  id: number
  quantity: number
  price: number
  product: Product
}

export interface Product {
  id: number
  product_name: string
  price: number
  description: any
  discount: number
  stock: number
  status: string
  low_stock_limit: number
  created_at: string
}


export const LoadBillingPreview = ({ id }: IProps) => {
  const [billing, setBilling] = useState<IBillingDetail>()
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    getInvoiceDetails(id)
      .then((response) => {
        if (response.success) {
          setBilling(response.data as any)
        }
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  return (
    <div className="w-full">
      {
        loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-bold">Cargando detalles</span>
          </div>
        )
          : (
            billing && <InvoicePreview
              client_name={billing.client_name}
              selectedProducts={{
                discount: billing.discount,
                tax: billing.tax,
                products: billing?.orderProducts.map((item) => {
                  return {
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    product_name: item.product.product_name,
                    stock: item.product.stock
                  }
                })
              }}
              code={billing.code}
              className="w-[105%] !p-1 !text-[11px]"
            />
          )
      }
    </div>
  )
}