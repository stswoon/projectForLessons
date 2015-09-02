package nodomain.stswoon.patterns.headfirst.pizzastrore.store;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.PizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.ny.NyPizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny.NyCheezePizza;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny.NyClamPizza;

public class NYPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        PizzaIngredientFactory pizzaIngredientFactory = new NyPizzaIngredientFactory();

        if ("cheese".equals(type)) {
            return new NyCheezePizza(pizzaIngredientFactory);
        } else if ("clam".equals(type)) {
            return new NyClamPizza(pizzaIngredientFactory);
        }

        return null;
    }
}
