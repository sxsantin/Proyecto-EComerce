// Tipos de autenticación
export interface RegisterRequest {
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  telefono?: string;
  direccion?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  userId: number;
  nombre: string;
  email: string;
}

// Tipos de producto
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen: string;
}

// Tipos de usuario
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Tipos de pedido
export interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  direccionEntrega: string;
  total: number;
  usuarioId: number;
  items: PedidoItem[];
}

export interface PedidoItem {
  id: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  productoId: number;
  producto?: Producto;
}

export interface PedidoRequest {
  usuarioId: number;
  items: {
    productoId: number;
    cantidad: number;
  }[];
  direccionEntrega: string;
}

// Tipos de pago
export interface Pago {
  id: number;
  fecha: string;
  monto: number;
  metodoPago: string;
  estado: string;
  pedidoId: number;
  usuarioId: number;
}

export interface PagoRequest {
  pedidoId: number;
  usuarioId: number;
  monto: number;
  metodoPago: string;
}

// Tipo para el carrito de compras
export interface CartItem {
  producto: Producto;
  cantidad: number;
} 