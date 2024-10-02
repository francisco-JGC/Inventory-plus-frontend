import { ICategory } from "@/app/dashboard/inventory/add-product/_components/addCategory";
import { fetchData } from "@/utils/fetch-data";
import { toast } from "sonner";

export const createCategory = async (category: ICategory) => {
  try {
    toast.loading("Creando categoria", {
      description: "Espere un momento...",
    });

    const response = await fetchData({
      url: "category/add",
      method: "POST",
      data: category,
      useToken: true,
    });

    toast.dismiss();

    return response;
  } catch (error) {
    toast.error("Error al crear la categoria", {
      description: "por favor vuelva a intentarlo",
    });
  }
};
