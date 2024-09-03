import { SeparatorLine, StatisticDataItem } from "./StatisticDataItem"

export const StatisticData = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg w-full p-4 ">
      <div>
        <span className='p-4 text-gray-400 font-semibold text-xs tracking-wider'>VISTA GENERAL</span>
      </div>
      <div className='flex justify-between relative'>
        <StatisticDataItem
          value="$14,390.13"
          label="Total Efectivo"
          increase={31.5}
        />
        <SeparatorLine />
        <StatisticDataItem
          value="891"
          label="Total Productos en Inventario"
          increase={0}
        />
        <SeparatorLine />
        <StatisticDataItem
          value="457"
          label="Ventas Realizadas"
          increase={-6.78}
        />
        <SeparatorLine />
        <StatisticDataItem
          value="$389,245.90"
          label="Valor Total de Inventario"
          increase={0}
        />
      </div>
    </div>
  )
}

