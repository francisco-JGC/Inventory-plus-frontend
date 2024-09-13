'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListProduct } from './listProductColumns'
import useForm from '@/hooks/useForm'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ISearch } from '../../_types/pagination'

export type IProduct = {
  id: number | string
  stock: number,
  status: 'show' | 'hide',
  product_name: string,
  low_stock_limit: number,
  price: number,
  created_at: Date | string
  updated_at: Date | string
}

const data: IProduct[] = [
  {
    id: "m5gr84i9",
    stock: 316,
    status: "show",
    product_name: "ken99@yahoo.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "3u1reuv4",
    stock: 242,
    status: "show",
    product_name: "Abe45@gmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "derv1ws0",
    stock: 837,
    status: "hide",
    product_name: "Monserrat44@gmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "5kma53ae",
    stock: 874,
    status: "show",
    product_name: "Silas22@gmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "bhqecj4p",
    stock: 721,
    status: "hide",
    product_name: "carmella@hotmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "m5gr84i9",
    stock: 316,
    status: "show",
    product_name: "ken99@yahoo.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "3u1reuv4",
    stock: 242,
    status: "show",
    product_name: "Abe45@gmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "derv1ws0",
    stock: 837,
    status: "hide",
    product_name: "Monserrat44@gmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "5kma53ae",
    stock: 874,
    status: "show",
    product_name: "Silas22@gmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
  {
    id: "bhqecj4p",
    stock: 721,
    status: "hide",
    product_name: "carmella@hotmail.com",
    low_stock_limit: 10,
    price: 250,
    created_at: Date(),
    updated_at: Date()
  },
]

export const InventoryListProduct = () => {
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
            Agregar Nuevo Producto
          </Link>
        </Button>
      </div>
      <DataTable<IProduct>
        columns={ColumnsListProduct}
        data={data}
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
          updated_at: 'Ultima actualización',
          price: 'Precio',
        }}
      />
    </div>
  )
}