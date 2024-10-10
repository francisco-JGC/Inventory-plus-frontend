'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListOrder } from './orderListColumns'
import useForm from '@/hooks/useForm'
import { useEffect, useState } from 'react'
import { ISearch } from '../../_types/pagination'
import { toast } from 'sonner'
import { changeOrderStatusSale, deleteOrderById, getPaginationOrder } from '@/services/order'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { downloadSalesReport } from '@/services/xlsx-report'

export type IOrderList = {
  id: number
  created_at: string
  total: number
  total_products: number
  code: string
  client_name: string
  sale_status: boolean
}


export const OrderList = () => {
  const { formValues: search, handleInputChange } = useForm<ISearch>({
    search: ''
  })
  const [orders, setOrders] = useState<IOrderList[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState({
    current_page: 0,
    total_pages: 0,
    total_data: 0,
  })

  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      setPagination({
        ...pagination,
        current_page: pagination.current_page - 1,
      })
    }
  }

  const handleNextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      setPagination({
        ...pagination,
        current_page: pagination.current_page + 1,
      })
    }
  }

  const handleDeleteOrder = async (id: number) => {
    toast.loading('Eliminando factura...')

    const response = await deleteOrderById(id)
    toast.dismiss()

    if (response.success) {
      toast.success('Factura eliminada con exito!')
      setOrders(prevOrder => prevOrder.filter((item) => item.id !== id))
    } else {
      toast.error('Hubo un error al eliminar la factura', {
        description: response.message,
      })
    }
  }

  const handleChangeOrderStatusSale = async (id: number) => {
    toast.loading('Cambiando estado de venta...')
    const response = await changeOrderStatusSale(id)
    toast.dismiss()

    if (response.success) {
      toast.success('Se ha cambiado el estado de la venta')
      setOrders((prevOrder) => prevOrder.map((item) => (item.id === id ? {
        ...item,
        sale_status: !item.sale_status
      } : item)))
    } else {
      toast.error('Hubo un error en la solicitud', {
        description: response.message,
      })
    }
  }

  const handleGenerateReportSales = async () => {
    toast.loading('Generando reporte de ventas...', {
      description: 'Porfavor espere un momento'
    })

    await downloadSalesReport()
    toast.dismiss()
  }

  useEffect(() => {
    setLoading(true)
    const timeOut = setTimeout(() => {
      getPaginationOrder({ page: currentPage, filter: search.search, limit: 10 })
        .then((data: any) => {
          if (data.success) {
            setOrders(data.data)
            setPagination({
              current_page: pagination.current_page,
              total_pages: pagination.total_pages,
              total_data: pagination.total_data,
            })
          } else {
            toast.error('No se pudieron cargar los registros', {
              description: data.message,
            })
          }
        })
        .finally(() => {
          toast.dismiss()
          setLoading(false)
        })
    }, 700)

    return () => clearTimeout(timeOut)
  }, [search.search, currentPage])

  return (
    <div className='bg-white p-4 shadow rounded flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600/90" title="Exportar Registro de venta del Mes"
          onClick={handleGenerateReportSales}
        >
          <Download width={17} />
          Exportar
        </Button>
      </div>
      <DataTable<IOrderList>
        columns={ColumnsListOrder({ onDelete: handleDeleteOrder, changeOrderStatusSale: handleChangeOrderStatusSale })}
        data={orders}
        search_by='code'
        searchValue={search.search}
        handleSearch={handleInputChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={pagination.total_pages}
        isLoading={loading}
        search_placeholder="Buscar codigo de venta"
      />
    </div>
  )
}