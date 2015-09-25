package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck;

public class RubberDuck extends AbstractQuackObserver implements Quackable {
    @Override
    public void quack() {
        System.out.println("Squeak");
        notifyObservers();
    }
}
