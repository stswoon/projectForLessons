package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck;

import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.Observable;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.Observer;
import nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe.QuackObservable;

public abstract class AbstractQuackObserver implements QuackObservable {
    Observable observable;

    public AbstractQuackObserver() {
        System.out.println("LOG: registering in Observable - " + this.getClass().getSimpleName());
        observable = new Observable(this);
    }

    @Override
    public void registerObserver(Observer observer) {
        observable.registerObserver(observer);
    }

    @Override
    public void notifyObservers() {
        observable.notifyObservers();
    }
}
