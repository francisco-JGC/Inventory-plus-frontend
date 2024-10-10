import { fetchData, IHandleResponse } from '@/utils/fetch-data'

export const generateBackupDB = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/ddbb/backup',
    method: 'GET',
    useToken: true,
  })
}

export const restoreBackupDB = async (
  file_name: string,
): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/ddbb/restore/${file_name}`,
    method: 'GET',
    useToken: true,
  })
}
