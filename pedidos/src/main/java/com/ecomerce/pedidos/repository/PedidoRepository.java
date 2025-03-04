package com.ecomerce.pedidos.repository;

import com.ecomerce.pedidos.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
    List<Pedido> findByUsuarioIdAndEstado(Long usuarioId, String estado);
} 