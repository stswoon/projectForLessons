package nodomain.stswoon.patterns.headfirst.ducksuperfrm.flock;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck.Quackable;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.Observer;

import java.util.ArrayList;
import java.util.List;

public class Flock implements Quackable {
    private List<Quackable> quachkers = new ArrayList<>();
    List<Observer> observers = new ArrayList<>();

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
        for (Quackable quackable : quachkers) {
            quackable.registerObserver(observer);
        }
    }

    @Override
    public void notifyObservers() {
    }

    public void add(Quackable quackable) {
        quachkers.add(quackable);
        for (Observer observer : observers) {
            quackable.registerObserver(observer);
        }
    }

    @Override
    public void quack() {
        for (Quackable quackable : quachkers) {
            quackable.quack();
        }
    }
}
