package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Premium;
import io.github.jhipster.application.repository.PremiumRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PremiumResource REST controller.
 *
 * @see PremiumResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class PremiumResourceIntTest {

    private static final LocalDate DEFAULT_D_INCIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_D_INCIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_D_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_D_FIM = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_DESCONTO = 1L;
    private static final Long UPDATED_DESCONTO = 2L;

    @Autowired
    private PremiumRepository premiumRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPremiumMockMvc;

    private Premium premium;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PremiumResource premiumResource = new PremiumResource(premiumRepository);
        this.restPremiumMockMvc = MockMvcBuilders.standaloneSetup(premiumResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Premium createEntity(EntityManager em) {
        Premium premium = new Premium()
            .dIncio(DEFAULT_D_INCIO)
            .dFim(DEFAULT_D_FIM)
            .desconto(DEFAULT_DESCONTO);
        return premium;
    }

    @Before
    public void initTest() {
        premium = createEntity(em);
    }

    @Test
    @Transactional
    public void createPremium() throws Exception {
        int databaseSizeBeforeCreate = premiumRepository.findAll().size();

        // Create the Premium
        restPremiumMockMvc.perform(post("/api/premiums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premium)))
            .andExpect(status().isCreated());

        // Validate the Premium in the database
        List<Premium> premiumList = premiumRepository.findAll();
        assertThat(premiumList).hasSize(databaseSizeBeforeCreate + 1);
        Premium testPremium = premiumList.get(premiumList.size() - 1);
        assertThat(testPremium.getdIncio()).isEqualTo(DEFAULT_D_INCIO);
        assertThat(testPremium.getdFim()).isEqualTo(DEFAULT_D_FIM);
        assertThat(testPremium.getDesconto()).isEqualTo(DEFAULT_DESCONTO);
    }

    @Test
    @Transactional
    public void createPremiumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = premiumRepository.findAll().size();

        // Create the Premium with an existing ID
        premium.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPremiumMockMvc.perform(post("/api/premiums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premium)))
            .andExpect(status().isBadRequest());

        // Validate the Premium in the database
        List<Premium> premiumList = premiumRepository.findAll();
        assertThat(premiumList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPremiums() throws Exception {
        // Initialize the database
        premiumRepository.saveAndFlush(premium);

        // Get all the premiumList
        restPremiumMockMvc.perform(get("/api/premiums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(premium.getId().intValue())))
            .andExpect(jsonPath("$.[*].dIncio").value(hasItem(DEFAULT_D_INCIO.toString())))
            .andExpect(jsonPath("$.[*].dFim").value(hasItem(DEFAULT_D_FIM.toString())))
            .andExpect(jsonPath("$.[*].desconto").value(hasItem(DEFAULT_DESCONTO.intValue())));
    }
    
    @Test
    @Transactional
    public void getPremium() throws Exception {
        // Initialize the database
        premiumRepository.saveAndFlush(premium);

        // Get the premium
        restPremiumMockMvc.perform(get("/api/premiums/{id}", premium.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(premium.getId().intValue()))
            .andExpect(jsonPath("$.dIncio").value(DEFAULT_D_INCIO.toString()))
            .andExpect(jsonPath("$.dFim").value(DEFAULT_D_FIM.toString()))
            .andExpect(jsonPath("$.desconto").value(DEFAULT_DESCONTO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPremium() throws Exception {
        // Get the premium
        restPremiumMockMvc.perform(get("/api/premiums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePremium() throws Exception {
        // Initialize the database
        premiumRepository.saveAndFlush(premium);

        int databaseSizeBeforeUpdate = premiumRepository.findAll().size();

        // Update the premium
        Premium updatedPremium = premiumRepository.findById(premium.getId()).get();
        // Disconnect from session so that the updates on updatedPremium are not directly saved in db
        em.detach(updatedPremium);
        updatedPremium
            .dIncio(UPDATED_D_INCIO)
            .dFim(UPDATED_D_FIM)
            .desconto(UPDATED_DESCONTO);

        restPremiumMockMvc.perform(put("/api/premiums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPremium)))
            .andExpect(status().isOk());

        // Validate the Premium in the database
        List<Premium> premiumList = premiumRepository.findAll();
        assertThat(premiumList).hasSize(databaseSizeBeforeUpdate);
        Premium testPremium = premiumList.get(premiumList.size() - 1);
        assertThat(testPremium.getdIncio()).isEqualTo(UPDATED_D_INCIO);
        assertThat(testPremium.getdFim()).isEqualTo(UPDATED_D_FIM);
        assertThat(testPremium.getDesconto()).isEqualTo(UPDATED_DESCONTO);
    }

    @Test
    @Transactional
    public void updateNonExistingPremium() throws Exception {
        int databaseSizeBeforeUpdate = premiumRepository.findAll().size();

        // Create the Premium

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPremiumMockMvc.perform(put("/api/premiums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(premium)))
            .andExpect(status().isBadRequest());

        // Validate the Premium in the database
        List<Premium> premiumList = premiumRepository.findAll();
        assertThat(premiumList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePremium() throws Exception {
        // Initialize the database
        premiumRepository.saveAndFlush(premium);

        int databaseSizeBeforeDelete = premiumRepository.findAll().size();

        // Get the premium
        restPremiumMockMvc.perform(delete("/api/premiums/{id}", premium.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Premium> premiumList = premiumRepository.findAll();
        assertThat(premiumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Premium.class);
        Premium premium1 = new Premium();
        premium1.setId(1L);
        Premium premium2 = new Premium();
        premium2.setId(premium1.getId());
        assertThat(premium1).isEqualTo(premium2);
        premium2.setId(2L);
        assertThat(premium1).isNotEqualTo(premium2);
        premium1.setId(null);
        assertThat(premium1).isNotEqualTo(premium2);
    }
}
