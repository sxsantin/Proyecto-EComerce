package com.ecomerce.productos.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Schema(description = "DTO para respuestas de producto")
public class ProductoResponseDTO {
    
    @Schema(description = "ID del producto")
    private Long id;

    @Schema(description = "Nombre del producto")
    private String nombre;

    @Schema(description = "Descripción del producto")
    private String descripcion;

    @Schema(description = "Precio del producto")
    private BigDecimal precio;

    @Schema(description = "Stock disponible")
    private Integer stock;

    @Schema(description = "Categoría del producto")
    private String categoria;

    @Schema(description = "URL de la imagen del producto")
    private String imagen;

    @Schema(description = "Fecha de creación del producto")
    private LocalDateTime fechaCreacion;

    @Schema(description = "Estado del producto")
    private boolean activo;
} 