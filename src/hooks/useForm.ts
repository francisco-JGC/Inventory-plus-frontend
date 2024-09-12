import { useState } from "react";

interface FormState {
  [key: string]: any;
}

interface UseFormReturn<T> {
  formValues: T;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

const useForm = <T extends FormState>(initialState: T): UseFormReturn<T> => {
  const [formValues, setFormValues] = useState<T>(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormValues(initialState);
  };

  return {
    formValues,
    handleInputChange,
    resetForm,
  };
};

export default useForm;
