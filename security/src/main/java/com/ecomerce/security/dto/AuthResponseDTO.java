package com.ecomerce.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {
    private String token;
    private String tokenType = "Bearer";
    private Long expiresIn;
    
    // Agregar información del usuario para que funcione con el frontend
    private Long userId;
    private String nombre;
    private String email;
} 