package nodomain.stswoon.patterns.headfirst.duckfrm.quack;

public class Squeak implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("quack-squeak");
    }
}
