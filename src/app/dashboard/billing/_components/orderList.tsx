'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListOrder } from './orderListColumns'
import useForm from '@/hooks/useForm'
import { useEffect, useState } from 'react'
import { ISearch } from '../../_types/pagination'
import { toast } from 'sonner'
import { deleteUserById } from '@/services/user'
import { getPaginationOrder } from '@/services/order'

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
  const [orders, setUsers] = useState<IOrderList[]>([])
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

  const handleDeleteuser = async (id: number) => {
    toast.loading('Eliminando usuario...')

    const response = await deleteUserById(id)
    toast.dismiss()

    if (response.success) {
      toast.success('Usuario eliminado con exito!')
      setUsers(prevUser => prevUser.filter((item) => item.id !== id))
    } else {
      toast.error('Hubo un error al eliminar el usuario', {
        description: 'Vuelva a intenarlo'
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    const timeOut = setTimeout(() => {
      getPaginationOrder({ page: currentPage, filter: search.search, limit: 10 })
        .then((data: any) => {
          if (data.success) {
            setUsers(data.data)
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
        {/*  */}
      </div>
      <DataTable<IOrderList>
        columns={ColumnsListOrder({ onDelete: handleDeleteuser })}
        data={orders}
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
          role: 'Rol',
          status: 'Estado',
          created_at: 'Fecha de creación',
        }}
      />
    </div>
  )
}