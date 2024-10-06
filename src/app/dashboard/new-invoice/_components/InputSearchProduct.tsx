"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState, useEffect } from "react"
import { IProductInvoice, ISelectedItem, ISelectedProducts } from "../page"
import { Input } from "@/components/ui/input"
import useForm from "@/hooks/useForm"

interface IProps {
  selectedProducts: ISelectedItem[]
  handleSelectedProduct: (product: ISelectedItem) => void
  products: IProductInvoice[]
}

export function InputSearchProduct({ selectedProducts, products, handleSelectedProduct }: IProps) {
  const [open, setOpen] = useState(false)
  const [rendererProducts, setRendererProducts] = useState<IProductInvoice[]>([])
  const { formValues, handleInputChange } = useForm({
    search: ''
  })

  const handleFilterProduct = (name: string) => {
    if (name) {
      setRendererProducts(
        products.filter((item) =>
          item.product_name.toLowerCase().includes(name.toLowerCase())
        )
      );
    } else {
      setRendererProducts(products);
    }
  };

  useEffect(() => {
    handleFilterProduct(formValues.search)
  }, [formValues.search])

  useEffect(() => {
    setRendererProducts(products)
  }, [])


  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Seleccione un producto...
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <div className="p-4">
              <Input name="search" value={formValues.search} onChange={handleInputChange} placeholder="Buscar producto..." />
            </div>
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup>
                {rendererProducts.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={() => {
                      handleSelectedProduct({ ...item, quantity: 1 })
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProducts.find((product) => product.id === item.id)?.id
                          ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.product_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}