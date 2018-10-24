package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Sessao;
import io.github.jhipster.application.repository.SessaoRepository;
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
 * Test class for the SessaoResource REST controller.
 *
 * @see SessaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class SessaoResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_H_INICIO = 1D;
    private static final Double UPDATED_H_INICIO = 2D;

    @Autowired
    private SessaoRepository sessaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSessaoMockMvc;

    private Sessao sessao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SessaoResource sessaoResource = new SessaoResource(sessaoRepository);
        this.restSessaoMockMvc = MockMvcBuilders.standaloneSetup(sessaoResource)
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
    public static Sessao createEntity(EntityManager em) {
        Sessao sessao = new Sessao()
            .data(DEFAULT_DATA)
            .hInicio(DEFAULT_H_INICIO);
        return sessao;
    }

    @Before
    public void initTest() {
        sessao = createEntity(em);
    }

    @Test
    @Transactional
    public void createSessao() throws Exception {
        int databaseSizeBeforeCreate = sessaoRepository.findAll().size();

        // Create the Sessao
        restSessaoMockMvc.perform(post("/api/sessaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessao)))
            .andExpect(status().isCreated());

        // Validate the Sessao in the database
        List<Sessao> sessaoList = sessaoRepository.findAll();
        assertThat(sessaoList).hasSize(databaseSizeBeforeCreate + 1);
        Sessao testSessao = sessaoList.get(sessaoList.size() - 1);
        assertThat(testSessao.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testSessao.gethInicio()).isEqualTo(DEFAULT_H_INICIO);
    }

    @Test
    @Transactional
    public void createSessaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sessaoRepository.findAll().size();

        // Create the Sessao with an existing ID
        sessao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSessaoMockMvc.perform(post("/api/sessaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessao)))
            .andExpect(status().isBadRequest());

        // Validate the Sessao in the database
        List<Sessao> sessaoList = sessaoRepository.findAll();
        assertThat(sessaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSessaos() throws Exception {
        // Initialize the database
        sessaoRepository.saveAndFlush(sessao);

        // Get all the sessaoList
        restSessaoMockMvc.perform(get("/api/sessaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sessao.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].hInicio").value(hasItem(DEFAULT_H_INICIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getSessao() throws Exception {
        // Initialize the database
        sessaoRepository.saveAndFlush(sessao);

        // Get the sessao
        restSessaoMockMvc.perform(get("/api/sessaos/{id}", sessao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sessao.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.hInicio").value(DEFAULT_H_INICIO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSessao() throws Exception {
        // Get the sessao
        restSessaoMockMvc.perform(get("/api/sessaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSessao() throws Exception {
        // Initialize the database
        sessaoRepository.saveAndFlush(sessao);

        int databaseSizeBeforeUpdate = sessaoRepository.findAll().size();

        // Update the sessao
        Sessao updatedSessao = sessaoRepository.findById(sessao.getId()).get();
        // Disconnect from session so that the updates on updatedSessao are not directly saved in db
        em.detach(updatedSessao);
        updatedSessao
            .data(UPDATED_DATA)
            .hInicio(UPDATED_H_INICIO);

        restSessaoMockMvc.perform(put("/api/sessaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSessao)))
            .andExpect(status().isOk());

        // Validate the Sessao in the database
        List<Sessao> sessaoList = sessaoRepository.findAll();
        assertThat(sessaoList).hasSize(databaseSizeBeforeUpdate);
        Sessao testSessao = sessaoList.get(sessaoList.size() - 1);
        assertThat(testSessao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testSessao.gethInicio()).isEqualTo(UPDATED_H_INICIO);
    }

    @Test
    @Transactional
    public void updateNonExistingSessao() throws Exception {
        int databaseSizeBeforeUpdate = sessaoRepository.findAll().size();

        // Create the Sessao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSessaoMockMvc.perform(put("/api/sessaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessao)))
            .andExpect(status().isBadRequest());

        // Validate the Sessao in the database
        List<Sessao> sessaoList = sessaoRepository.findAll();
        assertThat(sessaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSessao() throws Exception {
        // Initialize the database
        sessaoRepository.saveAndFlush(sessao);

        int databaseSizeBeforeDelete = sessaoRepository.findAll().size();

        // Get the sessao
        restSessaoMockMvc.perform(delete("/api/sessaos/{id}", sessao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sessao> sessaoList = sessaoRepository.findAll();
        assertThat(sessaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sessao.class);
        Sessao sessao1 = new Sessao();
        sessao1.setId(1L);
        Sessao sessao2 = new Sessao();
        sessao2.setId(sessao1.getId());
        assertThat(sessao1).isEqualTo(sessao2);
        sessao2.setId(2L);
        assertThat(sessao1).isNotEqualTo(sessao2);
        sessao1.setId(null);
        assertThat(sessao1).isNotEqualTo(sessao2);
    }
}
