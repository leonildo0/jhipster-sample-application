package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Torneio;
import io.github.jhipster.application.repository.TorneioRepository;
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
 * REST controller for managing Torneio.
 */
@RestController
@RequestMapping("/api")
public class TorneioResource {

    private final Logger log = LoggerFactory.getLogger(TorneioResource.class);

    private static final String ENTITY_NAME = "torneio";

    private TorneioRepository torneioRepository;

    public TorneioResource(TorneioRepository torneioRepository) {
        this.torneioRepository = torneioRepository;
    }

    /**
     * POST  /torneios : Create a new torneio.
     *
     * @param torneio the torneio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new torneio, or with status 400 (Bad Request) if the torneio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/torneios")
    @Timed
    public ResponseEntity<Torneio> createTorneio(@RequestBody Torneio torneio) throws URISyntaxException {
        log.debug("REST request to save Torneio : {}", torneio);
        if (torneio.getId() != null) {
            throw new BadRequestAlertException("A new torneio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Torneio result = torneioRepository.save(torneio);
        return ResponseEntity.created(new URI("/api/torneios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /torneios : Updates an existing torneio.
     *
     * @param torneio the torneio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated torneio,
     * or with status 400 (Bad Request) if the torneio is not valid,
     * or with status 500 (Internal Server Error) if the torneio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/torneios")
    @Timed
    public ResponseEntity<Torneio> updateTorneio(@RequestBody Torneio torneio) throws URISyntaxException {
        log.debug("REST request to update Torneio : {}", torneio);
        if (torneio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Torneio result = torneioRepository.save(torneio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, torneio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /torneios : get all the torneios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of torneios in body
     */
    @GetMapping("/torneios")
    @Timed
    public List<Torneio> getAllTorneios() {
        log.debug("REST request to get all Torneios");
        return torneioRepository.findAll();
    }

    /**
     * GET  /torneios/:id : get the "id" torneio.
     *
     * @param id the id of the torneio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the torneio, or with status 404 (Not Found)
     */
    @GetMapping("/torneios/{id}")
    @Timed
    public ResponseEntity<Torneio> getTorneio(@PathVariable Long id) {
        log.debug("REST request to get Torneio : {}", id);
        Optional<Torneio> torneio = torneioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(torneio);
    }

    /**
     * DELETE  /torneios/:id : delete the "id" torneio.
     *
     * @param id the id of the torneio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/torneios/{id}")
    @Timed
    public ResponseEntity<Void> deleteTorneio(@PathVariable Long id) {
        log.debug("REST request to delete Torneio : {}", id);

        torneioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
