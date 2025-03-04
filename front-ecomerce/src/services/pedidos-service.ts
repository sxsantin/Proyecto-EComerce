import api from './api';
import { Pedido, PedidoRequest } from '@/types';

const PedidosService = {
  async crearPedido(pedido: PedidoRequest): Promise<Pedido> {
    const response = await api.post<Pedido>('/v1/pedidos', pedido);
    return response.data;
  },
  
  async getPedidoById(id: number): Promise<Pedido> {
    const response = await api.get<Pedido>(`/v1/pedidos/${id}`);
    return response.data;
  },
  
  async getPedidosByUsuario(usuarioId: number): Promise<Pedido[]> {
    const response = await api.get<Pedido[]>(`/v1/pedidos/usuario/${usuarioId}`);
    return response.data;
  },
  
  async actualizarEstadoPedido(id: number, nuevoEstado: string): Promise<Pedido> {
    const response = await api.patch<Pedido>(`/v1/pedidos/${id}/estado?nuevoEstado=${nuevoEstado}`);
    return response.data;
  }
};

export default PedidosService; 