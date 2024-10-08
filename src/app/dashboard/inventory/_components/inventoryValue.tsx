import { PriceFormat } from "@/utils/price-format"
import { StatisticDataItem } from "../../_components/StatisticDataItem"

export const InventoryValue = ({ value }: { value: number }) => {
  return (
    <div className="p-4 bg-indigo-600  shadow-sm rounded-lg text-center">
      <StatisticDataItem
        value={PriceFormat(value || 0)}
        label="Valor Total de Inventario"
        increase={0}
        titleStyles="text-white"
        valueStyles="text-white"
      />
    </div>
  )
}