package nodomain.stswoon.patterns.headfirst.pizzastrore.store;

import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.CheezePizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.mydefault.ClamPizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny.NyCheezePizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny.NyClamPizza;

public class MyDefaultPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        if ("cheese".equals(type)) {
            return new CheezePizza();
        } else if ("clam".equals(type)) {
            return new ClamPizza();
        }
        return null;
    }
}
