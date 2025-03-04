package com.ecomerce.productos.controller;

import com.ecomerce.productos.controller.dto.ProductoRequestDTO;
import com.ecomerce.productos.controller.dto.ProductoResponseDTO;
import com.ecomerce.productos.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/v1/productos")
@Tag(name = "Productos", description = "API para gestión de productos")
@Slf4j
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo producto")
    public ResponseEntity<ProductoResponseDTO> crearProducto(@Valid @RequestBody ProductoRequestDTO request) {
        log.info("Recibida solicitud para crear producto");
        return new ResponseEntity<>(productoService.crearProducto(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener un producto por ID")
    public ResponseEntity<ProductoResponseDTO> obtenerProducto(@PathVariable Long id) {
        log.info("Recibida solicitud para obtener producto con ID: {}", id);
        return ResponseEntity.ok(productoService.obtenerProducto(id));
    }

    @GetMapping
    @Operation(summary = "Listar todos los productos activos")
    public ResponseEntity<List<ProductoResponseDTO>> listarProductos() {
        log.info("Recibida solicitud para listar productos");
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @GetMapping("/categoria/{categoria}")
    @Operation(summary = "Buscar productos por categoría")
    public ResponseEntity<List<ProductoResponseDTO>> buscarPorCategoria(@PathVariable String categoria) {
        log.info("Recibida solicitud para buscar productos por categoría: {}", categoria);
        return ResponseEntity.ok(productoService.buscarPorCategoria(categoria));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar productos por nombre")
    public ResponseEntity<List<ProductoResponseDTO>> buscarPorNombre(@RequestParam String nombre) {
        log.info("Recibida solicitud para buscar productos por nombre: {}", nombre);
        return ResponseEntity.ok(productoService.buscarPorNombre(nombre));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un producto")
    public ResponseEntity<ProductoResponseDTO> actualizarProducto(
            @PathVariable Long id,
            @Valid @RequestBody ProductoRequestDTO request) {
        log.info("Recibida solicitud para actualizar producto con ID: {}", id);
        return ResponseEntity.ok(productoService.actualizarProducto(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un producto")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        log.info("Recibida solicitud para eliminar producto con ID: {}", id);
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
} 