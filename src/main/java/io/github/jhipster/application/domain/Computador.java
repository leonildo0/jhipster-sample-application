package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Computador.
 */
@Entity
@Table(name = "computador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Computador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jogos")
    private String jogos;

    @Column(name = "programas")
    private String programas;

    @Column(name = "preco")
    private Long preco;

    @ManyToOne
    @JsonIgnoreProperties("computadors")
    private Reserva reserva;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "computador_sessao",
               joinColumns = @JoinColumn(name = "computadors_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "sessaos_id", referencedColumnName = "id"))
    private Set<Sessao> sessaos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJogos() {
        return jogos;
    }

    public Computador jogos(String jogos) {
        this.jogos = jogos;
        return this;
    }

    public void setJogos(String jogos) {
        this.jogos = jogos;
    }

    public String getProgramas() {
        return programas;
    }

    public Computador programas(String programas) {
        this.programas = programas;
        return this;
    }

    public void setProgramas(String programas) {
        this.programas = programas;
    }

    public Long getPreco() {
        return preco;
    }

    public Computador preco(Long preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Long preco) {
        this.preco = preco;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public Computador reserva(Reserva reserva) {
        this.reserva = reserva;
        return this;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public Set<Sessao> getSessaos() {
        return sessaos;
    }

    public Computador sessaos(Set<Sessao> sessaos) {
        this.sessaos = sessaos;
        return this;
    }

    public Computador addSessao(Sessao sessao) {
        this.sessaos.add(sessao);
        sessao.getComputadors().add(this);
        return this;
    }

    public Computador removeSessao(Sessao sessao) {
        this.sessaos.remove(sessao);
        sessao.getComputadors().remove(this);
        return this;
    }

    public void setSessaos(Set<Sessao> sessaos) {
        this.sessaos = sessaos;
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
        Computador computador = (Computador) o;
        if (computador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), computador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Computador{" +
            "id=" + getId() +
            ", jogos='" + getJogos() + "'" +
            ", programas='" + getProgramas() + "'" +
            ", preco=" + getPreco() +
            "}";
    }
}
