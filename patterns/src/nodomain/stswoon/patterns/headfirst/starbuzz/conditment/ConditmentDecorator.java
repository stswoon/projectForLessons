package nodomain.stswoon.patterns.headfirst.starbuzz.conditment;

import nodomain.stswoon.patterns.headfirst.starbuzz.beverage.Beverage;

public abstract class ConditmentDecorator extends Beverage {
    @Override
    public abstract String getDescription();
}
