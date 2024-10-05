import { IProvider } from '@/app/dashboard/providers/_components/providersList'
import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'
import { toast } from 'sonner'

export const createProvider = async (
  provider: IProvider,
): Promise<IHandleResponse> => {
  toast.loading('Creando proveedor', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: '/provider/create',
    data: provider,
    method: 'POST',
    useToken: true,
  })
}

export const getAllProvider = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/provider/',
    method: 'GET',
    useToken: true,
  })
}

export const getPaginationProvider = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/provider/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}

export const deleteProviderById = async (id: number) => {
  return await fetchData({
    url: '/provider/delete',
    method: 'POST',
    data: {
      id,
    },
    useToken: true,
  })
}

export const getProviderById = async (id: number) => {
  return await fetchData({
    url: `/provider/${id}`,
    method: 'GET',
    useToken: true,
  })
}

export const updateProviderById = async (provider: IProvider, id: number) => {
  return await fetchData({
    url: `/provider/update/${id}`,
    method: 'POST',
    data: provider,
    useToken: true,
  })
}
