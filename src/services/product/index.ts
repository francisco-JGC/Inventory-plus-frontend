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

export const deleteProductById = async (
  id: number,
): Promise<IHandleResponse> => {
  toast.loading('Eliminando producto...', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: `/product/delete-product/${id}/`,
    method: 'GET',
    useToken: true,
  })
}
export const getProductById = async (id: number): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/product/${id}`,
    method: 'GET',
    useToken: true,
  })
}

// Función para abastecer stock de un producto
export const replenishStock = async (
  id: number,
  amount: number,
): Promise<IHandleResponse> => {
  toast.loading('Abasteciendo stock...', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: `/product/replenish-stock/${id}`,
    data: { amount },
    method: 'POST',
    useToken: true,
  })
}

export const updateProductById = async (
  id: number,
  productData: ICreateProduct,
): Promise<IHandleResponse> => {
  toast.loading('Actualizando producto...', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: `/product/update/${id}`,
    data: productData,
    method: 'POST',
    useToken: true,
  })
}
