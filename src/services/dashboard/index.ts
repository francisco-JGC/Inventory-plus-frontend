import { fetchData, IHandleResponse } from '@/utils/fetch-data'

export const getMonthlySalesInformation =
  async (): Promise<IHandleResponse> => {
    return await fetchData({
      url: '/dashboard/monthly-sales-details',
      method: 'GET',
      useToken: true,
    })
  }
