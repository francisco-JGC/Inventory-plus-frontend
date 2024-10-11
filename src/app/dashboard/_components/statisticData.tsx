import { Button } from "@/components/ui/button"
import { SeparatorLine, StatisticDataItem } from "./StatisticDataItem"
import { Download, FileArchiveIcon, FileBadge } from "lucide-react"
import { IGetMonthlySalesInformation } from "../page"
import { PriceFormat } from "@/utils/price-format"

export const StatisticData = ({ total_cash, cash_percentage, total_inventory_value, total_product, total_sales, sales_percentage }: IGetMonthlySalesInformation) => {
  return (
    <div className="bg-white shadow-sm rounded-lg w-full p-4 ">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col px-4">
          <span className='text-gray-400 font-semibold text-xs tracking-wider'>VISTA GENERAL</span>
          <small className="text-gray-400">Información del mes actual</small>
        </div>
      </div>
      <div className='flex justify-between relative'>
        <StatisticDataItem
          value={PriceFormat(total_cash)}
          label="Total Efectivo"
          increase={cash_percentage}
        />
        <SeparatorLine />
        <StatisticDataItem
          value={total_product}
          label="Total Productos en Inventario"
          increase={0}
        />
        <SeparatorLine />
        <StatisticDataItem
          value={total_sales}
          label="Ventas Realizadas"
          increase={sales_percentage}
        />
        <SeparatorLine />
        <StatisticDataItem
          value={PriceFormat(total_inventory_value)}
          label="Valor Total de Inventario"
          increase={0}
        />
      </div>
    </div >
  )
}

