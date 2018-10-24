package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Inscricao.
 */
@Entity
@Table(name = "inscricao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Inscricao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "equipe")
    private String equipe;

    @ManyToOne
    @JsonIgnoreProperties("inscricaos")
    private Usuario usuario;

    @ManyToOne
    @JsonIgnoreProperties("inscricaos")
    private Torneio torneio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquipe() {
        return equipe;
    }

    public Inscricao equipe(String equipe) {
        this.equipe = equipe;
        return this;
    }

    public void setEquipe(String equipe) {
        this.equipe = equipe;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Inscricao usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Torneio getTorneio() {
        return torneio;
    }

    public Inscricao torneio(Torneio torneio) {
        this.torneio = torneio;
        return this;
    }

    public void setTorneio(Torneio torneio) {
        this.torneio = torneio;
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
        Inscricao inscricao = (Inscricao) o;
        if (inscricao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscricao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inscricao{" +
            "id=" + getId() +
            ", equipe='" + getEquipe() + "'" +
            "}";
    }
}
