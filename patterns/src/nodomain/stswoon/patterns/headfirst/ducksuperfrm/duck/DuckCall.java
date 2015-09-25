package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck;

public class DuckCall extends AbstractQuackObserver implements Quackable {
    @Override
    public void quack() {
        System.out.println("Kwak");
        notifyObservers();
    }
}
