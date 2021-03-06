package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Premium;
import io.github.jhipster.application.repository.PremiumRepository;
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
 * REST controller for managing Premium.
 */
@RestController
@RequestMapping("/api")
public class PremiumResource {

    private final Logger log = LoggerFactory.getLogger(PremiumResource.class);

    private static final String ENTITY_NAME = "premium";

    private PremiumRepository premiumRepository;

    public PremiumResource(PremiumRepository premiumRepository) {
        this.premiumRepository = premiumRepository;
    }

    /**
     * POST  /premiums : Create a new premium.
     *
     * @param premium the premium to create
     * @return the ResponseEntity with status 201 (Created) and with body the new premium, or with status 400 (Bad Request) if the premium has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/premiums")
    @Timed
    public ResponseEntity<Premium> createPremium(@RequestBody Premium premium) throws URISyntaxException {
        log.debug("REST request to save Premium : {}", premium);
        if (premium.getId() != null) {
            throw new BadRequestAlertException("A new premium cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Premium result = premiumRepository.save(premium);
        return ResponseEntity.created(new URI("/api/premiums/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /premiums : Updates an existing premium.
     *
     * @param premium the premium to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated premium,
     * or with status 400 (Bad Request) if the premium is not valid,
     * or with status 500 (Internal Server Error) if the premium couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/premiums")
    @Timed
    public ResponseEntity<Premium> updatePremium(@RequestBody Premium premium) throws URISyntaxException {
        log.debug("REST request to update Premium : {}", premium);
        if (premium.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Premium result = premiumRepository.save(premium);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, premium.getId().toString()))
            .body(result);
    }

    /**
     * GET  /premiums : get all the premiums.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of premiums in body
     */
    @GetMapping("/premiums")
    @Timed
    public List<Premium> getAllPremiums() {
        log.debug("REST request to get all Premiums");
        return premiumRepository.findAll();
    }

    /**
     * GET  /premiums/:id : get the "id" premium.
     *
     * @param id the id of the premium to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the premium, or with status 404 (Not Found)
     */
    @GetMapping("/premiums/{id}")
    @Timed
    public ResponseEntity<Premium> getPremium(@PathVariable Long id) {
        log.debug("REST request to get Premium : {}", id);
        Optional<Premium> premium = premiumRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(premium);
    }

    /**
     * DELETE  /premiums/:id : delete the "id" premium.
     *
     * @param id the id of the premium to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/premiums/{id}")
    @Timed
    public ResponseEntity<Void> deletePremium(@PathVariable Long id) {
        log.debug("REST request to delete Premium : {}", id);

        premiumRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
