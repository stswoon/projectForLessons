package nodomain.stswoon.patterns.headfirst.starbuzz;

import nodomain.stswoon.patterns.headfirst.starbuzz.beverage.Beverage;
import nodomain.stswoon.patterns.headfirst.starbuzz.beverage.Espresso;
import nodomain.stswoon.patterns.headfirst.starbuzz.beverage.HouseBlend;
import nodomain.stswoon.patterns.headfirst.starbuzz.conditment.Mocha;

public class MainStarbuzz {
    public static void main(String[] args) {
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() + " $" + beverage.cost());

        Beverage beverage2 = new HouseBlend();
        beverage2 = new Mocha(beverage2);
        beverage2 = new Mocha(beverage2);
        System.out.println(beverage2.getDescription() + " $" + beverage.cost());
    }
}
