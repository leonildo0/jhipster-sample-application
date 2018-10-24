package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Lanchonete;
import io.github.jhipster.application.repository.LanchoneteRepository;
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
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LanchoneteResource REST controller.
 *
 * @see LanchoneteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class LanchoneteResourceIntTest {

    private static final String DEFAULT_BEBIDAS = "AAAAAAAAAA";
    private static final String UPDATED_BEBIDAS = "BBBBBBBBBB";

    private static final String DEFAULT_LANCHES = "AAAAAAAAAA";
    private static final String UPDATED_LANCHES = "BBBBBBBBBB";

    private static final String DEFAULT_COMBOS = "AAAAAAAAAA";
    private static final String UPDATED_COMBOS = "BBBBBBBBBB";

    private static final Long DEFAULT_PRECOS = 1L;
    private static final Long UPDATED_PRECOS = 2L;

    @Autowired
    private LanchoneteRepository lanchoneteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLanchoneteMockMvc;

    private Lanchonete lanchonete;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LanchoneteResource lanchoneteResource = new LanchoneteResource(lanchoneteRepository);
        this.restLanchoneteMockMvc = MockMvcBuilders.standaloneSetup(lanchoneteResource)
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
    public static Lanchonete createEntity(EntityManager em) {
        Lanchonete lanchonete = new Lanchonete()
            .bebidas(DEFAULT_BEBIDAS)
            .lanches(DEFAULT_LANCHES)
            .combos(DEFAULT_COMBOS)
            .precos(DEFAULT_PRECOS);
        return lanchonete;
    }

    @Before
    public void initTest() {
        lanchonete = createEntity(em);
    }

    @Test
    @Transactional
    public void createLanchonete() throws Exception {
        int databaseSizeBeforeCreate = lanchoneteRepository.findAll().size();

        // Create the Lanchonete
        restLanchoneteMockMvc.perform(post("/api/lanchonetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lanchonete)))
            .andExpect(status().isCreated());

        // Validate the Lanchonete in the database
        List<Lanchonete> lanchoneteList = lanchoneteRepository.findAll();
        assertThat(lanchoneteList).hasSize(databaseSizeBeforeCreate + 1);
        Lanchonete testLanchonete = lanchoneteList.get(lanchoneteList.size() - 1);
        assertThat(testLanchonete.getBebidas()).isEqualTo(DEFAULT_BEBIDAS);
        assertThat(testLanchonete.getLanches()).isEqualTo(DEFAULT_LANCHES);
        assertThat(testLanchonete.getCombos()).isEqualTo(DEFAULT_COMBOS);
        assertThat(testLanchonete.getPrecos()).isEqualTo(DEFAULT_PRECOS);
    }

    @Test
    @Transactional
    public void createLanchoneteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lanchoneteRepository.findAll().size();

        // Create the Lanchonete with an existing ID
        lanchonete.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLanchoneteMockMvc.perform(post("/api/lanchonetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lanchonete)))
            .andExpect(status().isBadRequest());

        // Validate the Lanchonete in the database
        List<Lanchonete> lanchoneteList = lanchoneteRepository.findAll();
        assertThat(lanchoneteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLanchonetes() throws Exception {
        // Initialize the database
        lanchoneteRepository.saveAndFlush(lanchonete);

        // Get all the lanchoneteList
        restLanchoneteMockMvc.perform(get("/api/lanchonetes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lanchonete.getId().intValue())))
            .andExpect(jsonPath("$.[*].bebidas").value(hasItem(DEFAULT_BEBIDAS.toString())))
            .andExpect(jsonPath("$.[*].lanches").value(hasItem(DEFAULT_LANCHES.toString())))
            .andExpect(jsonPath("$.[*].combos").value(hasItem(DEFAULT_COMBOS.toString())))
            .andExpect(jsonPath("$.[*].precos").value(hasItem(DEFAULT_PRECOS.intValue())));
    }
    
    @Test
    @Transactional
    public void getLanchonete() throws Exception {
        // Initialize the database
        lanchoneteRepository.saveAndFlush(lanchonete);

        // Get the lanchonete
        restLanchoneteMockMvc.perform(get("/api/lanchonetes/{id}", lanchonete.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lanchonete.getId().intValue()))
            .andExpect(jsonPath("$.bebidas").value(DEFAULT_BEBIDAS.toString()))
            .andExpect(jsonPath("$.lanches").value(DEFAULT_LANCHES.toString()))
            .andExpect(jsonPath("$.combos").value(DEFAULT_COMBOS.toString()))
            .andExpect(jsonPath("$.precos").value(DEFAULT_PRECOS.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLanchonete() throws Exception {
        // Get the lanchonete
        restLanchoneteMockMvc.perform(get("/api/lanchonetes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLanchonete() throws Exception {
        // Initialize the database
        lanchoneteRepository.saveAndFlush(lanchonete);

        int databaseSizeBeforeUpdate = lanchoneteRepository.findAll().size();

        // Update the lanchonete
        Lanchonete updatedLanchonete = lanchoneteRepository.findById(lanchonete.getId()).get();
        // Disconnect from session so that the updates on updatedLanchonete are not directly saved in db
        em.detach(updatedLanchonete);
        updatedLanchonete
            .bebidas(UPDATED_BEBIDAS)
            .lanches(UPDATED_LANCHES)
            .combos(UPDATED_COMBOS)
            .precos(UPDATED_PRECOS);

        restLanchoneteMockMvc.perform(put("/api/lanchonetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLanchonete)))
            .andExpect(status().isOk());

        // Validate the Lanchonete in the database
        List<Lanchonete> lanchoneteList = lanchoneteRepository.findAll();
        assertThat(lanchoneteList).hasSize(databaseSizeBeforeUpdate);
        Lanchonete testLanchonete = lanchoneteList.get(lanchoneteList.size() - 1);
        assertThat(testLanchonete.getBebidas()).isEqualTo(UPDATED_BEBIDAS);
        assertThat(testLanchonete.getLanches()).isEqualTo(UPDATED_LANCHES);
        assertThat(testLanchonete.getCombos()).isEqualTo(UPDATED_COMBOS);
        assertThat(testLanchonete.getPrecos()).isEqualTo(UPDATED_PRECOS);
    }

    @Test
    @Transactional
    public void updateNonExistingLanchonete() throws Exception {
        int databaseSizeBeforeUpdate = lanchoneteRepository.findAll().size();

        // Create the Lanchonete

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLanchoneteMockMvc.perform(put("/api/lanchonetes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lanchonete)))
            .andExpect(status().isBadRequest());

        // Validate the Lanchonete in the database
        List<Lanchonete> lanchoneteList = lanchoneteRepository.findAll();
        assertThat(lanchoneteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLanchonete() throws Exception {
        // Initialize the database
        lanchoneteRepository.saveAndFlush(lanchonete);

        int databaseSizeBeforeDelete = lanchoneteRepository.findAll().size();

        // Get the lanchonete
        restLanchoneteMockMvc.perform(delete("/api/lanchonetes/{id}", lanchonete.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lanchonete> lanchoneteList = lanchoneteRepository.findAll();
        assertThat(lanchoneteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lanchonete.class);
        Lanchonete lanchonete1 = new Lanchonete();
        lanchonete1.setId(1L);
        Lanchonete lanchonete2 = new Lanchonete();
        lanchonete2.setId(lanchonete1.getId());
        assertThat(lanchonete1).isEqualTo(lanchonete2);
        lanchonete2.setId(2L);
        assertThat(lanchonete1).isNotEqualTo(lanchonete2);
        lanchonete1.setId(null);
        assertThat(lanchonete1).isNotEqualTo(lanchonete2);
    }
}
