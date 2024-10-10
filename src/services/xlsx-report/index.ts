import { fetchFile } from '@/utils/fetch-file'

export const downloadSalesReport = async () => {
  return await fetchFile({
    url: '/xlsx-report/sales-report',
    fileName: 'Reporte de ventas.xlsx',
    useToken: true,
  })
}

export const downloadProvidersReport = async () => {
  return await fetchFile({
    url: '/xlsx-report/providers-report',
    fileName: 'Reporte de ventas.xlsx',
    useToken: true,
  })
}
