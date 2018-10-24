package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Computador;
import io.github.jhipster.application.repository.ComputadorRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ComputadorResource REST controller.
 *
 * @see ComputadorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ComputadorResourceIntTest {

    private static final String DEFAULT_JOGOS = "AAAAAAAAAA";
    private static final String UPDATED_JOGOS = "BBBBBBBBBB";

    private static final String DEFAULT_PROGRAMAS = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAMAS = "BBBBBBBBBB";

    private static final Long DEFAULT_PRECO = 1L;
    private static final Long UPDATED_PRECO = 2L;

    @Autowired
    private ComputadorRepository computadorRepository;

    @Mock
    private ComputadorRepository computadorRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restComputadorMockMvc;

    private Computador computador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComputadorResource computadorResource = new ComputadorResource(computadorRepository);
        this.restComputadorMockMvc = MockMvcBuilders.standaloneSetup(computadorResource)
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
    public static Computador createEntity(EntityManager em) {
        Computador computador = new Computador()
            .jogos(DEFAULT_JOGOS)
            .programas(DEFAULT_PROGRAMAS)
            .preco(DEFAULT_PRECO);
        return computador;
    }

    @Before
    public void initTest() {
        computador = createEntity(em);
    }

    @Test
    @Transactional
    public void createComputador() throws Exception {
        int databaseSizeBeforeCreate = computadorRepository.findAll().size();

        // Create the Computador
        restComputadorMockMvc.perform(post("/api/computadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(computador)))
            .andExpect(status().isCreated());

        // Validate the Computador in the database
        List<Computador> computadorList = computadorRepository.findAll();
        assertThat(computadorList).hasSize(databaseSizeBeforeCreate + 1);
        Computador testComputador = computadorList.get(computadorList.size() - 1);
        assertThat(testComputador.getJogos()).isEqualTo(DEFAULT_JOGOS);
        assertThat(testComputador.getProgramas()).isEqualTo(DEFAULT_PROGRAMAS);
        assertThat(testComputador.getPreco()).isEqualTo(DEFAULT_PRECO);
    }

    @Test
    @Transactional
    public void createComputadorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = computadorRepository.findAll().size();

        // Create the Computador with an existing ID
        computador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComputadorMockMvc.perform(post("/api/computadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(computador)))
            .andExpect(status().isBadRequest());

        // Validate the Computador in the database
        List<Computador> computadorList = computadorRepository.findAll();
        assertThat(computadorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllComputadors() throws Exception {
        // Initialize the database
        computadorRepository.saveAndFlush(computador);

        // Get all the computadorList
        restComputadorMockMvc.perform(get("/api/computadors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(computador.getId().intValue())))
            .andExpect(jsonPath("$.[*].jogos").value(hasItem(DEFAULT_JOGOS.toString())))
            .andExpect(jsonPath("$.[*].programas").value(hasItem(DEFAULT_PROGRAMAS.toString())))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.intValue())));
    }
    
    public void getAllComputadorsWithEagerRelationshipsIsEnabled() throws Exception {
        ComputadorResource computadorResource = new ComputadorResource(computadorRepositoryMock);
        when(computadorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restComputadorMockMvc = MockMvcBuilders.standaloneSetup(computadorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restComputadorMockMvc.perform(get("/api/computadors?eagerload=true"))
        .andExpect(status().isOk());

        verify(computadorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllComputadorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ComputadorResource computadorResource = new ComputadorResource(computadorRepositoryMock);
            when(computadorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restComputadorMockMvc = MockMvcBuilders.standaloneSetup(computadorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restComputadorMockMvc.perform(get("/api/computadors?eagerload=true"))
        .andExpect(status().isOk());

            verify(computadorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getComputador() throws Exception {
        // Initialize the database
        computadorRepository.saveAndFlush(computador);

        // Get the computador
        restComputadorMockMvc.perform(get("/api/computadors/{id}", computador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(computador.getId().intValue()))
            .andExpect(jsonPath("$.jogos").value(DEFAULT_JOGOS.toString()))
            .andExpect(jsonPath("$.programas").value(DEFAULT_PROGRAMAS.toString()))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingComputador() throws Exception {
        // Get the computador
        restComputadorMockMvc.perform(get("/api/computadors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComputador() throws Exception {
        // Initialize the database
        computadorRepository.saveAndFlush(computador);

        int databaseSizeBeforeUpdate = computadorRepository.findAll().size();

        // Update the computador
        Computador updatedComputador = computadorRepository.findById(computador.getId()).get();
        // Disconnect from session so that the updates on updatedComputador are not directly saved in db
        em.detach(updatedComputador);
        updatedComputador
            .jogos(UPDATED_JOGOS)
            .programas(UPDATED_PROGRAMAS)
            .preco(UPDATED_PRECO);

        restComputadorMockMvc.perform(put("/api/computadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComputador)))
            .andExpect(status().isOk());

        // Validate the Computador in the database
        List<Computador> computadorList = computadorRepository.findAll();
        assertThat(computadorList).hasSize(databaseSizeBeforeUpdate);
        Computador testComputador = computadorList.get(computadorList.size() - 1);
        assertThat(testComputador.getJogos()).isEqualTo(UPDATED_JOGOS);
        assertThat(testComputador.getProgramas()).isEqualTo(UPDATED_PROGRAMAS);
        assertThat(testComputador.getPreco()).isEqualTo(UPDATED_PRECO);
    }

    @Test
    @Transactional
    public void updateNonExistingComputador() throws Exception {
        int databaseSizeBeforeUpdate = computadorRepository.findAll().size();

        // Create the Computador

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComputadorMockMvc.perform(put("/api/computadors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(computador)))
            .andExpect(status().isBadRequest());

        // Validate the Computador in the database
        List<Computador> computadorList = computadorRepository.findAll();
        assertThat(computadorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComputador() throws Exception {
        // Initialize the database
        computadorRepository.saveAndFlush(computador);

        int databaseSizeBeforeDelete = computadorRepository.findAll().size();

        // Get the computador
        restComputadorMockMvc.perform(delete("/api/computadors/{id}", computador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Computador> computadorList = computadorRepository.findAll();
        assertThat(computadorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Computador.class);
        Computador computador1 = new Computador();
        computador1.setId(1L);
        Computador computador2 = new Computador();
        computador2.setId(computador1.getId());
        assertThat(computador1).isEqualTo(computador2);
        computador2.setId(2L);
        assertThat(computador1).isNotEqualTo(computador2);
        computador1.setId(null);
        assertThat(computador1).isNotEqualTo(computador2);
    }
}
