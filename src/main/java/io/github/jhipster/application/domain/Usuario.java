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
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Usuario implements Serializable {

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

    @Column(name = "credito")
    private Long credito;

    @Column(name = "vip")
    private Boolean vip;

    @OneToMany(mappedBy = "usuario")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reserva> reservas = new HashSet<>();
    @OneToMany(mappedBy = "usuario")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Inscricao> inscricaos = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "usuario_lanchonete",
               joinColumns = @JoinColumn(name = "usuarios_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "lanchonetes_id", referencedColumnName = "id"))
    private Set<Lanchonete> lanchonetes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "usuario_console",
               joinColumns = @JoinColumn(name = "usuarios_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "consoles_id", referencedColumnName = "id"))
    private Set<Console> consoles = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "usuario_sessao",
               joinColumns = @JoinColumn(name = "usuarios_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "sessaos_id", referencedColumnName = "id"))
    private Set<Sessao> sessaos = new HashSet<>();

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

    public Usuario login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public Usuario senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getName() {
        return name;
    }

    public Usuario name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCredito() {
        return credito;
    }

    public Usuario credito(Long credito) {
        this.credito = credito;
        return this;
    }

    public void setCredito(Long credito) {
        this.credito = credito;
    }

    public Boolean isVip() {
        return vip;
    }

    public Usuario vip(Boolean vip) {
        this.vip = vip;
        return this;
    }

    public void setVip(Boolean vip) {
        this.vip = vip;
    }

    public Set<Reserva> getReservas() {
        return reservas;
    }

    public Usuario reservas(Set<Reserva> reservas) {
        this.reservas = reservas;
        return this;
    }

    public Usuario addReserva(Reserva reserva) {
        this.reservas.add(reserva);
        reserva.setUsuario(this);
        return this;
    }

    public Usuario removeReserva(Reserva reserva) {
        this.reservas.remove(reserva);
        reserva.setUsuario(null);
        return this;
    }

    public void setReservas(Set<Reserva> reservas) {
        this.reservas = reservas;
    }

    public Set<Inscricao> getInscricaos() {
        return inscricaos;
    }

    public Usuario inscricaos(Set<Inscricao> inscricaos) {
        this.inscricaos = inscricaos;
        return this;
    }

    public Usuario addInscricao(Inscricao inscricao) {
        this.inscricaos.add(inscricao);
        inscricao.setUsuario(this);
        return this;
    }

    public Usuario removeInscricao(Inscricao inscricao) {
        this.inscricaos.remove(inscricao);
        inscricao.setUsuario(null);
        return this;
    }

    public void setInscricaos(Set<Inscricao> inscricaos) {
        this.inscricaos = inscricaos;
    }

    public Set<Lanchonete> getLanchonetes() {
        return lanchonetes;
    }

    public Usuario lanchonetes(Set<Lanchonete> lanchonetes) {
        this.lanchonetes = lanchonetes;
        return this;
    }

    public Usuario addLanchonete(Lanchonete lanchonete) {
        this.lanchonetes.add(lanchonete);
        lanchonete.getUsuarios().add(this);
        return this;
    }

    public Usuario removeLanchonete(Lanchonete lanchonete) {
        this.lanchonetes.remove(lanchonete);
        lanchonete.getUsuarios().remove(this);
        return this;
    }

    public void setLanchonetes(Set<Lanchonete> lanchonetes) {
        this.lanchonetes = lanchonetes;
    }

    public Set<Console> getConsoles() {
        return consoles;
    }

    public Usuario consoles(Set<Console> consoles) {
        this.consoles = consoles;
        return this;
    }

    public Usuario addConsole(Console console) {
        this.consoles.add(console);
        console.getUsuarios().add(this);
        return this;
    }

    public Usuario removeConsole(Console console) {
        this.consoles.remove(console);
        console.getUsuarios().remove(this);
        return this;
    }

    public void setConsoles(Set<Console> consoles) {
        this.consoles = consoles;
    }

    public Set<Sessao> getSessaos() {
        return sessaos;
    }

    public Usuario sessaos(Set<Sessao> sessaos) {
        this.sessaos = sessaos;
        return this;
    }

    public Usuario addSessao(Sessao sessao) {
        this.sessaos.add(sessao);
        sessao.getUsuarios().add(this);
        return this;
    }

    public Usuario removeSessao(Sessao sessao) {
        this.sessaos.remove(sessao);
        sessao.getUsuarios().remove(this);
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
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", senha='" + getSenha() + "'" +
            ", name='" + getName() + "'" +
            ", credito=" + getCredito() +
            ", vip='" + isVip() + "'" +
            "}";
    }
}
