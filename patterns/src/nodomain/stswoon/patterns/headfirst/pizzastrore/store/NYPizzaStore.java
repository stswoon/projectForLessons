package nodomain.stswoon.patterns.headfirst.pizzastrore.store;

import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny.NyCheezePizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny.NyClamPizza;

public class NYPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        if ("cheese".equals(type)) {
            return new NyCheezePizza();
        } else if ("clam".equals(type)) {
            return new NyClamPizza();
        }
        return null;
    }
}
