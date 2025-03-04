package com.ecomerce.pedidos.controller;

import com.ecomerce.pedidos.controller.dto.PedidoRequestDTO;
import com.ecomerce.pedidos.controller.dto.PedidoResponseDTO;
import com.ecomerce.pedidos.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/pedidos")
@Tag(name = "Pedidos", description = "API para gestión de pedidos")
@Slf4j
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo pedido")
    public ResponseEntity<PedidoResponseDTO> crearPedido(@Valid @RequestBody PedidoRequestDTO request) {
        log.info("Recibida solicitud para crear pedido");
        return new ResponseEntity<>(pedidoService.crearPedido(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un pedido por ID")
    public ResponseEntity<PedidoResponseDTO> obtenerPedido(@PathVariable Long id) {
        log.info("Recibida solicitud para obtener pedido con ID: {}", id);
        return ResponseEntity.ok(pedidoService.obtenerPedido(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Listar pedidos de un usuario")
    public ResponseEntity<List<PedidoResponseDTO>> listarPedidosUsuario(@PathVariable Long usuarioId) {
        log.info("Recibida solicitud para listar pedidos del usuario: {}", usuarioId);
        return ResponseEntity.ok(pedidoService.listarPedidosUsuario(usuarioId));
    }

    @PatchMapping("/{id}/estado")
    @Operation(summary = "Actualizar estado de un pedido")
    public ResponseEntity<PedidoResponseDTO> actualizarEstadoPedido(
            @PathVariable Long id,
            @RequestParam String nuevoEstado) {
        log.info("Recibida solicitud para actualizar estado del pedido {} a: {}", id, nuevoEstado);
        return ResponseEntity.ok(pedidoService.actualizarEstadoPedido(id, nuevoEstado));
    }
} 