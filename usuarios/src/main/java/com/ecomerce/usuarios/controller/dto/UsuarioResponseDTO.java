package com.ecomerce.usuarios.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Schema(description = "DTO para respuestas de usuario")
public class UsuarioResponseDTO {
    
    @Schema(description = "ID del usuario")
    private Long id;

    @Schema(description = "Email del usuario")
    private String email;

    @Schema(description = "Nombre del usuario")
    private String nombre;

    @Schema(description = "Apellido del usuario")
    private String apellido;

    @Schema(description = "Teléfono del usuario")
    private String telefono;

    @Schema(description = "Dirección del usuario")
    private String direccion;

    @Schema(description = "Fecha de creación del usuario")
    private LocalDateTime fechaCreacion;

    @Schema(description = "Último login del usuario")
    private LocalDateTime ultimoLogin;

    @Schema(description = "Estado del usuario")
    private boolean activo;
} 