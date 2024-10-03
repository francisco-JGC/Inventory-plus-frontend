'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListUsers } from './providersListColumns'
import useForm from '@/hooks/useForm'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ISearch } from '../../_types/pagination'
import { IProduct } from '../../inventory/_components/inventoryListProduct'

export type IProvider = {
  id: number
  name: string,
  email: string
  phone: string
  address: string
  products?: IProduct[]
  created_at: Date | string
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

  return (
    <div className='bg-white p-4 shadow rounded flex flex-col gap-4'>
      <div>
        <Button className='bg-indigo-500'>
          <Link href={'#'}>
            Agregar Nuevo Proveedor
          </Link>
        </Button>
      </div>
      <DataTable<IProvider>
        columns={ColumnsListUsers}
        data={data}
        search_by='email'
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
          username: 'Nombre de usuario',
          status: 'Estado',
          created_at: 'Fecha de creación',
        }}
      />
    </div>
  )
}