import { fetchData, IHandleResponse } from '@/utils/fetch-data'

export const getMonthlySalesInformation =
  async (): Promise<IHandleResponse> => {
    return await fetchData({
      url: '/dashboard/monthly-sales-details',
      method: 'GET',
      useToken: true,
    })
  }

export const getSalesLastSixMonths = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/dashboard/sales-last-six-month',
    method: 'GET',
    useToken: true,
  })
}

export const getTop7Products = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/dashboard/top-products',
    method: 'GET',
    useToken: true,
  })
}
