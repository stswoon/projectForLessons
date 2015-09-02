package nodomain.stswoon.patterns.headfirst.pizzastrore.ingredient;

public interface PizzaIngredientFactory {
    Dough createDough();
    Sauce createSauce();
    Cheeze createCheeze();
    //...
}
