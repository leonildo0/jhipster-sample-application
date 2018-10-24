package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Reserva.
 */
@Entity
@Table(name = "reserva")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reserva implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dh_reserva")
    private LocalDate dhReserva;

    @Column(name = "h_inicio")
    private Double hInicio;

    @Column(name = "h_fim")
    private Double hFim;

    @OneToMany(mappedBy = "reserva")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Computador> computadors = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("reservas")
    private Usuario usuario;

    @ManyToOne
    @JsonIgnoreProperties("reservas")
    private Administrador administrador;

    @ManyToOne
    @JsonIgnoreProperties("reservas")
    private Torneio torneio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDhReserva() {
        return dhReserva;
    }

    public Reserva dhReserva(LocalDate dhReserva) {
        this.dhReserva = dhReserva;
        return this;
    }

    public void setDhReserva(LocalDate dhReserva) {
        this.dhReserva = dhReserva;
    }

    public Double gethInicio() {
        return hInicio;
    }

    public Reserva hInicio(Double hInicio) {
        this.hInicio = hInicio;
        return this;
    }

    public void sethInicio(Double hInicio) {
        this.hInicio = hInicio;
    }

    public Double gethFim() {
        return hFim;
    }

    public Reserva hFim(Double hFim) {
        this.hFim = hFim;
        return this;
    }

    public void sethFim(Double hFim) {
        this.hFim = hFim;
    }

    public Set<Computador> getComputadors() {
        return computadors;
    }

    public Reserva computadors(Set<Computador> computadors) {
        this.computadors = computadors;
        return this;
    }

    public Reserva addComputador(Computador computador) {
        this.computadors.add(computador);
        computador.setReserva(this);
        return this;
    }

    public Reserva removeComputador(Computador computador) {
        this.computadors.remove(computador);
        computador.setReserva(null);
        return this;
    }

    public void setComputadors(Set<Computador> computadors) {
        this.computadors = computadors;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Reserva usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Administrador getAdministrador() {
        return administrador;
    }

    public Reserva administrador(Administrador administrador) {
        this.administrador = administrador;
        return this;
    }

    public void setAdministrador(Administrador administrador) {
        this.administrador = administrador;
    }

    public Torneio getTorneio() {
        return torneio;
    }

    public Reserva torneio(Torneio torneio) {
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
        Reserva reserva = (Reserva) o;
        if (reserva.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reserva.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reserva{" +
            "id=" + getId() +
            ", dhReserva='" + getDhReserva() + "'" +
            ", hInicio=" + gethInicio() +
            ", hFim=" + gethFim() +
            "}";
    }
}
