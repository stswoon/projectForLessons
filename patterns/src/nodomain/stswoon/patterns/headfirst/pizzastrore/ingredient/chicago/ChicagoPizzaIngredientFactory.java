package nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.chicago;

import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Cheeze;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Dough;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.PizzaIngredientFactory;
import nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient.Sauce;

public class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
    @Override
    public Dough createDough() {
        return new ChicagoDough();
    }

    @Override
    public Sauce createSauce() {
        return new ChicagoSauce();
    }

    @Override
    public Cheeze createCheeze() {
        return new ChicagoCheeze();
    }
}
