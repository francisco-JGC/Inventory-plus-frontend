'use client'
import { StatisticData } from "./_components/statisticData";
import { FluctuationChart, IChartData } from "./_components/fluctuationChart";
import { ActionsLinks } from "./_components/actionsLinks";
import { TopProducts } from "./_components/topProducts";
import { TopProductsChart } from "./_components/topProductsChart";
import { useEffect, useState } from "react";
import { getMonthlySalesInformation, getSalesLastSixMonths, getTop7Products } from "@/services/dashboard";

export interface IGetMonthlySalesInformation {
  total_cash: number
  cash_percentage: number
  total_product: number
  total_sales: number
  sales_percentage: number
  total_inventory_value: number
}

export interface IGetSalesLastSixMonths {
  month: string
  totalSales: number
  totalRevenue: number
  startDate: string
  endDate: string
}
export interface ITopProducts {
  id: number
  product_name: string
  provider_name: string
  stock: number
  total_sold: number
}

export interface IChartTopProducts {
  product_name: string
  sales: number
}


export default function Home() {
  const [statisticData, setStatisticData] = useState<IGetMonthlySalesInformation>({} as any)
  const [fluctuation, setFluctiation] = useState<IChartData[]>([])
  const [topProducts, setTopProducts] = useState<ITopProducts[]>([])
  const [chartTopProducts, setChartTopProducts] = useState<IChartTopProducts[]>([])
  useEffect(() => {
    getMonthlySalesInformation()
      .then((response) => {
        if (response.success) {
          setStatisticData(response.data as any)
        }
      })
    getSalesLastSixMonths()
      .then((response) => {
        if (response.success) {
          const { data } = response as { data: IGetSalesLastSixMonths[] }
          setFluctiation(data.map(item => {
            return {
              date: item.startDate,
              sales: item.totalSales
            }
          }))
        }
      })
    getTop7Products()
      .then((response) => {
        if (response.success) {
          const { data } = response as { data: ITopProducts[] }
          setTopProducts(data)
          setChartTopProducts(data.map(item => {
            return {
              product_name: item.product_name,
              sales: item.total_sold
            }
          }))
        }
      })

  }, [])
  return (
    <div className="flex flex-col gap-4">
      <StatisticData {...statisticData} />
      <ActionsLinks />
      <FluctuationChart chartData={fluctuation} />
      <TopProducts data={topProducts} />
      <TopProductsChart chartData={chartTopProducts} />
    </div>
  );
}
