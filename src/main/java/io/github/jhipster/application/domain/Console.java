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
 * A Console.
 */
@Entity
@Table(name = "console")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Console implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jogos")
    private String jogos;

    @Column(name = "preco")
    private Long preco;

    @ManyToMany(mappedBy = "consoles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Usuario> usuarios = new HashSet<>();

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

    public Console jogos(String jogos) {
        this.jogos = jogos;
        return this;
    }

    public void setJogos(String jogos) {
        this.jogos = jogos;
    }

    public Long getPreco() {
        return preco;
    }

    public Console preco(Long preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Long preco) {
        this.preco = preco;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios;
    }

    public Console usuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
        return this;
    }

    public Console addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.getConsoles().add(this);
        return this;
    }

    public Console removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.getConsoles().remove(this);
        return this;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
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
        Console console = (Console) o;
        if (console.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), console.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Console{" +
            "id=" + getId() +
            ", jogos='" + getJogos() + "'" +
            ", preco=" + getPreco() +
            "}";
    }
}
