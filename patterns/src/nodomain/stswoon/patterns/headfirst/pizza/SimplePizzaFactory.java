package nodomain.stswoon.patterns.headfirst.pizza;

public class SimplePizzaFactory {
    public Pizza createPizza(String type) {
        if ("cheese".equals(type)) {
            return new CheezePizza();
        } else if ("clam".equals(type)) {
            return new ClamPizza();
        }
        return null;
    }
}
