package com.ecomerce.pedidos.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Schema(description = "DTO para detalles de pedido")
public class DetallePedidoDTO {
    
    @Schema(description = "ID del detalle")
    private Long id;

    @NotNull(message = "El ID del producto es requerido")
    @Schema(description = "ID del producto", example = "1")
    private Long productoId;

    @NotNull(message = "La cantidad es requerida")
    @Min(value = 1, message = "La cantidad debe ser mayor a 0")
    @Schema(description = "Cantidad del producto", example = "2")
    private Integer cantidad;

    @Schema(description = "Precio unitario del producto", example = "599.99")
    private BigDecimal precioUnitario;

    @Schema(description = "Subtotal del detalle", example = "1199.98")
    private BigDecimal subtotal;
} 