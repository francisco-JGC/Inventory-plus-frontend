'use client'
import { DataTable } from '@/components/dataTable'
import { ColumnsListProduct } from './listProductColumns'
import useForm from '@/hooks/useForm'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ISearch } from '../../_types/pagination'
import { deleteProductById, getPaginationProduct } from '@/services/product'
import { toast } from 'sonner'
import { downloadInventoryReport } from '@/services/xlsx-report'
import { Download } from 'lucide-react'

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

  const handleDeleteProduct = async (id: number) => {
    const response = await deleteProductById(id)
    toast.dismiss()

    if (response.success) {
      toast.success('Producto eliminado con exito!')
      setProducts(prevProduct => prevProduct.filter((item) => item.id !== id))
    } else {
      toast.error('Hubo un error al eliminar el producto', {
        description: response.message,
      })
    }
  }

  const handleGenerateInventory = async () => {
    toast.loading('Generando reporte de Inventario...', {
      description: 'Porfavor espere un momento'
    })

    await downloadInventoryReport()
    toast.dismiss()
  }

  useEffect(() => {
    setLoading(true)
    const timeOut = setTimeout(() => {
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
        <Button className='bg-indigo-500'>
          <Link href={'/dashboard/inventory/add-product'}>
            Agregar Nuevo Producto
          </Link>
        </Button>

        <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600/90" title="Exportar Registro de venta del Mes"
          onClick={handleGenerateInventory}
        >
          <Download width={17} />
          Exportar
        </Button>
      </div>
      <DataTable<IProduct>
        columns={ColumnsListProduct({ onDelete: handleDeleteProduct })}
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