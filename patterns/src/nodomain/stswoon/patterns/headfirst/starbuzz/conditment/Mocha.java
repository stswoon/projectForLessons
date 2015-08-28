package nodomain.stswoon.patterns.headfirst.starbuzz.conditment;

import nodomain.stswoon.patterns.headfirst.starbuzz.beverage.Beverage;

public class Mocha extends ConditmentDecorator {
    Beverage beverage;

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    @Override
    public double cost() {
        return 0.20 + beverage.cost();
    }
}
