"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productosApi } from "@/services/api";
import { Loader2 } from "lucide-react";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await productosApi.getAll();
        
        // Si la API no devuelve imágenes, usamos estas por defecto basadas en categoría
        const productosConImagenes = data.map((producto: any) => ({
          ...producto,
          imagen: producto.imagen || getCategoryImage(producto.categoria)
        }));
        
        setProductos(productosConImagenes);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.");
        
        // Usar datos de ejemplo si falla la carga de la API
        setProductos(productosEjemplo);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const getCategoryImage = (categoria: string) => {
    const categoriaLower = categoria?.toLowerCase() || "";
    
    if (categoriaLower.includes("electro")) {
      return "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    } else if (categoriaLower.includes("ropa")) {
      return "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    } else if (categoriaLower.includes("hogar")) {
      return "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80";
    } else if (categoriaLower.includes("deporte")) {
      return "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    } else {
      return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
    }
  };

  // Datos de ejemplo para mostrar en caso de fallo de API
  const productosEjemplo = [
    {
      id: 1,
      nombre: "Laptop Pro X",
      descripcion: "Laptop de última generación con procesador potente y gráficos increíbles.",
      precio: 1299,
      stock: 10,
      categoria: "Electrónica",
      imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    },
    {
      id: 2,
      nombre: "Teléfono inteligente Y20",
      descripcion: "Smartphone con cámara de alta resolución y batería de larga duración.",
      precio: 599,
      stock: 15,
      categoria: "Electrónica",
      imagen: "https://images.unsplash.com/photo-1598327105666-2e1b5a8ce761?ixlib=rb-4.0.3&auto=format&fit=crop&w=627&q=80",
    },
    {
      id: 3,
      nombre: "Auriculares inalámbricos",
      descripcion: "Auriculares con cancelación de ruido y sonido premium.",
      precio: 199,
      stock: 20,
      categoria: "Electrónica",
      imagen: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80",
    },
    {
      id: 4,
      nombre: "Zapatillas deportivas",
      descripcion: "Zapatillas cómodas para correr o entrenar.",
      precio: 89,
      stock: 30,
      categoria: "Ropa",
      imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 5,
      nombre: "Camiseta de algodón",
      descripcion: "Camiseta suave y transpirable para uso diario.",
      precio: 29,
      stock: 50,
      categoria: "Ropa",
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    },
    {
      id: 6,
      nombre: "Licuadora de alta potencia",
      descripcion: "Licuadora con múltiples velocidades para todo tipo de preparaciones.",
      precio: 79,
      stock: 12,
      categoria: "Hogar",
      imagen: "https://images.unsplash.com/photo-1619067569156-eda73268aa84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <div className="container py-8 mx-auto max-w-6xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Todos los productos</h1>
          <div className="flex flex-wrap gap-4">
            {/* Filtros de categoría */}
            <div className="flex flex-wrap gap-2">
              {["Todos", "Electrónica", "Ropa", "Hogar", "Deportes"].map((categoria) => (
                <Button 
                  key={categoria} 
                  variant="outline" 
                  size="sm"
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-2">Cargando productos...</span>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Intentar de nuevo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <Link key={producto.id} href={`/productos/${producto.id}`}>
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg line-clamp-2">{producto.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 pb-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {producto.descripcion}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <span className="font-bold text-lg">${producto.precio}</span>
                    <Button size="sm">Ver detalles</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 