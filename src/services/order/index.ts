import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'
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

export const getPaginationOrder = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/order/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}

export const changeOrderStatusSale = async (
  id: number,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/order/change-status/${id}`,
    method: 'GET',
    useToken: true,
  })
}

export const getInvoiceDetails = async (
  id: number,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/order/invoice-details/${id}`,
    method: 'GET',
    useToken: true,
  })
}

export const deleteOrderById = async (id: number) => {
  return await fetchData({
    url: '/order/delete',
    method: 'POST',
    data: {
      id,
    },
    useToken: true,
  })
}
