package nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.chicago;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.PizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.pizza.Pizza;

public class ChicagoCheezePizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;

    public ChicagoCheezePizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }

    @Override
    public void prepare() {
        System.out.println("prepare" + name);
        dough = ingredientFactory.createDough();
        cheeze = ingredientFactory.createCheeze();
        sauce = ingredientFactory.createSauce();
    }
}
