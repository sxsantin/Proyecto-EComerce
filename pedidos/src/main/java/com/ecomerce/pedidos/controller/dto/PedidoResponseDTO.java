package com.ecomerce.pedidos.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Schema(description = "DTO para respuestas de pedido")
public class PedidoResponseDTO {
    
    @Schema(description = "ID del pedido")
    private Long id;

    @Schema(description = "ID del usuario que realizó el pedido")
    private Long usuarioId;

    @Schema(description = "Estado del pedido")
    private String estado;

    @Schema(description = "Total del pedido")
    private BigDecimal total;

    @Schema(description = "Fecha de creación del pedido")
    private LocalDateTime fechaCreacion;

    @Schema(description = "Fecha de última actualización del pedido")
    private LocalDateTime fechaActualizacion;

    @Schema(description = "Dirección de envío")
    private String direccionEnvio;

    @Schema(description = "Detalles del pedido")
    private List<DetallePedidoDTO> detalles;
} 