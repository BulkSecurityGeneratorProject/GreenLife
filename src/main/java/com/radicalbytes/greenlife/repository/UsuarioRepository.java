package com.radicalbytes.greenlife.repository;

import java.util.Optional;

import com.radicalbytes.greenlife.domain.User;
import com.radicalbytes.greenlife.domain.Usuario;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Usuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUserDetail(User user);
}
