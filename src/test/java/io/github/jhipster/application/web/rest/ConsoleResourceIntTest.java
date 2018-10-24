package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Console;
import io.github.jhipster.application.repository.ConsoleRepository;
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
 * Test class for the ConsoleResource REST controller.
 *
 * @see ConsoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ConsoleResourceIntTest {

    private static final String DEFAULT_JOGOS = "AAAAAAAAAA";
    private static final String UPDATED_JOGOS = "BBBBBBBBBB";

    private static final Long DEFAULT_PRECO = 1L;
    private static final Long UPDATED_PRECO = 2L;

    @Autowired
    private ConsoleRepository consoleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConsoleMockMvc;

    private Console console;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsoleResource consoleResource = new ConsoleResource(consoleRepository);
        this.restConsoleMockMvc = MockMvcBuilders.standaloneSetup(consoleResource)
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
    public static Console createEntity(EntityManager em) {
        Console console = new Console()
            .jogos(DEFAULT_JOGOS)
            .preco(DEFAULT_PRECO);
        return console;
    }

    @Before
    public void initTest() {
        console = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsole() throws Exception {
        int databaseSizeBeforeCreate = consoleRepository.findAll().size();

        // Create the Console
        restConsoleMockMvc.perform(post("/api/consoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(console)))
            .andExpect(status().isCreated());

        // Validate the Console in the database
        List<Console> consoleList = consoleRepository.findAll();
        assertThat(consoleList).hasSize(databaseSizeBeforeCreate + 1);
        Console testConsole = consoleList.get(consoleList.size() - 1);
        assertThat(testConsole.getJogos()).isEqualTo(DEFAULT_JOGOS);
        assertThat(testConsole.getPreco()).isEqualTo(DEFAULT_PRECO);
    }

    @Test
    @Transactional
    public void createConsoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consoleRepository.findAll().size();

        // Create the Console with an existing ID
        console.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsoleMockMvc.perform(post("/api/consoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(console)))
            .andExpect(status().isBadRequest());

        // Validate the Console in the database
        List<Console> consoleList = consoleRepository.findAll();
        assertThat(consoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsoles() throws Exception {
        // Initialize the database
        consoleRepository.saveAndFlush(console);

        // Get all the consoleList
        restConsoleMockMvc.perform(get("/api/consoles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(console.getId().intValue())))
            .andExpect(jsonPath("$.[*].jogos").value(hasItem(DEFAULT_JOGOS.toString())))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.intValue())));
    }
    
    @Test
    @Transactional
    public void getConsole() throws Exception {
        // Initialize the database
        consoleRepository.saveAndFlush(console);

        // Get the console
        restConsoleMockMvc.perform(get("/api/consoles/{id}", console.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(console.getId().intValue()))
            .andExpect(jsonPath("$.jogos").value(DEFAULT_JOGOS.toString()))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingConsole() throws Exception {
        // Get the console
        restConsoleMockMvc.perform(get("/api/consoles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsole() throws Exception {
        // Initialize the database
        consoleRepository.saveAndFlush(console);

        int databaseSizeBeforeUpdate = consoleRepository.findAll().size();

        // Update the console
        Console updatedConsole = consoleRepository.findById(console.getId()).get();
        // Disconnect from session so that the updates on updatedConsole are not directly saved in db
        em.detach(updatedConsole);
        updatedConsole
            .jogos(UPDATED_JOGOS)
            .preco(UPDATED_PRECO);

        restConsoleMockMvc.perform(put("/api/consoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsole)))
            .andExpect(status().isOk());

        // Validate the Console in the database
        List<Console> consoleList = consoleRepository.findAll();
        assertThat(consoleList).hasSize(databaseSizeBeforeUpdate);
        Console testConsole = consoleList.get(consoleList.size() - 1);
        assertThat(testConsole.getJogos()).isEqualTo(UPDATED_JOGOS);
        assertThat(testConsole.getPreco()).isEqualTo(UPDATED_PRECO);
    }

    @Test
    @Transactional
    public void updateNonExistingConsole() throws Exception {
        int databaseSizeBeforeUpdate = consoleRepository.findAll().size();

        // Create the Console

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsoleMockMvc.perform(put("/api/consoles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(console)))
            .andExpect(status().isBadRequest());

        // Validate the Console in the database
        List<Console> consoleList = consoleRepository.findAll();
        assertThat(consoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsole() throws Exception {
        // Initialize the database
        consoleRepository.saveAndFlush(console);

        int databaseSizeBeforeDelete = consoleRepository.findAll().size();

        // Get the console
        restConsoleMockMvc.perform(delete("/api/consoles/{id}", console.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Console> consoleList = consoleRepository.findAll();
        assertThat(consoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Console.class);
        Console console1 = new Console();
        console1.setId(1L);
        Console console2 = new Console();
        console2.setId(console1.getId());
        assertThat(console1).isEqualTo(console2);
        console2.setId(2L);
        assertThat(console1).isNotEqualTo(console2);
        console1.setId(null);
        assertThat(console1).isNotEqualTo(console2);
    }
}
