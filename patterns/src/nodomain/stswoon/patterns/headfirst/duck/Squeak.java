package nodomain.stswoon.patterns.headfirst.duck;

public class Squeak implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("quack-squeak");
    }
}
