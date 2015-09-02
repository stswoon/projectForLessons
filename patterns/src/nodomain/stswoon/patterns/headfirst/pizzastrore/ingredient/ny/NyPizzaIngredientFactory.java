package nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.ny;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Cheeze;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Dough;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.PizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Sauce;

public class NyPizzaIngredientFactory implements PizzaIngredientFactory {
    @Override
    public Dough createDough() {
        return new NyDough();
    }

    @Override
    public Sauce createSauce() {
        return new NySauce();
    }

    @Override
    public Cheeze createCheeze() {
        return new NyCheeze();
    }
}
