import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Producto } from "@/types";
import useCartStore from "@/store/cart-store";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(producto, 1);
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg flex flex-col">
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="line-clamp-2 text-lg h-12">{producto.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 h-14 mb-2">
          {producto.descripcion}
        </p>
        <p className="font-bold text-xl">{producto.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
} 