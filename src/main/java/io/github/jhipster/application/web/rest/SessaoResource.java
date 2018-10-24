package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Sessao;
import io.github.jhipster.application.repository.SessaoRepository;
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
 * REST controller for managing Sessao.
 */
@RestController
@RequestMapping("/api")
public class SessaoResource {

    private final Logger log = LoggerFactory.getLogger(SessaoResource.class);

    private static final String ENTITY_NAME = "sessao";

    private SessaoRepository sessaoRepository;

    public SessaoResource(SessaoRepository sessaoRepository) {
        this.sessaoRepository = sessaoRepository;
    }

    /**
     * POST  /sessaos : Create a new sessao.
     *
     * @param sessao the sessao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sessao, or with status 400 (Bad Request) if the sessao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sessaos")
    @Timed
    public ResponseEntity<Sessao> createSessao(@RequestBody Sessao sessao) throws URISyntaxException {
        log.debug("REST request to save Sessao : {}", sessao);
        if (sessao.getId() != null) {
            throw new BadRequestAlertException("A new sessao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sessao result = sessaoRepository.save(sessao);
        return ResponseEntity.created(new URI("/api/sessaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sessaos : Updates an existing sessao.
     *
     * @param sessao the sessao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sessao,
     * or with status 400 (Bad Request) if the sessao is not valid,
     * or with status 500 (Internal Server Error) if the sessao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sessaos")
    @Timed
    public ResponseEntity<Sessao> updateSessao(@RequestBody Sessao sessao) throws URISyntaxException {
        log.debug("REST request to update Sessao : {}", sessao);
        if (sessao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sessao result = sessaoRepository.save(sessao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sessao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sessaos : get all the sessaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sessaos in body
     */
    @GetMapping("/sessaos")
    @Timed
    public List<Sessao> getAllSessaos() {
        log.debug("REST request to get all Sessaos");
        return sessaoRepository.findAll();
    }

    /**
     * GET  /sessaos/:id : get the "id" sessao.
     *
     * @param id the id of the sessao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sessao, or with status 404 (Not Found)
     */
    @GetMapping("/sessaos/{id}")
    @Timed
    public ResponseEntity<Sessao> getSessao(@PathVariable Long id) {
        log.debug("REST request to get Sessao : {}", id);
        Optional<Sessao> sessao = sessaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sessao);
    }

    /**
     * DELETE  /sessaos/:id : delete the "id" sessao.
     *
     * @param id the id of the sessao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sessaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteSessao(@PathVariable Long id) {
        log.debug("REST request to delete Sessao : {}", id);

        sessaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
