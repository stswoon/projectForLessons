package server;

/**
 * Created by nekhozhin on 02.03.2016.
 */
public class Greet {
    private String name;
    private int id;
    private String message;
    private Status status;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public enum Status {ACKNOWLEDGED}

    @Override
    public String toString() {
        return "Greet{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", message='" + message + '\'' +
                ", status=" + status +
                '}';
    }
}
