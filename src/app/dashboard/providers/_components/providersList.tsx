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
import { getPaginationProvider } from '@/services/provider'
import { toast } from 'sonner'

export type IProvider = {
  id?: number
  name: string,
  email: string
  phone: string
  address: string
  products?: IProduct[]
  created_at?: Date | string
}

const data: IProvider[] = [
  {
    id: 1,
    email: "ken99@yahoo.com",
    name: 'username',
    address: '',
    phone: '',
    created_at: Date(),
  },
  {
    id: 2,
    email: "ken99@yahoo.com",
    name: 'username',
    address: '',
    phone: '',
    created_at: Date(),
  }, {
    id: 3,
    email: "ken99@yahoo.com",
    name: 'username',
    address: '',
    phone: '',
    created_at: Date(),
  }, {
    id: 4,
    email: "ken99@yahoo.com",
    name: 'username',
    address: '',
    phone: '',
    created_at: Date(),
  },
]

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
            toast.error('No se pudieron cargar los registros')
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
      <div>
        <Modal
          Component={() => <AddProvider handleAddProvider={handleAddProvider} />}
          title='Nuevo proveedor'
          description='Por favor llene todos los campos requeridos'
        >
          <Button>
            Agregar Nuevo Proveedor
          </Button>
        </Modal>
      </div>
      <DataTable<IProvider>
        columns={ColumnListProviders}
        data={providers}
        search_by='name'
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