package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Console;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Console entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsoleRepository extends JpaRepository<Console, Long> {

}
