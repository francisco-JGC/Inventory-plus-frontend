import { ICategory } from '@/app/dashboard/inventory/add-product/_components/addCategory'
import { fetchData, IHandleResponse } from '@/utils/fetch-data'
import { toast } from 'sonner'

export const createCategory = async (
  category: ICategory,
): Promise<IHandleResponse> => {
  toast.loading('Creando categoria', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: '/category/create',
    data: category,
    method: 'POST',
    useToken: true,
  })
}
