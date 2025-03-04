package com.ecomerce.pagos.service;

import com.ecomerce.pagos.dto.PagoRequestDTO;
import com.ecomerce.pagos.dto.PagoResponseDTO;
import com.ecomerce.pagos.model.EstadoPago;
import com.ecomerce.pagos.model.Pago;
import com.ecomerce.pagos.repository.PagoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PagoService {

    private final PagoRepository pagoRepository;

    @Transactional
    public PagoResponseDTO procesarPago(PagoRequestDTO request) {
        Pago pago = new Pago();
        pago.setPedidoId(request.getPedidoId());
        pago.setUsuarioId(request.getUsuarioId());
        pago.setMonto(request.getMonto());
        pago.setMetodoPago(request.getMetodoPago());
        pago.setEstado(EstadoPago.PROCESANDO);
        pago.setReferenciaPago(generarReferenciaPago());

        try {
            // Aquí iría la lógica de integración con un gateway de pago real
            // Por ahora, simulamos un pago exitoso
            pago.setEstado(EstadoPago.COMPLETADO);
            pago = pagoRepository.save(pago);
            return convertirADTO(pago);
        } catch (Exception e) {
            pago.setEstado(EstadoPago.FALLIDO);
            pago = pagoRepository.save(pago);
            throw new RuntimeException("Error al procesar el pago: " + e.getMessage());
        }
    }

    public List<PagoResponseDTO> obtenerPagosPorUsuario(Long usuarioId) {
        return pagoRepository.findByUsuarioId(usuarioId).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<PagoResponseDTO> obtenerPagosPorPedido(Long pedidoId) {
        return pagoRepository.findByPedidoId(pedidoId).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    private PagoResponseDTO convertirADTO(Pago pago) {
        PagoResponseDTO dto = new PagoResponseDTO();
        dto.setId(pago.getId());
        dto.setPedidoId(pago.getPedidoId());
        dto.setUsuarioId(pago.getUsuarioId());
        dto.setMonto(pago.getMonto());
        dto.setMetodoPago(pago.getMetodoPago());
        dto.setEstado(pago.getEstado());
        dto.setReferenciaPago(pago.getReferenciaPago());
        dto.setFechaPago(pago.getFechaPago());
        return dto;
    }

    private String generarReferenciaPago() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 16).toUpperCase();
    }
} 