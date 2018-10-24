package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Lanchonete;
import io.github.jhipster.application.repository.LanchoneteRepository;
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
 * REST controller for managing Lanchonete.
 */
@RestController
@RequestMapping("/api")
public class LanchoneteResource {

    private final Logger log = LoggerFactory.getLogger(LanchoneteResource.class);

    private static final String ENTITY_NAME = "lanchonete";

    private LanchoneteRepository lanchoneteRepository;

    public LanchoneteResource(LanchoneteRepository lanchoneteRepository) {
        this.lanchoneteRepository = lanchoneteRepository;
    }

    /**
     * POST  /lanchonetes : Create a new lanchonete.
     *
     * @param lanchonete the lanchonete to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lanchonete, or with status 400 (Bad Request) if the lanchonete has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lanchonetes")
    @Timed
    public ResponseEntity<Lanchonete> createLanchonete(@RequestBody Lanchonete lanchonete) throws URISyntaxException {
        log.debug("REST request to save Lanchonete : {}", lanchonete);
        if (lanchonete.getId() != null) {
            throw new BadRequestAlertException("A new lanchonete cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lanchonete result = lanchoneteRepository.save(lanchonete);
        return ResponseEntity.created(new URI("/api/lanchonetes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lanchonetes : Updates an existing lanchonete.
     *
     * @param lanchonete the lanchonete to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lanchonete,
     * or with status 400 (Bad Request) if the lanchonete is not valid,
     * or with status 500 (Internal Server Error) if the lanchonete couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lanchonetes")
    @Timed
    public ResponseEntity<Lanchonete> updateLanchonete(@RequestBody Lanchonete lanchonete) throws URISyntaxException {
        log.debug("REST request to update Lanchonete : {}", lanchonete);
        if (lanchonete.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lanchonete result = lanchoneteRepository.save(lanchonete);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lanchonete.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lanchonetes : get all the lanchonetes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lanchonetes in body
     */
    @GetMapping("/lanchonetes")
    @Timed
    public List<Lanchonete> getAllLanchonetes() {
        log.debug("REST request to get all Lanchonetes");
        return lanchoneteRepository.findAll();
    }

    /**
     * GET  /lanchonetes/:id : get the "id" lanchonete.
     *
     * @param id the id of the lanchonete to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lanchonete, or with status 404 (Not Found)
     */
    @GetMapping("/lanchonetes/{id}")
    @Timed
    public ResponseEntity<Lanchonete> getLanchonete(@PathVariable Long id) {
        log.debug("REST request to get Lanchonete : {}", id);
        Optional<Lanchonete> lanchonete = lanchoneteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lanchonete);
    }

    /**
     * DELETE  /lanchonetes/:id : delete the "id" lanchonete.
     *
     * @param id the id of the lanchonete to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lanchonetes/{id}")
    @Timed
    public ResponseEntity<Void> deleteLanchonete(@PathVariable Long id) {
        log.debug("REST request to delete Lanchonete : {}", id);

        lanchoneteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
