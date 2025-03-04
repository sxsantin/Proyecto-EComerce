package com.ecomerce.pedidos.client;

import com.ecomerce.pedidos.client.dto.UsuarioDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "usuarios", url = "${service.usuarios.url}")
public interface UsuarioClient {
    
    @GetMapping("/v1/usuarios/{id}")
    UsuarioDTO obtenerUsuario(@PathVariable("id") Long id);
} 