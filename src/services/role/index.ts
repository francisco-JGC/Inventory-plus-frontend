import { fetchData, IHandleResponse } from '@/utils/fetch-data'

export const getAllRoles = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/role',
    method: 'GET',
    useToken: true,
  })
}
