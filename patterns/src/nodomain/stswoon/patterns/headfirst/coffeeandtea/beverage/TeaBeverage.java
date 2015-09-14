package nodomain.stswoon.patterns.headfirst.coffeeandtea.beverage;

public class TeaBeverage extends Beverage {
    @Override
    protected void brew() {
        System.out.println("Do tea");
    }
}


