package com.ecomerce.productos.service;

import com.ecomerce.productos.controller.dto.ProductoRequestDTO;
import com.ecomerce.productos.controller.dto.ProductoResponseDTO;
import com.ecomerce.productos.exception.ProductoException;
import com.ecomerce.productos.model.Producto;
import com.ecomerce.productos.repository.ProductoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Transactional
    public ProductoResponseDTO crearProducto(ProductoRequestDTO request) {
        log.info("Creando nuevo producto: {}", request.getNombre());
        
        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setCategoria(request.getCategoria());
        producto.setImagen(request.getImagen());

        producto = productoRepository.save(producto);
        return convertirADTO(producto);
    }

    @Transactional(readOnly = true)
    public ProductoResponseDTO obtenerProducto(Long id) {
        log.info("Buscando producto con ID: {}", id);
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoException("Producto no encontrado"));
        return convertirADTO(producto);
    }

    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> listarProductos() {
        log.info("Listando todos los productos activos");
        return productoRepository.findByActivoTrue().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> buscarPorCategoria(String categoria) {
        log.info("Buscando productos por categoría: {}", categoria);
        return productoRepository.findByCategoria(categoria).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductoResponseDTO> buscarPorNombre(String nombre) {
        log.info("Buscando productos por nombre: {}", nombre);
        return productoRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductoResponseDTO actualizarProducto(Long id, ProductoRequestDTO request) {
        log.info("Actualizando producto con ID: {}", id);
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoException("Producto no encontrado"));

        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        producto.setCategoria(request.getCategoria());
        producto.setImagen(request.getImagen());

        producto = productoRepository.save(producto);
        return convertirADTO(producto);
    }

    @Transactional
    public void eliminarProducto(Long id) {
        log.info("Eliminando producto con ID: {}", id);
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ProductoException("Producto no encontrado"));
        producto.setActivo(false);
        productoRepository.save(producto);
    }

    private ProductoResponseDTO convertirADTO(Producto producto) {
        ProductoResponseDTO dto = new ProductoResponseDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        dto.setCategoria(producto.getCategoria());
        dto.setImagen(producto.getImagen());
        dto.setFechaCreacion(producto.getFechaCreacion());
        dto.setActivo(producto.isActivo());
        return dto;
    }
} 