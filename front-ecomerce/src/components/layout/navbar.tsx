"use client";

import Link from "next/link";
import { ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/auth-store";
import useCartStore from "@/store/cart-store";
import { useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo y navegación principal */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 font-bold">
              <span className="text-xl font-bold">E-Commerce</span>
            </Link>
            <nav className="ml-10 hidden md:flex space-x-8 items-center">
              <Link
                href="/productos"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Productos
              </Link>
              <Link
                href="/categorias"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Categorías
              </Link>
              {isAuthenticated && (
                <Link
                  href="/mis-pedidos"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Mis Pedidos
                </Link>
              )}
            </nav>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú principal"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Carrito y acciones de usuario */}
          <div className="flex items-center space-x-4">
            <Link href="/carrito">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.nombre?.substring(0, 2).toUpperCase() || "US"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="font-medium">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 border-t">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/productos"
              className="text-sm font-medium py-2 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/categorias"
              className="text-sm font-medium py-2 text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categorías
            </Link>
            {isAuthenticated && (
              <Link
                href="/mis-pedidos"
                className="text-sm font-medium py-2 text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mis Pedidos
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 