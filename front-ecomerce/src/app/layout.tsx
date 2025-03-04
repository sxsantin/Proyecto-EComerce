import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce - Tu tienda online de confianza",
  description: "Encuentra productos de calidad a precios competitivos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <footer className="w-full border-t py-6 md:py-8">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">E-Commerce</h3>
                  <p className="text-sm text-muted-foreground">
                    Productos de alta calidad a precios competitivos.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Enlaces rápidos</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/productos" className="text-sm text-muted-foreground hover:text-primary">
                        Productos
                      </a>
                    </li>
                    <li>
                      <a href="/categorias" className="text-sm text-muted-foreground hover:text-primary">
                        Categorías
                      </a>
                    </li>
                    <li>
                      <a href="/auth/register" className="text-sm text-muted-foreground hover:text-primary">
                        Crear cuenta
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Contacto</h3>
                  <p className="text-sm text-muted-foreground">
                    soporte@ecommerce.com
                  </p>
                  <p className="text-sm text-muted-foreground">
                    +34 900 123 456
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t pt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
