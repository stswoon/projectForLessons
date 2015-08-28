package nodomain.stswoon.patterns.headfirst.pizza;

public class MainPizza {
    public static void main(String[] args) {
        PizzaStore pizzaStore = new PizzaStore(new SimplePizzaFactory());
        Pizza pizza = pizzaStore.orderPizza("clam");
        System.out.println(pizza.getClass().getSimpleName());
    }
}
