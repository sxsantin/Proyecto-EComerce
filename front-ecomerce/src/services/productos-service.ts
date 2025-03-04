import api from './api';
import { Producto } from '@/types';

const ProductosService = {
  async getAll(): Promise<Producto[]> {
    const response = await api.get<Producto[]>('/v1/productos');
    return response.data;
  },
  
  async getById(id: number): Promise<Producto> {
    const response = await api.get<Producto>(`/v1/productos/${id}`);
    return response.data;
  },
  
  async getByCategoria(categoria: string): Promise<Producto[]> {
    const response = await api.get<Producto[]>(`/v1/productos/categoria/${categoria}`);
    return response.data;
  },
  
  async searchByName(nombre: string): Promise<Producto[]> {
    const response = await api.get<Producto[]>(`/v1/productos/buscar?nombre=${nombre}`);
    return response.data;
  }
};

export default ProductosService; 