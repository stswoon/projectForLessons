package nodomain.stswoon.patterns.headfirst.coffeeandtea.beverage;

public abstract class Beverage {
    final public void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments(); //or if (custromerWantsConditments()) {addCondiments();}
    }

    protected void addCondiments() {
    }

    protected abstract void brew();

    private void pourInCup() {
        System.out.println("pourInCup");
    }

    private void boilWater() {
        System.out.println("boilWater");
    }
}


