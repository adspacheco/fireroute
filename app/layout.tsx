import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Flame } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FireRoute - Monitoramento de Focos de Incêndio",
  description: "Acompanhe em tempo real os focos de incêndio na sua região",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto p-5 flex justify-between items-center">
            <Link
              href="/"
              className="flex gap-2 items-center font-semibold text-base tracking-tight"
            >
              <Flame className="size-6 text-red-500" />
              FireRoute
            </Link>
            <nav>
              <Link href="/sobre" className="hover:underline">
                Sobre o projeto
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
          <div className="max-w-6xl mx-auto px-5">
            <p>© 2025 FireRoute - Monitoramento de Focos de Incêndio</p>
          </div>
        </footer>

        <Toaster />
      </body>
    </html>
  );
}
