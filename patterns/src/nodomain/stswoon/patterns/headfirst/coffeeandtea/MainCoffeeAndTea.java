package nodomain.stswoon.patterns.headfirst.coffeeandtea;

import nodomain.stswoon.patterns.headfirst.coffeeandtea.beverage.Beverage;
import nodomain.stswoon.patterns.headfirst.coffeeandtea.beverage.CoffeeBeverage;
import nodomain.stswoon.patterns.headfirst.coffeeandtea.beverage.TeaBeverage;

public class MainCoffeeAndTea {
    public static void main(String[] args) {
        Beverage beverage = new TeaBeverage();
        beverage.prepareRecipe();

        beverage = new CoffeeBeverage();
        beverage.prepareRecipe();
    }
}
