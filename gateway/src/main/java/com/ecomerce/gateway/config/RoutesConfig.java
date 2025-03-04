package com.ecomerce.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoutesConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("usuarios", r -> r
                .path("/v1/usuarios/**")
                .uri("http://usuarios:8081"))
            .route("productos", r -> r
                .path("/v1/productos/**")
                .uri("http://productos:8082"))
            .route("pedidos", r -> r
                .path("/v1/pedidos/**")
                .uri("http://pedidos:8083"))
            .route("pagos", r -> r
                .path("/v1/pagos/**")
                .uri("http://pagos:8084"))
            .route("auth", r -> r
                .path("/v1/auth/**")
                .uri("http://security:9000"))
            .build();
    }
} 