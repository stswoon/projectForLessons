package nodomain.stswoon.patterns.headfirst.pizzastrore.store;

import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.chicago.ChicagoCheezePizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.chicago.ChicagoClamPizza;

public class ChicagoPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        if ("cheese".equals(type)) {
            return new ChicagoCheezePizza();
        } else if ("clam".equals(type)) {
            return new ChicagoClamPizza();
        }
        return null;
    }
}
