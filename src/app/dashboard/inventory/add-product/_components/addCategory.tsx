import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useForm from "@/hooks/useForm"
import { createCategory } from "@/services/category"
import { FormEvent } from "react"
import { toast } from "sonner"

export interface ICategory {
  name: string
  description?: string
}

interface IProps {
  handleAddCategory: (category: ICategory) => void
}

export const AddCategory = ({ handleAddCategory }: IProps) => {
  const { formValues, resetForm, handleInputChange } = useForm<ICategory>({
    name: '',
    description: ''
  })

  const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValues.name) {
      return toast.warning('El nombre de la categoria es requerido')
    }
    toast.loading('Creando categoria...')

    const response = await createCategory(formValues)
    toast.dismiss()

    if (!response.success) {
      return toast.error('Hubo un error al crear la categoria', {
        description: response.message,
      })
    }
    toast.success('Categoria creada')
    handleAddCategory({ ...formValues })
    resetForm()
  }

  return <form className="h-40 flex flex-col gap-4" onSubmit={handleCreateCategory}>
    <Input placeholder="Nombre" onChange={handleInputChange} name="name" value={formValues.name} />
    <Input placeholder="Descripción (opcional)" onChange={handleInputChange} name="description" value={formValues.description} />

    <div className="mt-4">
      <Button type="submit">
        Crear Categoria
      </Button>
    </div>
  </form>
}