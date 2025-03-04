package com.ecomerce.pedidos.service;

import com.ecomerce.pedidos.client.ProductoClient;
import com.ecomerce.pedidos.client.UsuarioClient;
import com.ecomerce.pedidos.client.dto.ProductoDTO;
import com.ecomerce.pedidos.client.dto.UsuarioDTO;
import com.ecomerce.pedidos.controller.dto.*;
import com.ecomerce.pedidos.exception.PedidoException;
import com.ecomerce.pedidos.model.DetallePedido;
import com.ecomerce.pedidos.model.Pedido;
import com.ecomerce.pedidos.repository.PedidoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoClient productoClient;
    private final UsuarioClient usuarioClient;

    public PedidoService(PedidoRepository pedidoRepository, ProductoClient productoClient, UsuarioClient usuarioClient) {
        this.pedidoRepository = pedidoRepository;
        this.productoClient = productoClient;
        this.usuarioClient = usuarioClient;
    }

    @Transactional
    public PedidoResponseDTO crearPedido(PedidoRequestDTO request) {
        log.info("Creando nuevo pedido para usuario: {}", request.getUsuarioId());
        
        // Verificar que el usuario existe
        try {
            usuarioClient.obtenerUsuario(request.getUsuarioId());
        } catch (Exception e) {
            throw new PedidoException("Usuario no encontrado");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuarioId(request.getUsuarioId());
        pedido.setDireccionEnvio(request.getDireccionEnvio());
        pedido.setDetalles(new ArrayList<>());
        
        BigDecimal total = BigDecimal.ZERO;
        
        for (DetallePedidoDTO detalleDTO : request.getDetalles()) {
            // Verificar producto y stock
            ProductoDTO producto = productoClient.obtenerProducto(detalleDTO.getProductoId());
            if (producto.getStock() < detalleDTO.getCantidad()) {
                throw new PedidoException("Stock insuficiente para el producto: " + producto.getNombre());
            }

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setProductoId(detalleDTO.getProductoId());
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            
            pedido.getDetalles().add(detalle);
            total = total.add(detalle.getSubtotal());
        }
        
        pedido.setTotal(total);
        pedido = pedidoRepository.save(pedido);
        
        return convertirADTO(pedido);
    }

    @Transactional(readOnly = true)
    public PedidoResponseDTO obtenerPedido(Long id) {
        log.info("Buscando pedido con ID: {}", id);
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoException("Pedido no encontrado"));
        return convertirADTO(pedido);
    }

    @Transactional(readOnly = true)
    public List<PedidoResponseDTO> listarPedidosUsuario(Long usuarioId) {
        log.info("Listando pedidos del usuario: {}", usuarioId);
        return pedidoRepository.findByUsuarioId(usuarioId).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PedidoResponseDTO actualizarEstadoPedido(Long id, String nuevoEstado) {
        log.info("Actualizando estado del pedido {} a: {}", id, nuevoEstado);
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new PedidoException("Pedido no encontrado"));
        
        pedido.setEstado(nuevoEstado);
        pedido = pedidoRepository.save(pedido);
        
        return convertirADTO(pedido);
    }

    private PedidoResponseDTO convertirADTO(Pedido pedido) {
        PedidoResponseDTO dto = new PedidoResponseDTO();
        dto.setId(pedido.getId());
        dto.setUsuarioId(pedido.getUsuarioId());
        dto.setEstado(pedido.getEstado());
        dto.setTotal(pedido.getTotal());
        dto.setFechaCreacion(pedido.getFechaCreacion());
        dto.setFechaActualizacion(pedido.getFechaActualizacion());
        dto.setDireccionEnvio(pedido.getDireccionEnvio());
        
        List<DetallePedidoDTO> detallesDTO = pedido.getDetalles().stream()
                .map(detalle -> {
                    DetallePedidoDTO detalleDTO = new DetallePedidoDTO();
                    detalleDTO.setId(detalle.getId());
                    detalleDTO.setProductoId(detalle.getProductoId());
                    detalleDTO.setCantidad(detalle.getCantidad());
                    detalleDTO.setPrecioUnitario(detalle.getPrecioUnitario());
                    detalleDTO.setSubtotal(detalle.getSubtotal());
                    return detalleDTO;
                })
                .collect(Collectors.toList());
        
        dto.setDetalles(detallesDTO);
        return dto;
    }
} 