import { ICreateProduct } from '@/app/dashboard/inventory/add-product/page'
import { fetchData, IHandleResponse } from '@/utils/fetch-data'
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
