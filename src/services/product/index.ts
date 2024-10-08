import { ICreateProduct } from '@/app/dashboard/inventory/add-product/page'
import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'
import { toast } from 'sonner'

export const createProduct = async (
  product: ICreateProduct,
): Promise<IHandleResponse> => {
  toast.loading('Creando categoria', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: '/product/create',
    data: product,
    method: 'POST',
    useToken: true,
  })
}

export const getAllProducts = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/product',
    method: 'GET',
    useToken: true,
  })
}

export const getPaginationProduct = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/product/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}
