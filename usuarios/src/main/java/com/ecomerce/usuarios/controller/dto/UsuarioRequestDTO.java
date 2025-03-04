package com.ecomerce.usuarios.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
@Schema(description = "DTO para crear o actualizar un usuario")
public class UsuarioRequestDTO {
    
    @NotBlank(message = "El email es requerido")
    @Email(message = "El formato del email no es válido")
    @Schema(description = "Email del usuario", example = "usuario@ejemplo.com")
    private String email;

    @NotBlank(message = "La contraseña es requerida")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    @Schema(description = "Contraseña del usuario", example = "password123")
    private String password;

    @NotBlank(message = "El nombre es requerido")
    @Schema(description = "Nombre del usuario", example = "Juan")
    private String nombre;

    @NotBlank(message = "El apellido es requerido")
    @Schema(description = "Apellido del usuario", example = "Pérez")
    private String apellido;

    @Pattern(regexp = "^[0-9]{10}$", message = "El teléfono debe tener 10 dígitos")
    @Schema(description = "Teléfono del usuario", example = "0987654321")
    private String telefono;

    @NotBlank(message = "La dirección es requerida")
    @Schema(description = "Dirección del usuario", example = "Av. Principal 123")
    private String direccion;
} 