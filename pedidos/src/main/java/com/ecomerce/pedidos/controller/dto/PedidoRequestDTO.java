package com.ecomerce.pedidos.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.List;

@Data
@Schema(description = "DTO para crear o actualizar un pedido")
public class PedidoRequestDTO {
    
    @NotNull(message = "El ID del usuario es requerido")
    @Schema(description = "ID del usuario que realiza el pedido", example = "1")
    private Long usuarioId;

    @NotBlank(message = "La dirección de envío es requerida")
    @Schema(description = "Dirección de envío", example = "Calle Principal 123")
    private String direccionEnvio;

    @NotEmpty(message = "El pedido debe tener al menos un detalle")
    @Valid
    @Schema(description = "Lista de detalles del pedido")
    private List<DetallePedidoDTO> detalles;
} 