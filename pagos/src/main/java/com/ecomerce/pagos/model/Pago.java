package com.ecomerce.pagos.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pedidoId;

    @Column(nullable = false)
    private Long usuarioId;

    @Column(nullable = false)
    private BigDecimal monto;

    @Column(nullable = false)
    private String metodoPago;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoPago estado;

    @Column(nullable = false)
    private String referenciaPago;

    @Column(nullable = false)
    private LocalDateTime fechaPago;

    @PrePersist
    protected void onCreate() {
        fechaPago = LocalDateTime.now();
    }
}
 