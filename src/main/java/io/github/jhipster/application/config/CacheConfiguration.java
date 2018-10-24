package io.github.jhipster.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName() + ".reservas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName() + ".inscricaos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName() + ".lanchonetes", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName() + ".consoles", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Usuario.class.getName() + ".sessaos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Torneio.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Torneio.class.getName() + ".reservas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Torneio.class.getName() + ".inscricaos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Administrador.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Administrador.class.getName() + ".reservas", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Administrador.class.getName() + ".torneios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Premium.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Inscricao.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Lanchonete.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Lanchonete.class.getName() + ".usuarios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Reserva.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Reserva.class.getName() + ".computadors", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Computador.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Computador.class.getName() + ".sessaos", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Console.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Console.class.getName() + ".usuarios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sessao.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sessao.class.getName() + ".usuarios", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Sessao.class.getName() + ".computadors", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
