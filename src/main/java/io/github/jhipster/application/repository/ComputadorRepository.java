package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Computador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Computador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComputadorRepository extends JpaRepository<Computador, Long> {

    @Query(value = "select distinct computador from Computador computador left join fetch computador.sessaos",
        countQuery = "select count(distinct computador) from Computador computador")
    Page<Computador> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct computador from Computador computador left join fetch computador.sessaos")
    List<Computador> findAllWithEagerRelationships();

    @Query("select computador from Computador computador left join fetch computador.sessaos where computador.id =:id")
    Optional<Computador> findOneWithEagerRelationships(@Param("id") Long id);

}
