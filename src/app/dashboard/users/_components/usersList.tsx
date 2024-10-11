'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListUsers } from './usersListColumns'
import useForm from '@/hooks/useForm'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ISearch } from '../../_types/pagination'
import { toast } from 'sonner'
import { deleteUserById, getPaginationUser } from '@/services/user'
import { Modal } from '@/components/modal'
import { AddUser } from './addUser'
import { downloadUserReport } from '@/services/xlsx-report'
import { Download } from 'lucide-react'

export type IUser = {
  id: number
  username: string,
  email: string
  status: boolean
  rol: string
  created_at: Date | string
}


export const UsersList = () => {
  const { formValues: search, handleInputChange } = useForm<ISearch>({
    search: ''
  })
  const [users, setUsers] = useState<IUser[]>([])
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

  const handleAddUser = (user: IUser) =>
    setUsers(prevUser => [...prevUser, user])

  const handleDeleteuser = async (id: number) => {
    toast.loading('Eliminando usuario...')

    const response = await deleteUserById(id)
    toast.dismiss()

    if (response.success) {
      toast.success('Usuario eliminado con exito!')
      setUsers(prevUser => prevUser.filter((item) => item.id !== id))
    } else {
      toast.error('Hubo un error al eliminar el usuario', {
        description: response.message,
      })
    }
  }

  const handleGenerateUserReport = async () => {
    toast.loading('Generando reporte de usuarios...', {
      description: 'Porfavor espere un momento'
    })

    await downloadUserReport()
    toast.dismiss()
  }

  useEffect(() => {
    setLoading(true)
    const timeOut = setTimeout(() => {
      getPaginationUser({ page: currentPage, filter: search.search, limit: 10 })
        .then((data: any) => {
          if (data.success) {
            setUsers(data.data)
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
          Component={() => <AddUser handleAddUser={handleAddUser} />}
          title='Nuevo Usuario'
          description='Por favor llene todos los campos requeridos'
        >
          <Button>
            Agregar Nuevo Usuario
          </Button>
        </Modal>

        <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600/90" title="Exportar Registro de venta del Mes"
          onClick={handleGenerateUserReport}
        >
          <Download width={17} />
          Exportar
        </Button>
      </div>
      <DataTable<IUser>
        columns={ColumnsListUsers({ onDelete: handleDeleteuser })}
        data={users}
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