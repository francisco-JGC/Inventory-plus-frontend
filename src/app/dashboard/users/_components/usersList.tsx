'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListUsers } from './usersListColumns'
import { useForm } from '@/hooks/useForm'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export type IUsers = {
  id: number | string
  username: string,
  email: string
  status: boolean
  rol: string
  created_at: Date | string
}

const data: IUsers[] = [
  {
    id: "m5gr84i9",
    status: true,
    email: "ken99@yahoo.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "3u1reuv4",
    status: true,
    email: "Abe45@gmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "derv1ws0",
    status: false,
    email: "Monserrat44@gmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "5kma53ae",
    status: true,
    email: "Silas22@gmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "bhqecj4p",
    status: false,
    email: "carmella@hotmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "m5gr84i9",
    status: true,
    email: "ken99@yahoo.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "3u1reuv4",
    status: true,
    email: "Abe45@gmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "derv1ws0",
    status: false,
    email: "Monserrat44@gmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "5kma53ae",
    status: true,
    email: "Silas22@gmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
  {
    id: "bhqecj4p",
    status: false,
    email: "carmella@hotmail.com",
    username: 'username',
    rol: 'administrator',
    created_at: Date(),
  },
]

export const UsersList = () => {
  const { values: search, handleInputChange } = useForm({
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
            Agregar Nuevo Usuario
          </Link>
        </Button>
      </div>
      <DataTable<IUsers>
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
        search_placeholder="Buscar nombre del producto"
        filter_columns={{
          email: 'Correo Electronico',
          username: 'Nombre de usuario',
          rol: 'Rol',
          status: 'Estado',
          created_at: 'Fecha de creación',
        }}
      />
    </div>
  )
}