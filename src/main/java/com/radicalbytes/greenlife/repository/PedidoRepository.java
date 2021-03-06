package com.radicalbytes.greenlife.repository;

import java.util.List;

import com.radicalbytes.greenlife.domain.Pedido;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Pedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findAllByLocal_id(Long id);

	List<Pedido> findAllBySuscripcion_id(Long id);

	// List<Pedido> findAllByDiasEntrega(String dayWeek);

	List<Pedido> findAllByDiasEntrega_nombre(String dayWeek);

}
