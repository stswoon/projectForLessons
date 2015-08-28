package nodomain.stswoon.patterns.headfirst.starbuzz.beverage;

public abstract class Beverage {
    String description = "Unknown Beverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
}
