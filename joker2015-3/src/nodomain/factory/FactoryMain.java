package nodomain.factory;

import java.util.function.Function;

public class FactoryMain {
    public static void main(String[] args) {
        Function<String, Product> factory = ConcreteProduct::new;
        Product p = factory.apply("name");
        System.out.println(p);
    }
}
