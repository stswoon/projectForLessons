package nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe;

public interface QuackObservable {
    void registerObserver(Observer observer);
    void notifyObservers();
}
