'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListProduct } from './listProductColumns'
import useForm from '@/hooks/useForm'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ISearch } from '../../_types/pagination'
import { getPaginationProduct } from '@/services/product'

export type IProduct = {
  id: number
  product_name: string
  stock: number
  low_stock_limit: number
  status: 'show' | 'hide'
  created_at: string
  provider_name: string
  price: number
}

export const InventoryListProduct = () => {
  const { formValues: search, handleInputChange } = useForm<ISearch>({
    search: ''
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [products, setProducts] = useState<IProduct[]>([])
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

  useEffect(() => {
    getPaginationProduct({ page: currentPage, filter: search.search, limit: 10 })
      .then((response) => {
        if (response.success) {
          setProducts(response.data as any)
          setPagination({
            current_page: pagination.current_page,
            total_pages: pagination.total_pages,
            total_data: pagination.total_data,
          })
        }
      })

  }, [])

  return (
    <div className='bg-white p-4 shadow rounded flex flex-col gap-4'>
      <div>
        <Button className='bg-indigo-500'>
          <Link href={'/dashboard/inventory/add-product'}>
            Agregar Nuevo Producto
          </Link>
        </Button>
      </div>
      <DataTable<IProduct>
        columns={ColumnsListProduct({ onDelete: () => { } })}
        data={products}
        search_by='product_name'
        searchValue={search.search}
        handleSearch={handleInputChange}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
        totalPages={pagination.total_pages}
        isLoading={loading}
        search_placeholder="Buscar nombre del producto"
        filter_columns={{
          product_name: 'Nombre del producto',
          stock: 'Stock',
          low_stock_limit: 'Limite de stock bajo',
          status: 'Estado',
          created_at: 'Fecha de creación',
          provider_name: 'Proveedores',
          price: 'Precio',
        }}
      />
    </div>
  )
}