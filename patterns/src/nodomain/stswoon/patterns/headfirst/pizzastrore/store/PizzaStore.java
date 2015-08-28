package nodomain.stswoon.patterns.headfirst.pizzastrore.store;

import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;

public abstract class PizzaStore {
    public Pizza orderPizza(String type) {
        Pizza pizza = createPizza(type);

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }

    abstract Pizza createPizza(String type);
}
