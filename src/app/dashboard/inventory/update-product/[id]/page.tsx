'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { useState, useEffect } from "react";
import { AddCategory, ICategory } from "../../add-product/_components/addCategory";
import { Modal } from "@/components/modal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductById, updateProductById } from "@/services/product";
import { getCategories } from "@/services/category";
import { IProvider } from "../../../providers/_components/providersList";
import { getAllProvider } from "@/services/provider";
import { ICreateProduct } from "../../add-product/page";

export interface IRoot {
  params: {
    id: string
  }
}


export default function Page({ params }: IRoot) {
  const { id } = params
  const { formValues, handleInputChange, resetForm, setValues } = useForm<ICreateProduct>({} as any)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [providers, setProviders] = useState<IProvider[]>([])

  const handleAddCategory = (category: ICategory) => {
    setCategories((prev) => [...prev, category])
  }

  const handleUpdateProduct = async () => {
    const response = await updateProductById(Number(id), formValues)
    toast.dismiss()

    if (!response.success) {
      return toast.error('Hubo un error al actualizar el producto', {
        description: response.message,
      })
    }

    toast.success('Se ha actualizado el producto')
  }

  useEffect(() => {
    getCategories().then((response) => {
      if (response.success) {
        setCategories(response.data as ICategory[])
      }
    })

    getAllProvider().then(respose => {
      if (respose.success) {
        setProviders(respose.data as IProvider[])
      }
    })

    getProductById(Number(id))
      .then((response) => {
        if (response.success) {
          const { data } = response as { data: any }
          setValues({
            product_name: data.product_name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            category_name: data.category.name,
            discount: data.discount,
            provider_name: data.provider.name,
            status: data.status,
            low_stock_limit: data.low_stock_limit
          })
        } else {
          toast.error('Hubo un error en la solicitud', {
            description: response.message
          })
        }
      })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium px-4">Actualizar informacion de producto</h1>

      <div className="bg-white rounded-sm shadow p-4 flex flex-col gap-6 w-full">
        <div>
          <span>Información Básica</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium  text-gray-400">Nombre del producto</label>
          <Input
            value={formValues.product_name}
            onChange={handleInputChange}
            name="product_name"
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-medium  text-gray-400">Precio U.</label>
            <Input
              value={formValues.price}
              onChange={handleInputChange}
              name="price"
              required
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium  text-gray-400">Stock (Cant.)</label>
            <Input
              value={formValues.stock}
              onChange={handleInputChange}
              name="stock"
              required
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium  text-gray-400">Limite de stock bajo</label>
            <Input
              value={formValues.low_stock_limit}
              onChange={handleInputChange}
              name="low_stock_limit"
              required
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium  text-gray-400">Descuento (opcional)</label>
            <Input
              value={formValues.discount}
              onChange={handleInputChange}
              name="discount"
              required
              type="number"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium  text-gray-400">Descripción</label>
          <Input
            value={formValues.description}
            onChange={handleInputChange}
            name="description"
            required
          />
        </div>
      </div>

      <div className="bg-white rounded-sm shadow p-4 flex flex-col gap-6 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium  text-gray-400">Categoria</label>

            <select
              name="category_name"
              onChange={(e) => handleInputChange(e as any)}
              value={formValues.category_name}
              className=
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

            >
              <option value="" selected disabled>Seleccione una categoria</option>
              {
                categories.map((item: { name: string }, index: number) => (<option key={index} value={item.name}>{item.name}</option>))
              }
            </select>

            <div className="text-blue-500 font-bold">
              <Modal
                className="mt-2"
                nameButton="Crear categoria"
                title="Nueva Categoria"
                description="Crea una categoria para diferenciar los productos de tu inventario"
                Component={() => <AddCategory handleAddCategory={handleAddCategory} />}
                Icon={Plus}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium  text-gray-400">Proveedor</label>

            <select
              name="provider_name"
              onChange={(e) => handleInputChange(e as any)}
              value={formValues.provider_name}
              className=
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

            >
              <option value="" selected disabled>Seleccione un proveedor</option>
              {
                providers.map((item: { name: string }, index: number) => (<option key={index} value={item.name}>{item.name}</option>))
              }
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="status"
              checked={formValues.status === 'show' ? true : false}
              onCheckedChange={(e) => {
                handleInputChange({
                  target: {
                    value: e ? 'show' : 'hide',
                    name: 'status'
                  }
                } as any)
              }}
              name="status"
            />
            <label
              htmlFor="status"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Visibilidad
            </label>
          </div>
        </div>
      </div>

      <div>
        <Button onClick={handleUpdateProduct}>
          Actualizar informacion
        </Button>
      </div>
    </div>
  );
}