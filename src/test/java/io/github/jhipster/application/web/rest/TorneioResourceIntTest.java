package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Torneio;
import io.github.jhipster.application.repository.TorneioRepository;
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
 * Test class for the TorneioResource REST controller.
 *
 * @see TorneioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TorneioResourceIntTest {

    private static final String DEFAULT_JOGO = "AAAAAAAAAA";
    private static final String UPDATED_JOGO = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIA = "BBBBBBBBBB";

    private static final String DEFAULT_PREMIACAO = "AAAAAAAAAA";
    private static final String UPDATED_PREMIACAO = "BBBBBBBBBB";

    @Autowired
    private TorneioRepository torneioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTorneioMockMvc;

    private Torneio torneio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TorneioResource torneioResource = new TorneioResource(torneioRepository);
        this.restTorneioMockMvc = MockMvcBuilders.standaloneSetup(torneioResource)
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
    public static Torneio createEntity(EntityManager em) {
        Torneio torneio = new Torneio()
            .jogo(DEFAULT_JOGO)
            .categoria(DEFAULT_CATEGORIA)
            .premiacao(DEFAULT_PREMIACAO);
        return torneio;
    }

    @Before
    public void initTest() {
        torneio = createEntity(em);
    }

    @Test
    @Transactional
    public void createTorneio() throws Exception {
        int databaseSizeBeforeCreate = torneioRepository.findAll().size();

        // Create the Torneio
        restTorneioMockMvc.perform(post("/api/torneios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(torneio)))
            .andExpect(status().isCreated());

        // Validate the Torneio in the database
        List<Torneio> torneioList = torneioRepository.findAll();
        assertThat(torneioList).hasSize(databaseSizeBeforeCreate + 1);
        Torneio testTorneio = torneioList.get(torneioList.size() - 1);
        assertThat(testTorneio.getJogo()).isEqualTo(DEFAULT_JOGO);
        assertThat(testTorneio.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
        assertThat(testTorneio.getPremiacao()).isEqualTo(DEFAULT_PREMIACAO);
    }

    @Test
    @Transactional
    public void createTorneioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = torneioRepository.findAll().size();

        // Create the Torneio with an existing ID
        torneio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTorneioMockMvc.perform(post("/api/torneios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(torneio)))
            .andExpect(status().isBadRequest());

        // Validate the Torneio in the database
        List<Torneio> torneioList = torneioRepository.findAll();
        assertThat(torneioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTorneios() throws Exception {
        // Initialize the database
        torneioRepository.saveAndFlush(torneio);

        // Get all the torneioList
        restTorneioMockMvc.perform(get("/api/torneios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(torneio.getId().intValue())))
            .andExpect(jsonPath("$.[*].jogo").value(hasItem(DEFAULT_JOGO.toString())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA.toString())))
            .andExpect(jsonPath("$.[*].premiacao").value(hasItem(DEFAULT_PREMIACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getTorneio() throws Exception {
        // Initialize the database
        torneioRepository.saveAndFlush(torneio);

        // Get the torneio
        restTorneioMockMvc.perform(get("/api/torneios/{id}", torneio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(torneio.getId().intValue()))
            .andExpect(jsonPath("$.jogo").value(DEFAULT_JOGO.toString()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA.toString()))
            .andExpect(jsonPath("$.premiacao").value(DEFAULT_PREMIACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTorneio() throws Exception {
        // Get the torneio
        restTorneioMockMvc.perform(get("/api/torneios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTorneio() throws Exception {
        // Initialize the database
        torneioRepository.saveAndFlush(torneio);

        int databaseSizeBeforeUpdate = torneioRepository.findAll().size();

        // Update the torneio
        Torneio updatedTorneio = torneioRepository.findById(torneio.getId()).get();
        // Disconnect from session so that the updates on updatedTorneio are not directly saved in db
        em.detach(updatedTorneio);
        updatedTorneio
            .jogo(UPDATED_JOGO)
            .categoria(UPDATED_CATEGORIA)
            .premiacao(UPDATED_PREMIACAO);

        restTorneioMockMvc.perform(put("/api/torneios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTorneio)))
            .andExpect(status().isOk());

        // Validate the Torneio in the database
        List<Torneio> torneioList = torneioRepository.findAll();
        assertThat(torneioList).hasSize(databaseSizeBeforeUpdate);
        Torneio testTorneio = torneioList.get(torneioList.size() - 1);
        assertThat(testTorneio.getJogo()).isEqualTo(UPDATED_JOGO);
        assertThat(testTorneio.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testTorneio.getPremiacao()).isEqualTo(UPDATED_PREMIACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingTorneio() throws Exception {
        int databaseSizeBeforeUpdate = torneioRepository.findAll().size();

        // Create the Torneio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTorneioMockMvc.perform(put("/api/torneios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(torneio)))
            .andExpect(status().isBadRequest());

        // Validate the Torneio in the database
        List<Torneio> torneioList = torneioRepository.findAll();
        assertThat(torneioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTorneio() throws Exception {
        // Initialize the database
        torneioRepository.saveAndFlush(torneio);

        int databaseSizeBeforeDelete = torneioRepository.findAll().size();

        // Get the torneio
        restTorneioMockMvc.perform(delete("/api/torneios/{id}", torneio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Torneio> torneioList = torneioRepository.findAll();
        assertThat(torneioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Torneio.class);
        Torneio torneio1 = new Torneio();
        torneio1.setId(1L);
        Torneio torneio2 = new Torneio();
        torneio2.setId(torneio1.getId());
        assertThat(torneio1).isEqualTo(torneio2);
        torneio2.setId(2L);
        assertThat(torneio1).isNotEqualTo(torneio2);
        torneio1.setId(null);
        assertThat(torneio1).isNotEqualTo(torneio2);
    }
}
