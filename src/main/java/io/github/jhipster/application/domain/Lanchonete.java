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
 * A Lanchonete.
 */
@Entity
@Table(name = "lanchonete")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lanchonete implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bebidas")
    private String bebidas;

    @Column(name = "lanches")
    private String lanches;

    @Column(name = "combos")
    private String combos;

    @Column(name = "precos")
    private Long precos;

    @ManyToMany(mappedBy = "lanchonetes")
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

    public String getBebidas() {
        return bebidas;
    }

    public Lanchonete bebidas(String bebidas) {
        this.bebidas = bebidas;
        return this;
    }

    public void setBebidas(String bebidas) {
        this.bebidas = bebidas;
    }

    public String getLanches() {
        return lanches;
    }

    public Lanchonete lanches(String lanches) {
        this.lanches = lanches;
        return this;
    }

    public void setLanches(String lanches) {
        this.lanches = lanches;
    }

    public String getCombos() {
        return combos;
    }

    public Lanchonete combos(String combos) {
        this.combos = combos;
        return this;
    }

    public void setCombos(String combos) {
        this.combos = combos;
    }

    public Long getPrecos() {
        return precos;
    }

    public Lanchonete precos(Long precos) {
        this.precos = precos;
        return this;
    }

    public void setPrecos(Long precos) {
        this.precos = precos;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios;
    }

    public Lanchonete usuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios;
        return this;
    }

    public Lanchonete addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.getLanchonetes().add(this);
        return this;
    }

    public Lanchonete removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.getLanchonetes().remove(this);
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
        Lanchonete lanchonete = (Lanchonete) o;
        if (lanchonete.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lanchonete.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lanchonete{" +
            "id=" + getId() +
            ", bebidas='" + getBebidas() + "'" +
            ", lanches='" + getLanches() + "'" +
            ", combos='" + getCombos() + "'" +
            ", precos=" + getPrecos() +
            "}";
    }
}
