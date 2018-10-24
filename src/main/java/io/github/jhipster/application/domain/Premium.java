package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Premium.
 */
@Entity
@Table(name = "premium")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Premium implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "d_incio")
    private LocalDate dIncio;

    @Column(name = "d_fim")
    private LocalDate dFim;

    @Column(name = "desconto")
    private Long desconto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getdIncio() {
        return dIncio;
    }

    public Premium dIncio(LocalDate dIncio) {
        this.dIncio = dIncio;
        return this;
    }

    public void setdIncio(LocalDate dIncio) {
        this.dIncio = dIncio;
    }

    public LocalDate getdFim() {
        return dFim;
    }

    public Premium dFim(LocalDate dFim) {
        this.dFim = dFim;
        return this;
    }

    public void setdFim(LocalDate dFim) {
        this.dFim = dFim;
    }

    public Long getDesconto() {
        return desconto;
    }

    public Premium desconto(Long desconto) {
        this.desconto = desconto;
        return this;
    }

    public void setDesconto(Long desconto) {
        this.desconto = desconto;
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
        Premium premium = (Premium) o;
        if (premium.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), premium.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Premium{" +
            "id=" + getId() +
            ", dIncio='" + getdIncio() + "'" +
            ", dFim='" + getdFim() + "'" +
            ", desconto=" + getDesconto() +
            "}";
    }
}
