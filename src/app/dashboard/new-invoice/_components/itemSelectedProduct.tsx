import { Input } from "@/components/ui/input"
import { ISelectedItem } from "../page"
import { PriceFormat } from "@/utils/price-format"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IProps {
  product: ISelectedItem
  handleItemQuantity: (id: number, quantity: number) => void
  handleDeleteSelectedProduct: (id: number) => void
}

export const ItemSelectedProduct = ({ product, handleItemQuantity, handleDeleteSelectedProduct }: IProps) => {
  return (
    <div className="w-full border p-2 rounded-lg flex gap-4 items-center">
      <span className="w-2/4 font-bold">{product.product_name}</span>
      <Input
        value={product.quantity}
        type="number"
        onChange={(e) => handleItemQuantity(product.id, Number(e.currentTarget.value))}
        min={1}
        max={product.stock}
        className="w-2/4"
      />
      <span className="w-2/2">
        {PriceFormat(product.price)}
      </span>
      <Button
        variant={"outline"}
        onClick={() => handleDeleteSelectedProduct(product.id)}
      >
        <Trash width={15} />
      </Button>
    </div >
  )
}