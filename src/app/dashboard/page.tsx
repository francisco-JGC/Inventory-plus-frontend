import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StatisticData } from "./_components/statisticData";
import { FluctuationChart } from "./_components/chartFluctuation";


export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <StatisticData />
      <FluctuationChart />
    </div>
  );
}
