package com.ecomerce.pagos.controller;

import com.ecomerce.pagos.dto.PagoRequestDTO;
import com.ecomerce.pagos.dto.PagoResponseDTO;
import com.ecomerce.pagos.service.PagoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/pagos")
@RequiredArgsConstructor
@Tag(name = "Pagos", description = "API para gestionar pagos")
public class PagoController {

    private final PagoService pagoService;

    @PostMapping
    @Operation(summary = "Procesar un nuevo pago")
    public ResponseEntity<PagoResponseDTO> procesarPago(@Valid @RequestBody PagoRequestDTO request) {
        return ResponseEntity.ok(pagoService.procesarPago(request));
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Obtener pagos por usuario")
    public ResponseEntity<List<PagoResponseDTO>> obtenerPagosPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(pagoService.obtenerPagosPorUsuario(usuarioId));
    }

    @GetMapping("/pedido/{pedidoId}")
    @Operation(summary = "Obtener pagos por pedido")
    public ResponseEntity<List<PagoResponseDTO>> obtenerPagosPorPedido(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(pagoService.obtenerPagosPorPedido(pedidoId));
    }
} 