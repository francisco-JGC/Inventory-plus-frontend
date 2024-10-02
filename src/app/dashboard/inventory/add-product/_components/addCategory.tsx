import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useForm from "@/hooks/useForm"

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

  return <div className="h-40 flex flex-col gap-4">
    <Input placeholder="Nombre" onChange={handleInputChange} name="name" value={formValues.name} />
    <Input placeholder="Descripción (opcional)" onChange={handleInputChange} name="description" value={formValues.description} />

    <div className="mt-4">
      <Button>
        Crear Categoria
      </Button>
    </div>
  </div>
}