'use client'
import { StatisticData } from "./_components/statisticData";
import { FluctuationChart } from "./_components/fluctuationChart";
import { ActionsLinks } from "./_components/actionsLinks";
import { TopProducts } from "./_components/topProducts";
import { TopProductsChart } from "./_components/topProductsChart";
import { useEffect, useState } from "react";
import { getMonthlySalesInformation } from "@/services/dashboard";

export interface IGetMonthlySalesInformation {
  total_cash: number
  cash_percentage: number
  total_product: number
  total_sales: number
  sales_percentage: number
  total_inventory_value: number
}

export default function Home() {
  const [statisticData, setStatisticData] = useState<IGetMonthlySalesInformation>({} as any)

  useEffect(() => {
    getMonthlySalesInformation()
      .then((response) => {
        if (response.success) {
          setStatisticData(response.data as any)
        }
      })

  }, [])
  return (
    <div className="flex flex-col gap-4">
      <StatisticData {...statisticData} />
      <ActionsLinks />
      <FluctuationChart />
      <TopProducts />
      <TopProductsChart />
    </div>
  );
}
