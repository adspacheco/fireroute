import { DynamicMap } from "@/components/map";
import { Flame } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const DEFAULT_POSITION: [number, number] = [-23.564324, -46.652713];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto p-5 space-y-6 w-full">
        <header className="flex justify-between items-center">
          <Link
            href="/"
            className="flex gap-2 items-center font-semibold text-base tracking-tight"
          >
            <Flame className="size-6" />
            FireRoute
          </Link>
          <nav>Sobre</nav>
        </header>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <DynamicMap position={DEFAULT_POSITION} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
