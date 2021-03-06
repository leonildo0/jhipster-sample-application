package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Torneio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Torneio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TorneioRepository extends JpaRepository<Torneio, Long> {

}
