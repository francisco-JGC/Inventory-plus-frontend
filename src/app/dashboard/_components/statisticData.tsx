import { Button } from "@/components/ui/button"
import { SeparatorLine, StatisticDataItem } from "./StatisticDataItem"
import { Download, FileArchiveIcon, FileBadge } from "lucide-react"

export const StatisticData = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg w-full p-4 ">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col px-4">
          <span className='text-gray-400 font-semibold text-xs tracking-wider'>VISTA GENERAL</span>
          <small className="text-gray-400">Información del mes actual</small>
        </div>
        <div>
          <Button className="flex gap-2 items-center bg-indigo-500 hover:bg-indigo-600/90" title="Exportar Registro de venta del Mes">
            <Download width={17} />
            Exportar
          </Button>
        </div>
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
    </div >
  )
}

