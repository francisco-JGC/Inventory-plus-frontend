'use client'
import { useEffect, useState } from "react";
import { InventoryListProduct } from "./_components/inventoryListProduct";
import { InventoryValue } from "./_components/inventoryValue";
import { StatisticData } from "./_components/statisticData";
import { getInventoryDetails } from "@/services/inventory";

export interface IDetailsInventory {
  total_value: number
  total_product: number
  total_providers: number
  productsWithLowStock: number
}


export default function InventoryPage() {
  const [inventoryDetails, setInventoryDetails] = useState<IDetailsInventory>({
    total_product: 0,
    productsWithLowStock: 0,
    total_providers: 0,
    total_value: 0
  })

  useEffect(() => {
    getInventoryDetails().then((response) => {
      if (response.success) {
        setInventoryDetails(response.data as any)
      }
    })

  }, [])
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <StatisticData {...inventoryDetails} />
        <InventoryValue value={inventoryDetails.total_value} />
      </div>

      <div>
        <InventoryListProduct />
      </div>
    </div>
  );
}