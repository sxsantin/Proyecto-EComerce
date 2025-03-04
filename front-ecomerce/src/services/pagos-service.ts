import api from './api';
import { Pago, PagoRequest } from '@/types';

const PagosService = {
  async procesarPago(pago: PagoRequest): Promise<Pago> {
    const response = await api.post<Pago>('/v1/pagos', pago);
    return response.data;
  },
  
  async getPagosByUsuario(usuarioId: number): Promise<Pago[]> {
    const response = await api.get<Pago[]>(`/v1/pagos/usuario/${usuarioId}`);
    return response.data;
  },
  
  async getPagosByPedido(pedidoId: number): Promise<Pago[]> {
    const response = await api.get<Pago[]>(`/v1/pagos/pedido/${pedidoId}`);
    return response.data;
  }
};

export default PagosService; 