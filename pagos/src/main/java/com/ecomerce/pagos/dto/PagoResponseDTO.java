package com.ecomerce.pagos.dto;

import com.ecomerce.pagos.model.EstadoPago;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PagoResponseDTO {
    private Long id;
    private Long pedidoId;
    private Long usuarioId;
    private BigDecimal monto;
    private String metodoPago;
    private EstadoPago estado;
    private String referenciaPago;
    private LocalDateTime fechaPago;
} 