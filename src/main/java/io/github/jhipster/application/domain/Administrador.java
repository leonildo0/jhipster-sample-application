package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Administrador.
 */
@Entity
@Table(name = "administrador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Administrador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "senha")
    private String senha;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "administrador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reserva> reservas = new HashSet<>();
    @OneToMany(mappedBy = "administrador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Torneio> torneios = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public Administrador login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public Administrador senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getName() {
        return name;
    }

    public Administrador name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Reserva> getReservas() {
        return reservas;
    }

    public Administrador reservas(Set<Reserva> reservas) {
        this.reservas = reservas;
        return this;
    }

    public Administrador addReserva(Reserva reserva) {
        this.reservas.add(reserva);
        reserva.setAdministrador(this);
        return this;
    }

    public Administrador removeReserva(Reserva reserva) {
        this.reservas.remove(reserva);
        reserva.setAdministrador(null);
        return this;
    }

    public void setReservas(Set<Reserva> reservas) {
        this.reservas = reservas;
    }

    public Set<Torneio> getTorneios() {
        return torneios;
    }

    public Administrador torneios(Set<Torneio> torneios) {
        this.torneios = torneios;
        return this;
    }

    public Administrador addTorneio(Torneio torneio) {
        this.torneios.add(torneio);
        torneio.setAdministrador(this);
        return this;
    }

    public Administrador removeTorneio(Torneio torneio) {
        this.torneios.remove(torneio);
        torneio.setAdministrador(null);
        return this;
    }

    public void setTorneios(Set<Torneio> torneios) {
        this.torneios = torneios;
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
        Administrador administrador = (Administrador) o;
        if (administrador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), administrador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Administrador{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", senha='" + getSenha() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
