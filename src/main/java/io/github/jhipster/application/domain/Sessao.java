package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Sessao.
 */
@Entity
@Table(name = "sessao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sessao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "h_inicio")
    private Double hInicio;

    @OneToOne    @JoinColumn(unique = true)
    private Reserva reserva;

    @ManyToMany(mappedBy = "sessaos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Usuario> usuarios = new HashSet<>();

    @ManyToMany(mappedBy = "sessaos")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Computador> computadors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Sessao data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Double gethInicio() {
        return hInicio;
    }

    public Sessao hInicio(Double hInicio) {
        this.hInicio = hInicio;
        return this;
    }

    public void sethInicio(Double hInicio) {
        this.hInicio = hInicio;
    }

    public Reserva getReserva() {
        return reserva;
    }

    public Sessao reserva(Reserva reserva) {
        this.reserva = reserva;
        return this;
    }

    public void setReserva(Reserva reserva) {
        this.reserva = reserva;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios;
    }

    public Sessao usuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
        return this;
    }

    public Sessao addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.getSessaos().add(this);
        return this;
    }

    public Sessao removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.getSessaos().remove(this);
        return this;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public Set<Computador> getComputadors() {
        return computadors;
    }

    public Sessao computadors(Set<Computador> computadors) {
        this.computadors = computadors;
        return this;
    }

    public Sessao addComputador(Computador computador) {
        this.computadors.add(computador);
        computador.getSessaos().add(this);
        return this;
    }

    public Sessao removeComputador(Computador computador) {
        this.computadors.remove(computador);
        computador.getSessaos().remove(this);
        return this;
    }

    public void setComputadors(Set<Computador> computadors) {
        this.computadors = computadors;
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
        Sessao sessao = (Sessao) o;
        if (sessao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sessao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sessao{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", hInicio=" + gethInicio() +
            "}";
    }
}
