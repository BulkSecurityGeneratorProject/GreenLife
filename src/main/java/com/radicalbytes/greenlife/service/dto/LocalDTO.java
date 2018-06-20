package com.radicalbytes.greenlife.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Local entity.
 */
public class LocalDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate fechaCreacion;

    @NotNull
    @Size(max = 50)
    private String nombre;

    @NotNull
    @Size(max = 200)
    private String direccion;

    @NotNull
    private Double latitud;

    @NotNull
    private Double latitude;

    @NotNull
    @Size(max = 20)
    private String horario;

    @NotNull
    @Size(max = 8)
    private String telefono;

    private Long fachadaId;

    private Long comercioId;

    private String comercioRazonSocial;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Long getFachadaId() {
        return fachadaId;
    }

    public void setFachadaId(Long fotografiaId) {
        this.fachadaId = fotografiaId;
    }

    public Long getComercioId() {
        return comercioId;
    }

    public void setComercioId(Long comercioId) {
        this.comercioId = comercioId;
    }

    public String getComercioRazonSocial() {
        return comercioRazonSocial;
    }

    public void setComercioRazonSocial(String comercioRazonSocial) {
        this.comercioRazonSocial = comercioRazonSocial;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LocalDTO localDTO = (LocalDTO) o;
        if(localDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), localDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LocalDTO{" +
            "id=" + getId() +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", latitud=" + getLatitud() +
            ", latitude=" + getLatitude() +
            ", horario='" + getHorario() + "'" +
            ", telefono='" + getTelefono() + "'" +
            "}";
    }
}