import { fetchData, IHandleResponse } from '@/utils/fetch-data'
import { toast } from 'sonner'

export interface ICreateOrder {
  clientName: string
  products: IProductOrder[]
  discount: number
  tax: number
  total: number
}

export interface IProductOrder {
  product_id: number
  quantity: number
  price: number
}

export const createOrder = async (
  order: ICreateOrder,
): Promise<IHandleResponse> => {
  toast.loading('Creando orden', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: '/order/create',
    data: order,
    method: 'POST',
    useToken: true,
  })
}
