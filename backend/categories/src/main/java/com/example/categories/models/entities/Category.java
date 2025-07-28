package com.example.categories.models.entities;

import jakarta.validation.constraints.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "categories", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"name"})
})
public class Category {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, length = 50, nullable = false)
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String name;

    @Size(max = 255, message = "La descripción no puede exceder los 255 caracteres")
    @Column(length = 255)
    private String description; 

    @Column(name = "createdAt" , nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void asignarFechaCreacion() {
        this.createdAt = LocalDateTime.now();
    }

    public Category() {}

    public Category(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
        asignarFechaCreacion();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateCreated() {
        return createdAt;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.createdAt = dateCreated;
    }
    

}
