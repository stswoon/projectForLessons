package nodomain.stswoon.patterns.headfirst.pizzastrore.store;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.PizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.chicago.ChicagoPizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.ny.NyPizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.chicago.ChicagoCheezePizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.chicago.ChicagoClamPizza;

public class ChicagoPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        PizzaIngredientFactory pizzaIngredientFactory = new ChicagoPizzaIngredientFactory();

        if ("cheese".equals(type)) {
            return new ChicagoCheezePizza(pizzaIngredientFactory);
        } else if ("clam".equals(type)) {
            return new ChicagoClamPizza(pizzaIngredientFactory);
        }

        return null;
    }
}
