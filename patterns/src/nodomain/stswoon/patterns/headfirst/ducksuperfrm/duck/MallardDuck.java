package nodomain.stswoon.patterns.headfirst.ducksuperfrm.duck;

public class MallardDuck extends AbstractQuackObserver implements Quackable {
    @Override
    public void quack() {
        System.out.println("Quack");
        notifyObservers();
    }
}
