package nodomain.stswoon.patterns.headfirst.pizzastrore;

import nodomain.stswoon.patterns.headfirst.pizzastrore.SimplePizzaFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.store.PizzaStore;

public class MainPizza {
    public static void main(String[] args) {
        PizzaStore pizzaStore = new PizzaStore(new SimplePizzaFactory());
        Pizza pizza = pizzaStore.orderPizza("clam");
        System.out.println(pizza.getClass().getSimpleName());
    }
}
