package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Inscricao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Inscricao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {

}
