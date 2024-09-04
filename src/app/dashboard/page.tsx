import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StatisticData } from "./_components/statisticData";
import { FluctuationChart } from "./_components/chartFluctuation";
import { ActionsLinks } from "./_components/actionsLinks";
import { TopProducts } from "./_components/topProducts";


export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <StatisticData />
      <ActionsLinks />
      <FluctuationChart />
      <div>
        <TopProducts />
      </div>
    </div>
  );
}
