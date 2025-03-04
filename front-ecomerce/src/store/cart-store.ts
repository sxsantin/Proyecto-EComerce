import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Producto } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (producto: Producto, cantidad: number) => void;
  removeItem: (productoId: number) => void;
  updateQuantity: (productoId: number, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (producto: Producto, cantidad: number) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.producto.id === producto.id
        );

        if (existingItemIndex !== -1) {
          // Si el producto ya existe en el carrito, actualizar cantidad
          const updatedItems = [...items];
          updatedItems[existingItemIndex].cantidad += cantidad;
          set({ items: updatedItems });
        } else {
          // Si no existe, agregarlo al carrito
          set({ items: [...items, { producto, cantidad }] });
        }
      },
      
      removeItem: (productoId: number) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.producto.id !== productoId)
        });
      },
      
      updateQuantity: (productoId: number, cantidad: number) => {
        const { items } = get();
        
        if (cantidad <= 0) {
          // Si la cantidad es 0 o menor, eliminar el item
          set({
            items: items.filter((item) => item.producto.id !== productoId)
          });
        } else {
          // Actualizar la cantidad
          set({
            items: items.map((item) =>
              item.producto.id === productoId
                ? { ...item, cantidad }
                : item
            )
          });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.producto.precio * item.cantidad,
          0
        );
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.cantidad, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);

export default useCartStore; 