package com.ecomerce.pedidos.client.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String email;
    private String nombre;
    private String apellido;
    private String telefono;
    private String direccion;
} 