package com.ecomerce.pedidos.client;

import com.ecomerce.pedidos.client.dto.ProductoDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "productos", url = "${service.productos.url}")
public interface ProductoClient {
    
    @GetMapping("/v1/productos/{id}")
    ProductoDTO obtenerProducto(@PathVariable("id") Long id);
} 