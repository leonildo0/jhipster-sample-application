package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Administrador;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Administrador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

}
