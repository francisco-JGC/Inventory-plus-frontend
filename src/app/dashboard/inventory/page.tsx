import { InventoryListProduct } from "./_components/inventoryListProduct";
import { InventoryValue } from "./_components/inventoryValue";
import { StatisticData } from "./_components/statisticData";

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <StatisticData />
        <InventoryValue />
      </div>

      <div>
        <InventoryListProduct />
      </div>
    </div>
  );
}