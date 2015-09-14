package nodomain.stswoon.patterns.headfirst.coffeeandtea.beverage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class CoffeeBeverage extends Beverage {
    @Override
    protected void brew() {
        System.out.println("Do coffee");
    }

    @Override
    protected void addCondiments() {
        String answer = getUserInput();
        if ("y".equals(answer)) {
            addMilk();
        }
    }

    private String getUserInput() {
        System.out.println("Would you like milk?");

        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        try {
            return in.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void addMilk() {
        System.out.println("Add milk");
    }
}


