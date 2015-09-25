package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck;

public class RedheadDuck extends AbstractQuackObserver implements Quackable {
    @Override
    public void quack() {
        System.out.println("Quack");
        notifyObservers();
    }
}
