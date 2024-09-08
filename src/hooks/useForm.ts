import { useState } from "react";

export const useForm = (initialState: any = {}) => {
  const [values, setValues] = useState<any>(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = (target: any) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, setValues, handleInputChange, reset, handleSelectChange };
};
