package gwt.client;

/**
 * Created by nekhozhin on 02.03.2016.
 */
public class Greet {

    private String name;
    private Status status;
    private String id;
    private String message;

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public static Greet parse(String text) {
        Greet greet = new Greet();
        greet.setMessage(text);
        return greet;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Status getStatus() {
        return status;
    }

    public enum Status {
        NEW ("new");

        private String number;


        Status(String s) {

        }

        public String getNumber() {
            return number;
        }
    }

    @Override
    public String toString() {
        return "Greet{" +
                "name='" + name + '\'' +
                ", status=" + status +
                ", id='" + id + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
