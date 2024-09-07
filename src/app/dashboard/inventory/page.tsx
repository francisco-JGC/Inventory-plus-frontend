import { InventoryValue } from "./_components/inventoryValue";
import { StatisticData } from "./_components/statisticData";

export default function InventoryPage() {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <StatisticData />
        <InventoryValue />
      </div>
    </div>
  );
}