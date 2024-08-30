import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="w-full flex items-center justify-center flex-col gap-4 h-screen 
    ">
      <div className="flex flex-col items-center gap-6 ">
        <h1 className="text-4xl font-bold">Inventario</h1>
        <h2 className="text-xl">Creado por {'->'} Francisco Garcia</h2>
        <Link href="/dashboard">
          <Button>
            Ir al Dashboard
          </Button>
        </Link>
        <small>
          ® {new Date().getFullYear()} Todos los derechos reservados
        </small>
      </div>
    </main >
  );
}
