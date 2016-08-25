package nodomain.singeltonViaDI;

public class Singleton {
    private final static Singleton INSTANCE = new Singleton();

    private Singleton() {
    }

    public static Singleton getInstance() {
        return INSTANCE;
    }

    public void print() {
        System.out.println("test Singleton - ok");
    }
}
