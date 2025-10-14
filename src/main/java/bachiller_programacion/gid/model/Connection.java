package bachiller_programacion.gid.model;

/**
 *
 * @author Estudiante
 */

import jakarta.persistence.*;

@Entity
@Table(name = "connections")
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, length = 100)
    private String host;

    @Column(nullable = false, length = 10)
    private String port;

    @Column(nullable = false, length = 100)
    private String user;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 100)
    private String dbname;

    @Lob
    private String script;

    // 🔹 Constructores
    public Connection() {}

    public Connection(String name, String type, String host, String port, String user, String password, String dbname, String script) {
        this.name = name;
        this.type = type;
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.dbname = dbname;
        this.script = script;
    }

    // 🔹 Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    public String getPort() { return port; }
    public void setPort(String port) { this.port = port; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDbname() { return dbname; }
    public void setDbname(String dbname) { this.dbname = dbname; }

    public String getScript() { return script; }
    public void setScript(String script) { this.script = script; }
}

