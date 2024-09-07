import { StatisticDataItem } from "../../_components/StatisticDataItem"

export const InventoryValue = () => {
  return (
    <div className="p-4 bg-white shadow-sm rounded-lg">
      <StatisticDataItem
        value="$389,245.90"
        label="Valor Total de Inventario"
        increase={0}
      />
    </div>
  )
}