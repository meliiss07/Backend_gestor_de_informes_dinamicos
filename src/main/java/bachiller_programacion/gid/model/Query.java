package bachiller_programacion.gid.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queries")
public class Query {
         
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String script;

    // Guardamos el JSON como String (podés mapearlo a otra clase si querés después)
    @Column(columnDefinition = "JSON")
    private String fields;

    // Antes:
    // @Column(nullable = false)
    // private LocalDateTime createdAt;
    //
    // @Column(nullable = false)
    // private LocalDateTime updatedAt;

    // { changed code }
    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;

    // ====== Constructores ======
    public Query() {
    }

    public Query(String name, String script, String fields, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.name = name;
        this.script = script;
        this.fields = fields;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // ====== Getters y Setters ======
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getFields() {
        return fields;
    }

    public void setFields(String fields) {
        this.fields = fields;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // ====== Añadir métodos de ciclo de vida para timestamps ======
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

