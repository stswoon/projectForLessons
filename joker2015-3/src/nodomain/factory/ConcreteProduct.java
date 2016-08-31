package nodomain.factory;

public class ConcreteProduct implements Product {

    private String s;

    public ConcreteProduct(String s) {
        this.s = s;
    }

    @Override
    public String toString() {
        return "ConcreteProduct{" +
                "s='" + s + '\'' +
                '}';
    }
}
