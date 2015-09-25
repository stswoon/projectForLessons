package nodomain.stswoon.patterns.headfirst.ducksuperfrm.observe;

public class Quacklogist implements Observer {
    @Override
    public void update(QuackObservable duck) {
        System.out.println("Quacklogist: " + duck.getClass().getSimpleName() + " (" + duck + ")" + " just quacked");
    }
}
