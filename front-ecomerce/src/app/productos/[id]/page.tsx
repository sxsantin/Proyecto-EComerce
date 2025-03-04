import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// En una versión real, esto se cargaría desde el backend
const getProductoEjemplo = (id: string) => {
  const productos = [
    {
      id: 1,
      nombre: "Laptop Pro X",
      descripcion: "Laptop de última generación con procesador potente y gráficos increíbles. Pantalla de alta resolución y batería de larga duración. Perfecta para trabajo y entretenimiento.",
      precio: 1299,
      stock: 10,
      categoria: "Electrónica",
      imagen: "https://placehold.co/600x400?text=Laptop",
    },
    {
      id: 2,
      nombre: "Teléfono inteligente Y20",
      descripcion: "Smartphone con cámara de alta resolución y batería de larga duración. Incluye las últimas características y un diseño elegante.",
      precio: 599,
      stock: 15,
      categoria: "Electrónica",
      imagen: "https://placehold.co/600x400?text=Smartphone",
    },
  ];
  
  return productos.find(p => p.id === parseInt(id)) || productos[0];
};

export default function ProductoDetallePage({ params }: { params: { id: string } }) {
  const producto = getProductoEjemplo(params.id);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link href="/productos" className="text-sm text-blue-500 hover:underline">
            ← Volver a productos
          </Link>
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-3xl font-bold mb-4">
                {producto.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Agotado'}
              </p>
              <p className="text-base">{producto.descripcion}</p>
            </div>

            <Separator />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">Categoría:</p>
                <Link href={`/productos/categoria/${producto.categoria.toLowerCase()}`} className="text-sm text-blue-500 hover:underline">
                  {producto.categoria}
                </Link>
              </div>

              <div className="mt-4">
                <Button size="lg" className="w-full">
                  Añadir al carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 