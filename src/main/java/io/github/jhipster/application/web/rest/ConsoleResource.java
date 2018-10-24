package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Console;
import io.github.jhipster.application.repository.ConsoleRepository;
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
 * REST controller for managing Console.
 */
@RestController
@RequestMapping("/api")
public class ConsoleResource {

    private final Logger log = LoggerFactory.getLogger(ConsoleResource.class);

    private static final String ENTITY_NAME = "console";

    private ConsoleRepository consoleRepository;

    public ConsoleResource(ConsoleRepository consoleRepository) {
        this.consoleRepository = consoleRepository;
    }

    /**
     * POST  /consoles : Create a new console.
     *
     * @param console the console to create
     * @return the ResponseEntity with status 201 (Created) and with body the new console, or with status 400 (Bad Request) if the console has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consoles")
    @Timed
    public ResponseEntity<Console> createConsole(@RequestBody Console console) throws URISyntaxException {
        log.debug("REST request to save Console : {}", console);
        if (console.getId() != null) {
            throw new BadRequestAlertException("A new console cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Console result = consoleRepository.save(console);
        return ResponseEntity.created(new URI("/api/consoles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consoles : Updates an existing console.
     *
     * @param console the console to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated console,
     * or with status 400 (Bad Request) if the console is not valid,
     * or with status 500 (Internal Server Error) if the console couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consoles")
    @Timed
    public ResponseEntity<Console> updateConsole(@RequestBody Console console) throws URISyntaxException {
        log.debug("REST request to update Console : {}", console);
        if (console.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Console result = consoleRepository.save(console);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, console.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consoles : get all the consoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of consoles in body
     */
    @GetMapping("/consoles")
    @Timed
    public List<Console> getAllConsoles() {
        log.debug("REST request to get all Consoles");
        return consoleRepository.findAll();
    }

    /**
     * GET  /consoles/:id : get the "id" console.
     *
     * @param id the id of the console to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the console, or with status 404 (Not Found)
     */
    @GetMapping("/consoles/{id}")
    @Timed
    public ResponseEntity<Console> getConsole(@PathVariable Long id) {
        log.debug("REST request to get Console : {}", id);
        Optional<Console> console = consoleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(console);
    }

    /**
     * DELETE  /consoles/:id : delete the "id" console.
     *
     * @param id the id of the console to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consoles/{id}")
    @Timed
    public ResponseEntity<Void> deleteConsole(@PathVariable Long id) {
        log.debug("REST request to delete Console : {}", id);

        consoleRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
