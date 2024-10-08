import { fetchData, IHandleResponse } from '@/utils/fetch-data'

export const getInventoryDetails = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/inventory/details',
    method: 'GET',
    useToken: true,
  })
}
