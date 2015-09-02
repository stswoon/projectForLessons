package nodomain.stswoon.patterns.headfirst.pizzastrore;

import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.store.ChicagoPizzaStore;
import nodomain.stswoon.patterns.headfirst.pizzastrore.store.NYPizzaStore;
import nodomain.stswoon.patterns.headfirst.pizzastrore.store.PizzaStore;

public class MainPizza {
    public static void main(String[] args) {
        PizzaStore pizzaStore = new NYPizzaStore();
        Pizza pizza = pizzaStore.orderPizza("clam");
        System.out.println(pizza.getClass().getSimpleName());

        pizzaStore = new ChicagoPizzaStore();
        pizza = pizzaStore.orderPizza("clam");
        System.out.println(pizza.getClass().getSimpleName());
    }
}
