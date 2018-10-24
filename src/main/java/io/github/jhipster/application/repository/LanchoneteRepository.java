package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Lanchonete;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lanchonete entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LanchoneteRepository extends JpaRepository<Lanchonete, Long> {

}
