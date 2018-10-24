package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Torneio.
 */
@Entity
@Table(name = "torneio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Torneio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jogo")
    private String jogo;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "premiacao")
    private String premiacao;

    @OneToMany(mappedBy = "torneio")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reserva> reservas = new HashSet<>();
    @OneToMany(mappedBy = "torneio")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscricao> inscricaos = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("torneios")
    private Administrador administrador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJogo() {
        return jogo;
    }

    public Torneio jogo(String jogo) {
        this.jogo = jogo;
        return this;
    }

    public void setJogo(String jogo) {
        this.jogo = jogo;
    }

    public String getCategoria() {
        return categoria;
    }

    public Torneio categoria(String categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getPremiacao() {
        return premiacao;
    }

    public Torneio premiacao(String premiacao) {
        this.premiacao = premiacao;
        return this;
    }

    public void setPremiacao(String premiacao) {
        this.premiacao = premiacao;
    }

    public Set<Reserva> getReservas() {
        return reservas;
    }

    public Torneio reservas(Set<Reserva> reservas) {
        this.reservas = reservas;
        return this;
    }

    public Torneio addReserva(Reserva reserva) {
        this.reservas.add(reserva);
        reserva.setTorneio(this);
        return this;
    }

    public Torneio removeReserva(Reserva reserva) {
        this.reservas.remove(reserva);
        reserva.setTorneio(null);
        return this;
    }

    public void setReservas(Set<Reserva> reservas) {
        this.reservas = reservas;
    }

    public Set<Inscricao> getInscricaos() {
        return inscricaos;
    }

    public Torneio inscricaos(Set<Inscricao> inscricaos) {
        this.inscricaos = inscricaos;
        return this;
    }

    public Torneio addInscricao(Inscricao inscricao) {
        this.inscricaos.add(inscricao);
        inscricao.setTorneio(this);
        return this;
    }

    public Torneio removeInscricao(Inscricao inscricao) {
        this.inscricaos.remove(inscricao);
        inscricao.setTorneio(null);
        return this;
    }

    public void setInscricaos(Set<Inscricao> inscricaos) {
        this.inscricaos = inscricaos;
    }

    public Administrador getAdministrador() {
        return administrador;
    }

    public Torneio administrador(Administrador administrador) {
        this.administrador = administrador;
        return this;
    }

    public void setAdministrador(Administrador administrador) {
        this.administrador = administrador;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Torneio torneio = (Torneio) o;
        if (torneio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), torneio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Torneio{" +
            "id=" + getId() +
            ", jogo='" + getJogo() + "'" +
            ", categoria='" + getCategoria() + "'" +
            ", premiacao='" + getPremiacao() + "'" +
            "}";
    }
}
