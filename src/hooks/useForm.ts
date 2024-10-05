import { useState } from 'react'

interface FormState {
  [key: string]: any
}

interface UseFormReturn<T> {
  formValues: T
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
  setValues: (newValues: Partial<T>) => void
}

const useForm = <T extends FormState>(initialState: T): UseFormReturn<T> => {
  const [formValues, setFormValues] = useState<T>(initialState)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormValues(initialState)
  }

  const setValues = (newValues: Partial<T>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }))
  }

  return {
    formValues,
    handleInputChange,
    resetForm,
    setValues,
  }
}

export default useForm
