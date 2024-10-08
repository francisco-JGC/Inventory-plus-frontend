import { ChevronUp } from 'lucide-react'

interface IStatisticItemsProps {
  label: string
  value: string | number
  increase: number
  titleStyles?: string
  valueStyles?: string
}

export const StatisticDataItem = ({ value, label, increase, titleStyles, valueStyles }: IStatisticItemsProps) => {
  return (
    <div className="p-4 rounded-sm flex flex-col gap-4 ">
      <div className='flex items-center gap-4'>
        <h3 className={`text-2xl font-semibold text-gray-800 text-center w-full ${titleStyles}`}>{value}</h3>
        <div className='flex gap-1 items-center'>
          {
            increase !== 0 && (
              <>
                <ChevronUp width={15} className={`${increase < 0 ? 'text-red-500 rotate-180' : 'text-green-500'}`} />
                <span className={`text-xs font-semibold ${increase < 0 ? 'text-red-500' : 'text-green-500'}`}>{increase}%</span>
              </>
            )
          }
        </div>
      </div>
      <span className={`text-gray-500 text-sm ${valueStyles}`}>{label}</span>
    </div>
  )
}

export const SeparatorLine = () => {
  return <div className="border" />
}