'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnListProviders } from './providersListColumns'
import useForm from '@/hooks/useForm'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ISearch } from '../../_types/pagination'
import { IProduct } from '../../inventory/_components/inventoryListProduct'
import { AddProvider } from './addProvider'
import { Modal } from '@/components/modal'
import { deleteProviderById, getPaginationProvider } from '@/services/provider'
import { toast } from 'sonner'
import { downloadProvidersReport } from '@/services/xlsx-report'
import { Download } from 'lucide-react'

export type IProvider = {
  id?: number
  name: string,
  email: string
  phone: string
  address: string
  products?: IProduct[]
  created_at?: Date | string
}

export const ProvidersList = () => {
  const { formValues: search, handleInputChange } = useForm<ISearch>({
    search: ''
  })
  const [providers, setProviders] = useState<IProvider[]>([])
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

  const handleAddProvider = (provider: IProvider) =>
    setProviders(prevProviders => [...prevProviders, provider])

  const handleDeleteProvider = async (id: number) => {
    toast.loading('Eliminando proveedor...')

    const response = await deleteProviderById(id)
    toast.dismiss()

    if (response.success) {
      toast.success('Proveedor eliminado con exito!')
      setProviders(prevProviders => prevProviders.filter((item) => item.id !== id))
    } else {
      toast.error('Hubo un error al eliminar el proveedor', {
        description: response.message,
      })
    }
  }

  const handleGenerateReportProviders = async () => {
    toast.loading('Generando reporte de proveedores...', {
      description: 'Porfavor espere un momento'
    })

    await downloadProvidersReport()
    toast.dismiss()
  }

  useEffect(() => {
    setLoading(true)
    const timeOut = setTimeout(() => {
      getPaginationProvider({ page: currentPage, filter: search.search, limit: 10 })
        .then((data: any) => {
          if (data.success) {
            setProviders(data.data)
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
      <div className='flex justify-between items-center'>
        <Modal
          Component={() => <AddProvider handleAddProvider={handleAddProvider} />}
          title='Nuevo proveedor'
          description='Por favor llene todos los campos requeridos'
        >
          <Button>
            Agregar Nuevo Proveedor
          </Button>
        </Modal>

        <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600/90" title="Exportar Registro de venta del Mes"
          onClick={handleGenerateReportProviders}
        >
          <Download width={17} />
          Exportar
        </Button>
      </div>
      <DataTable<IProvider>
        columns={ColumnListProviders({ onDelete: handleDeleteProvider })}
        data={providers}
        search_by='search'
        searchValue={search.search}
        handleSearch={handleInputChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={pagination.total_pages}
        isLoading={loading}
        search_placeholder="Buscar nombre del proveedor"
        filter_columns={{
          email: 'Correo Electronico',
          name: 'Nombre de usuario',
          address: 'Dirección',
          phone: 'Telefono',
          product_length: 'Fecha de creación',
        }}
      />
    </div>
  )
}