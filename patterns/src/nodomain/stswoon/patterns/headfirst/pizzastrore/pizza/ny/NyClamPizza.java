package nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.ny;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.PizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;

public class NyClamPizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;

    public NyClamPizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }

    @Override
    public void prepare() {
        System.out.println("prepare" + name);
    }
}
