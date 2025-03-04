import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted relative">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Tu tienda de comercio electrónico de confianza
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Productos de alta calidad a precios competitivos. Envío rápido y seguro.
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Link href="/productos">
                <Button className="px-6">Ver productos</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" className="px-6">Crear cuenta</Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl bg-white">
              <Image
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Compras online"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Descubre una nueva forma de comprar</h2>
              <p className="text-muted-foreground">
                Nuestra plataforma te ofrece una experiencia de compra única, con miles de productos 
                seleccionados cuidadosamente para satisfacer tus necesidades.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Entrega rápida y segura
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Garantía de devolución
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Atención al cliente 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Categorías principales
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explora nuestras colecciones por categoría
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full">
              {[
                {
                  name: "Electrónica",
                  image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                },
                {
                  name: "Ropa",
                  image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                },
                {
                  name: "Hogar",
                  image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                },
                {
                  name: "Deportes",
                  image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/productos/categoria/${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg border border-border transition-transform hover:scale-105"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                ¿Por qué elegirnos?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nos distinguimos por:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full">
              {[
                {
                  title: "Envío rápido",
                  description: "Entrega en 24-48 horas a nivel nacional",
                  icon: "🚚"
                },
                {
                  title: "Atención al cliente",
                  description: "Soporte 24/7 para resolver todas tus dudas",
                  icon: "🎧"
                },
                {
                  title: "Garantía de calidad",
                  description: "Todos nuestros productos cuentan con garantía",
                  icon: "✅"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background transition-transform hover:scale-105"
                >
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
