import { Flame } from "lucide-react";
import Link from "next/link";

export default function Home() {
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
        <div>Mapa do site</div>
      </div>
    </div>
  );
}
