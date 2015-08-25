package nodomain.stswoon.patterns.headfirst.duck;

public class MuteQuack implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("quack-mute");
    }
}
