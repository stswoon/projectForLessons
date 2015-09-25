package nodomain.stswoon.patterns.headfirst.ducksuperfrm.statistics;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.Quackable;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.Observer;

public class QuackCounter implements Quackable {
    private static int numberOfQuacks;
    private Quackable quackable;

    public QuackCounter(Quackable quackable) {
        this.quackable = quackable;
    }

    @Override
    public void quack() {
        quackable.quack();
        numberOfQuacks++;
    }

    public static int getNumberOfQuacks() {
        return numberOfQuacks;
    }

    @Override
    public void registerObserver(Observer observer) {
        quackable.registerObserver(observer);
    }

    @Override
    public void notifyObservers() {
        //should not be observe
    }
}
