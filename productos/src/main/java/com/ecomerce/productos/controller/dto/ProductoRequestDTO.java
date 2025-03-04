package com.ecomerce.productos.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Schema(description = "DTO para crear o actualizar un producto")
public class ProductoRequestDTO {
    
    @NotBlank(message = "El nombre es requerido")
    @Schema(description = "Nombre del producto", example = "Smartphone XYZ")
    private String nombre;

    @Schema(description = "Descripción del producto", example = "Smartphone de última generación con 128GB de almacenamiento")
    private String descripcion;

    @NotNull(message = "El precio es requerido")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    @Schema(description = "Precio del producto", example = "599.99")
    private BigDecimal precio;

    @NotNull(message = "El stock es requerido")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Schema(description = "Stock disponible", example = "100")
    private Integer stock;

    @NotBlank(message = "La categoría es requerida")
    @Schema(description = "Categoría del producto", example = "Electrónicos")
    private String categoria;

    @Schema(description = "URL de la imagen del producto", example = "https://ejemplo.com/imagen.jpg")
    private String imagen;
} 