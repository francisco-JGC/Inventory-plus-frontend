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
    fileName: 'Reporte de proveedores.xlsx',
    useToken: true,
  })
}

export const downloadInventoryReport = async () => {
  return await fetchFile({
    url: '/xlsx-report/inventory-report',
    fileName: 'Reporte de inventario.xlsx',
    useToken: true,
  })
}

export const downloadFluctuationReport = async () => {
  return await fetchFile({
    url: '/xlsx-report/fluctuation-report',
    fileName: 'Reporte de productos top vendidos.xlsx',
    useToken: true,
  })
}

export const downloadUserReport = async () => {
  return await fetchFile({
    url: '/xlsx-report/user-report',
    fileName: 'Reporte de usuarios.xlsx',
    useToken: true,
  })
}

export const downloadTopProductsReport = async () => {
  return await fetchFile({
    url: '/xlsx-report/top-products-report',
    fileName: 'Reporte de productos top.xlsx',
    useToken: true,
  })
}
