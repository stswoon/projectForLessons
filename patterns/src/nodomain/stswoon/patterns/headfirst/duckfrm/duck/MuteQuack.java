package nodomain.stswoon.patterns.headfirst.duckfrm.duck;

import nodomain.stswoon.patterns.headfirst.duckfrm.quack.QuackBehavior;

public class MuteQuack implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("quack-mute");
    }
}
