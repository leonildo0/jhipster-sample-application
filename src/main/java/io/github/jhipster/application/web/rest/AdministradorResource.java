package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Administrador;
import io.github.jhipster.application.repository.AdministradorRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Administrador.
 */
@RestController
@RequestMapping("/api")
public class AdministradorResource {

    private final Logger log = LoggerFactory.getLogger(AdministradorResource.class);

    private static final String ENTITY_NAME = "administrador";

    private AdministradorRepository administradorRepository;

    public AdministradorResource(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    /**
     * POST  /administradors : Create a new administrador.
     *
     * @param administrador the administrador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new administrador, or with status 400 (Bad Request) if the administrador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/administradors")
    @Timed
    public ResponseEntity<Administrador> createAdministrador(@RequestBody Administrador administrador) throws URISyntaxException {
        log.debug("REST request to save Administrador : {}", administrador);
        if (administrador.getId() != null) {
            throw new BadRequestAlertException("A new administrador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Administrador result = administradorRepository.save(administrador);
        return ResponseEntity.created(new URI("/api/administradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /administradors : Updates an existing administrador.
     *
     * @param administrador the administrador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated administrador,
     * or with status 400 (Bad Request) if the administrador is not valid,
     * or with status 500 (Internal Server Error) if the administrador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/administradors")
    @Timed
    public ResponseEntity<Administrador> updateAdministrador(@RequestBody Administrador administrador) throws URISyntaxException {
        log.debug("REST request to update Administrador : {}", administrador);
        if (administrador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Administrador result = administradorRepository.save(administrador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, administrador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /administradors : get all the administradors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of administradors in body
     */
    @GetMapping("/administradors")
    @Timed
    public List<Administrador> getAllAdministradors() {
        log.debug("REST request to get all Administradors");
        return administradorRepository.findAll();
    }

    /**
     * GET  /administradors/:id : get the "id" administrador.
     *
     * @param id the id of the administrador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the administrador, or with status 404 (Not Found)
     */
    @GetMapping("/administradors/{id}")
    @Timed
    public ResponseEntity<Administrador> getAdministrador(@PathVariable Long id) {
        log.debug("REST request to get Administrador : {}", id);
        Optional<Administrador> administrador = administradorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(administrador);
    }

    /**
     * DELETE  /administradors/:id : delete the "id" administrador.
     *
     * @param id the id of the administrador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/administradors/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdministrador(@PathVariable Long id) {
        log.debug("REST request to delete Administrador : {}", id);

        administradorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
